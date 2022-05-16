package battleship

import (
	"fmt"

	"github.com/GiantBrandon/Olajuwon/Duncan/utils"
	"github.com/gorilla/websocket"
)

// COMMAND LEVEL

func RemovePlayer(game Game, conn *websocket.Conn) Game {
	for name, player := range game.Players {
		if player.Connection == conn {
			game = addMessage(game, fmt.Sprintf("%s left", name))
			delete(game.Players, name)
			index := utils.Find(game.Order, name)
			game.Order = append(game.Order[:index], game.Order[index+1:]...)
			SendUpdates(game)
			return game
		}
	}
	return game
}

func JoinRoom(game Game, request Request, conn *websocket.Conn) Game {
	game.Players[request.Name] = Player{Connection: conn}
	game.Order = append(game.Order, request.Name)
	game = addMessage(game, fmt.Sprintf("%s joined", request.Name))
	SendUpdates(game)
	return game
}

func StartGame(game Game) Game {
	game.Status = "Active"
	SendUpdates(game)
	return game
}

func Reset(game Game) Game {
	for name, player := range game.Players {
		game.Players[name] = Player{Connection: player.Connection}
	}
	game.Messages = []string{}
	game.Status = "Setup"
	SendUpdates(game)
	return game
}

func AddBoard(game Game, request Request) Game {
	game.Players[request.Name] = Player{
		Ships:      request.Ships,
		Connection: game.Players[request.Name].Connection,
		ShipCount:  len(request.Ships),
	}
	SendUpdates(game)
	return game
}

func Fire(game Game, request Request) Game {
	switch game.Rules.FireType {
	case "Justice":
		game = addMessage(game, fmt.Sprintf("%s fired at %v", request.Name, request.Targets))
		for name, targets := range request.Targets {
			player := game.Players[name]
			player.Targets = append(game.Players[name].Targets, targets...)
			player.ShipCount = ActiveShips(player)
			game.Players[name] = player
		}
	case "Equality":
		for name, player := range game.Players {
			player.Targets = append(game.Players[name].Targets, request.Targets["all"]...)
			player.ShipCount = ActiveShips(player)
			game.Players[name] = player
		}
	}
	game.Order = append(game.Order[1:], game.Order[0])
	for game.Players[game.Order[0]].ShipCount == 0 {
		game.Order = append(game.Order[1:], game.Order[0])
	}
	SendUpdates(game)
	return game
}

// GAME LEVEL

func SendUpdates(game Game) {
	for _, name := range game.Order {
		game.Players[name].Connection.WriteJSON(GameToView(game, name))
	}
}

func GameToView(game Game, self string) View {
	var selfView PlayerView
	otherViews := []PlayerView{}
	for index, name := range game.Order {
		view := PlayerView{
			Name:      name,
			Board:     AssembleBoard(game.Players[name], self == name),
			Order:     index,
			ShipCount: game.Players[name].ShipCount,
		}
		if self != name {
			otherViews = append(otherViews, view)
		} else {
			selfView = view
		}
	}
	return View{
		Self:     selfView,
		Others:   otherViews,
		Status:   game.Status,
		Rules:    game.Rules,
		Messages: game.Messages,
	}
}

// SHIP LEVEL

func IsShipSunk(ship []int, targets []int) bool {
	for _, coordinate := range ship {
		if !utils.Contains(targets, coordinate) {
			return false
		}
	}
	return true
}

// MESSAGE LEVEL

func addMessage(game Game, message string) Game {
	game.Messages = append([]string{message}, game.Messages...)
	return game
}

// PLAYER LEVEL

func ActiveShips(player Player) int {
	count := len(player.Ships)
	for _, ship := range player.Ships {
		if IsShipSunk(ship, player.Targets) {
			count = count - 1
		}
	}
	return count
}

func AssembleBoard(player Player, isOwner bool) []Cell {
	board := []Cell{}
	if isOwner && len(player.Ships) == 0 {
		return board
	}
	for i := 0; i < 100; i++ {
		if utils.ShipContains(player.Ships, i) {
			if utils.Contains(player.Targets, i) {
				board = append(board, Hit)
			} else {
				if isOwner {
					board = append(board, Ship)
				} else {
					board = append(board, Untouched)
				}
			}
		} else {
			if utils.Contains(player.Targets, i) {
				board = append(board, Miss)
			} else {
				board = append(board, Untouched)
			}
		}
		board = append(board)
	}
	return board
}

func Filter(players []Player, test func(Player) bool) (ret []Player) {
	for _, item := range players {
		if test(item) {
			ret = append(ret, item)
		}
	}
	return
}

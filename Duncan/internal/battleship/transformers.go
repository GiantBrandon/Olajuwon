package battleship

import (
	"fmt"

	"github.com/GiantBrandon/Olajuwon/Duncan/utils"
	"github.com/gorilla/websocket"
)

// COMMAND LEVEL

func Validate(game Game, request Request, conn *websocket.Conn) Game {
	if request.Command == "JOIN_ROOM" {
		return game
	} else if game.Players[request.Name].Connection != conn || (request.Command == "FIRE" && request.Name != game.Order[0]) {
		for name, player := range game.Players {
			if player.Connection == conn {
				player.Cheater = true
				game.Players[name] = player
				game = addMessage(game, fmt.Sprintf("%s tried to cheat", name))
				return game
			}
		}
		return game
	} else {
		return game
	}
}

func RemovePlayerConnection(game Game, conn *websocket.Conn) Game {
	for name, player := range game.Players {
		if player.Connection == conn {
			game = addMessage(game, fmt.Sprintf("%s left", name))
			var emptyResponse struct{}
			game.Players[name].Connection.WriteJSON(emptyResponse)
			delete(game.Players, name)
			index := utils.Find(game.Order, name)
			game.Order = append(game.Order[:index], game.Order[index+1:]...)
			SendUpdates(game)
			return game
		}
	}
	return game
}

func RemovePlayerName(game Game, name string) Game {
	game = addMessage(game, fmt.Sprintf("%s left", name))
	var emptyResponse struct{}
	game.Players[name].Connection.WriteJSON(emptyResponse)
	delete(game.Players, name)
	index := utils.Find(game.Order, name)
	game.Order = append(game.Order[:index], game.Order[index+1:]...)
	SendUpdates(game)
	return game
}

func JoinRoom(game Game, request Request, conn *websocket.Conn) Game {
	game.Players[request.Name] = Player{Colors: request.Colors, Connection: conn}
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
		err := game.Players[name].Connection.WriteJSON(GameToView(game, name))
		if err != nil {
			fmt.Println(err)
			game = RemovePlayerName(game, name)
			SendUpdates(game)
		}
	}
}

func ChangeState(game Game) Game {
	game.Status = "Setup"
	SendUpdates(game)
	return game
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
			Cheater:   game.Players[name].Cheater,
			Colors:    game.Players[name].Colors,
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

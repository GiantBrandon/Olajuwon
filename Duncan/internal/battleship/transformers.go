package battleship

import (
	"fmt"

	"github.com/GiantBrandon/Olajuwon/Duncan/utils"
	"github.com/gorilla/websocket"
)

// COMMAND LEVEL

func RemovePlayer(game BattleshipGame, order []string, conn *websocket.Conn) (BattleshipGame, []string) {
	for name, player := range game.Players {
		if player.Connection == conn {
			game = addMessage(game, fmt.Sprintf("%s left", name))
			delete(game.Players, name)
			index := utils.Find(order, name)
			order = append(order[:index], order[index+1:]...)
			SendUpdates(game, order)
			return game, order
		}
	}
	return game, order
}

func JoinRoom(game BattleshipGame, order []string, request BattleshipRequest, conn *websocket.Conn) (BattleshipGame, []string) {
	game.Players[request.Name] = BattleshipPlayer{Connection: conn}
	order = append(order, request.Name)
	game = addMessage(game, fmt.Sprintf("%s joined", request.Name))
	SendUpdates(game, order)
	return game, order
}

func StartGame(game BattleshipGame, order []string) (BattleshipGame, []string) {
	game.Status = "Active"
	SendUpdates(game, order)
	return game, order
}

func Reset(game BattleshipGame, order []string) (BattleshipGame, []string) {
	for name, player := range game.Players {
		game.Players[name] = BattleshipPlayer{Connection: player.Connection}
	}
	game.Messages = []string{}
	game.Status = "Setup"
	SendUpdates(game, order)
	return game, order
}

func AddBoard(game BattleshipGame, order []string, request BattleshipRequest) (BattleshipGame, []string) {
	game.Players[request.Name] = BattleshipPlayer{
		Ships:      request.Ships,
		Connection: game.Players[request.Name].Connection,
		ShipCount:  len(request.Ships),
	}
	SendUpdates(game, order)
	return game, order
}

func Fire(game BattleshipGame, order []string, request BattleshipRequest) (BattleshipGame, []string) {
	order = append(order[1:], order[0])
	for game.Players[order[0]].ShipCount == 0 {
		order = append(order[1:], order[0])
	}
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
	SendUpdates(game, order)
	return game, order
}

// GAME LEVEL

func SendUpdates(game BattleshipGame, order []string) {
	for _, name := range order {
		game.Players[name].Connection.WriteJSON(GameToView(game, order, name))
	}
}

func GameToView(game BattleshipGame, order []string, self string) BattleshipView {
	var selfView BattleshipPlayerView
	otherViews := []BattleshipPlayerView{}
	for index, name := range order {
		view := BattleshipPlayerView{
			Name:      name,
			Board:     AssembleBoard(game.Players[name], false),
			Order:     index,
			ShipCount: game.Players[name].ShipCount,
		}
		if self != name {
			otherViews = append(otherViews, view)
		} else {
			selfView = view
		}
	}
	return BattleshipView{
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

func addMessage(game BattleshipGame, message string) BattleshipGame {
	game.Messages = append([]string{message}, game.Messages...)
	return game
}

// PLAYER LEVEL

func ActiveShips(player BattleshipPlayer) int {
	count := len(player.Ships)
	for _, ship := range player.Ships {
		if IsShipSunk(ship, player.Targets) {
			count = count - 1
		}
	}
	return count
}

func AssembleBoard(player BattleshipPlayer, isOwner bool) []BattleshipCell {
	board := []BattleshipCell{}
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

func Filter(players []BattleshipPlayer, test func(BattleshipPlayer) bool) (ret []BattleshipPlayer) {
	for _, item := range players {
		if test(item) {
			ret = append(ret, item)
		}
	}
	return
}

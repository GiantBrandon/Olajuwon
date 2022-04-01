package types

import (
	"github.com/GiantBrandon/Olajuwon/Duncan/utils"
	"github.com/gorilla/websocket"
)

type BattleshipFleetType string

const (
	Ships  BattleshipFleetType = "Ships"
	Tetris                     = "Tetris"
)

type BattleshipFireType string

const (
	Original     BattleshipFireType = "Original"
	Equality                        = "Equality"
	Justice                         = "Justice"
	BattleRoyale                    = "BattleRoyale"
	FreeForAll                      = "FreeForAll"
)

type BattleshipCell string

const (
	Untouched BattleshipCell = "Untouched"
	Miss                     = "Miss"
	Ship                     = "Ship"
	Hit                      = "Hit"
)

type BattleshipGame struct {
	Players   []BattleshipPlayer `json:"players"`
	IsStarted bool               `json:"started"`
	Rules     BattleshipRules    `json:"rules"`
	Messages  []string           `json:"messages"`
}

type BattleshipRules struct {
	ShipType BattleshipFleetType `json:"shipType"`
	FireType BattleshipFireType  `json:"fireType"`
}

type BattleshipPlayer struct {
	Name       string           `json:"name"`
	Ships      map[string][]int `json:"ships"`
	Targets    []int            `json:"targets"`
	Active     bool             `json:"active"`
	Defeat     bool             `json:"defeat"`
	Connection *websocket.Conn
}

type BattleshipPlayerView struct {
	Name   string           `json:"name"`
	Board  []BattleshipCell `json:"board"`
	Active bool             `json:"active"`
	Defeat bool             `json:"defeat"`
}

func CheckDefeat(player BattleshipPlayer) bool {
	for _, ships := range player.Ships {
		for _, coordinate := range ships {
			if !utils.ListContains(player.Targets, coordinate) {
				return false
			}
		}
	}
	return true
}

func AssembleBoard(player BattleshipPlayer, isOwner bool) []BattleshipCell {
	board := []BattleshipCell{}
	if isOwner && len(player.Ships) == 0 {
		return board
	}
	for i := 0; i < 100; i++ {
		if utils.ShipContains(player.Ships, i) {
			if utils.ListContains(player.Targets, i) {
				board = append(board, Hit)
			} else {
				if isOwner {
					board = append(board, Ship)
				} else {
					board = append(board, Untouched)
				}
			}
		} else {
			if utils.ListContains(player.Targets, i) {
				board = append(board, Miss)
			} else {
				board = append(board, Untouched)
			}
		}
		board = append(board)
	}
	return board
}

type BattleshipRequest struct {
	Name    string           `json:"name"`
	Command string           `json:"command"`
	Board   []BattleshipCell `json:"board"`
	Targets []int            `json:"targets"`
	Ships   map[string][]int `json:"ships"`
	Rules   BattleshipRules  `json:"rules"`
}

func Filter(players []BattleshipPlayer, test func(BattleshipPlayer) bool) (ret []BattleshipPlayer) {
	for _, item := range players {
		if test(item) {
			ret = append(ret, item)
		}
	}
	return
}

type BattleshipView struct {
	Others    []BattleshipPlayerView `json:"others"`
	Self      BattleshipPlayerView   `json:"self"`
	IsStarted bool                   `json:"started"`
	Rules     BattleshipRules        `json:"rules"`
	Messages  []string               `json:"messages"`
}

func GameToView(game BattleshipGame, self BattleshipPlayer) BattleshipView {
	others := []BattleshipPlayerView{}
	for _, player := range game.Players {
		if self.Name != player.Name {
			others = append(others, BattleshipPlayerView{Name: player.Name, Board: AssembleBoard(player, false), Active: player.Active, Defeat: player.Defeat})
		}
	}
	return BattleshipView{Self: BattleshipPlayerView{Name: self.Name, Board: AssembleBoard(self, true), Active: self.Active, Defeat: self.Defeat}, Others: others, IsStarted: game.IsStarted, Rules: game.Rules, Messages: game.Messages}
}

package battleship

import (
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

type BattleshipStatus string

const (
	Setup  BattleshipCell = "Setup"
	Active                = "Active"
	End                   = "End"
)

type BattleshipGame struct {
	Players  map[string]BattleshipPlayer `json:"players"`
	Status   BattleshipStatus            `json:"started"`
	Rules    BattleshipRules             `json:"rules"`
	Messages []string                    `json:"messages"`
}

type BattleshipRules struct {
	ShipType BattleshipFleetType `json:"shipType"`
	FireType BattleshipFireType  `json:"fireType"`
}

type BattleshipPlayer struct {
	Ships      map[string][]int `json:"ships"`
	Targets    []int            `json:"targets"`
	ShipCount  int              `json:"shipCount"`
	Connection *websocket.Conn
}

type BattleshipPlayerView struct {
	Name      string           `json:"name"`
	Board     []BattleshipCell `json:"board"`
	Order     int              `json:"order"`
	ShipCount int              `json:"shipCount"`
}
type BattleshipRequest struct {
	Name    string           `json:"name"`
	Command string           `json:"command"`
	Board   []BattleshipCell `json:"board"`
	Targets map[string][]int `json:"targets"`
	Ships   map[string][]int `json:"ships"`
	Rules   BattleshipRules  `json:"rules"`
}

type BattleshipView struct {
	Others   []BattleshipPlayerView `json:"others"`
	Self     BattleshipPlayerView   `json:"self"`
	Status   BattleshipStatus       `json:"status"`
	Rules    BattleshipRules        `json:"rules"`
	Messages []string               `json:"messages"`
}

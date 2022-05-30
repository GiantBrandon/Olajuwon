package battleship

import (
	"github.com/gorilla/websocket"
)

type FleetType string

const (
	Ships  FleetType = "Ships"
	Tetris           = "Tetris"
)

type FireType string

const (
	Original     FireType = "Original"
	Equality              = "Equality"
	Justice               = "Justice"
	BattleRoyale          = "BattleRoyale"
	FreeForAll            = "FreeForAll"
)

type Cell string

const (
	Untouched Cell = "Untouched"
	Miss           = "Miss"
	Ship           = "Ship"
	Hit            = "Hit"
)

type Status string

const (
	Setup  Cell = "Setup"
	Active      = "Active"
	End         = "End"
)

type Game struct {
	Players  map[string]Player `json:"players"`
	Order    []string          `json:"order"`
	Status   Status            `json:"started"`
	Rules    Rules             `json:"rules"`
	Messages []string          `json:"messages"`
}

type Rules struct {
	ShipType FleetType `json:"shipType"`
	FireType FireType  `json:"fireType"`
}

type Player struct {
	Ships      map[string][]int `json:"ships"`
	Targets    []int            `json:"targets"`
	ShipCount  int              `json:"shipCount"`
	Cheater    bool             `json:"cheater"`
	Connection *websocket.Conn
}

type PlayerView struct {
	Name      string `json:"name"`
	Board     []Cell `json:"board"`
	Order     int    `json:"order"`
	ShipCount int    `json:"shipCount"`
	Cheater   bool   `json:"cheater"`
}
type Request struct {
	Name    string           `json:"name"`
	Command string           `json:"command"`
	Board   []Cell           `json:"board"`
	Targets map[string][]int `json:"targets"`
	Ships   map[string][]int `json:"ships"`
	Rules   Rules            `json:"rules"`
	Delete  string           `json:"delete"`
}

type View struct {
	Others   []PlayerView `json:"others"`
	Self     PlayerView   `json:"self"`
	Status   Status       `json:"status"`
	Rules    Rules        `json:"rules"`
	Messages []string     `json:"messages"`
}

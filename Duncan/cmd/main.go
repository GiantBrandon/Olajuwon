package main

import (
	"Olajuwon/Duncan/pkg/players"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func ReturnPlayers(c echo.Context) error {
	max := players.Player{
		Name:   "Max Fallan",
		Games:  44,
		Points: 30.5,
		FieldFoals: players.Shot{
			Made:      12.3,
			Attempted: 26.1,
		},
		ThreePointers: players.Shot{
			Made:      3.0,
			Attempted: 7.8,
		},
		FreeThrows: players.Shot{
			Made:      3.3,
			Attempted: 4.4,
		},
		OffensiveRebounds: .5,
		DefensiveRebounds: 2.1,
		Assists:           5.6,
		Turnovers:         2.5,
		Steals:            2.5,
		Blocks:            .4,
		Fouls:             3.4,
		PlusMinus:         11.7,
	}

	brandon := players.Player{
		Name:   "Brandon Kurtz",
		Games:  44,
		Points: 18.7,
		FieldFoals: players.Shot{
			Made:      6.1,
			Attempted: 10.5,
		},
		ThreePointers: players.Shot{
			Made:      1.0,
			Attempted: 2.9,
		},
		FreeThrows: players.Shot{
			Made:      2.1,
			Attempted: 2.6,
		},
		OffensiveRebounds: 2.1,
		DefensiveRebounds: 11.6,
		Assists:           4.0,
		Turnovers:         2.3,
		Steals:            1.1,
		Blocks:            3.4,
		Fouls:             2.3,
		PlusMinus:         12.4,
	}

	xavier := players.Player{
		Name:   "Xavier Reid",
		Games:  44,
		Points: 23.2,
		FieldFoals: players.Shot{
			Made:      10.1,
			Attempted: 22.3,
		},
		ThreePointers: players.Shot{
			Made:      1.3,
			Attempted: 4.3,
		},
		FreeThrows: players.Shot{
			Made:      1.8,
			Attempted: 2.5,
		},
		OffensiveRebounds: 1.6,
		DefensiveRebounds: 3.5,
		Assists:           2.0,
		Turnovers:         1.3,
		Steals:            2.1,
		Blocks:            2.3,
		Fouls:             4.3,
		PlusMinus:         10.9,
	}
	return c.JSON(http.StatusOK, players.PlayerList{[]players.Player{max, brandon, xavier}})
}

func main() {
	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.GET("/", ReturnPlayers)

	e.Logger.Fatal(e.Start(":1323"))
}

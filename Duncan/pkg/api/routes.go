package api

import (
	"github.com/GiantBrandon/Olajuwon/Duncan/pkg/players"
	"github.com/labstack/echo"
)

func RegisterRoutes(e echo.Echo) {
	e.GET("/users", players.GetPlayers)
}

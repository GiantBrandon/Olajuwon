package main

import (
	"net/http"

	"github.com/GiantBrandon/Olajuwon/Duncan/pkg/players"
	"github.com/GiantBrandon/Olajuwon/Duncan/pkg/users"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func GetPlayers(c echo.Context) error {
	allPlayers := players.GetPlayers()

	return c.JSON(http.StatusOK, allPlayers)
}

func GetUsers(c echo.Context) error {
	allUsers := users.GetUsers()

	return c.JSON(http.StatusOK, allUsers)
}

func main() {
	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.GET("/players", GetPlayers)
	e.GET("/users", GetUsers)

	e.Logger.Fatal(e.Start("localhost:8080"))
}

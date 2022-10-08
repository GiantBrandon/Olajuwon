package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/GiantBrandon/Olajuwon/Duncan/internal/battleship"
	"github.com/GiantBrandon/Olajuwon/Duncan/internal/login"
	"github.com/GiantBrandon/Olajuwon/Duncan/internal/match"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

type ApiKey struct {
	Key string `json:"key"`
}

var game = battleship.Game{
	Players: make(map[string]battleship.Player),
	Order:   make([]string, 0),
	Rules: battleship.Rules{
		ShipType: "Ships",
		FireType: "Justice",
	},
	Messages: []string{},
	Status:   "Setup",
}

var wsupgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

func wshandler(w http.ResponseWriter, r *http.Request) {
	conn, err := wsupgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Printf("Failed to set websocket upgrade: %+v", err)
		return
	}

	for {
		t, msg, err := conn.ReadMessage()
		fmt.Println(string(msg))
		request := battleship.Request{}
		json.Unmarshal(msg, &request)
		if err != nil || t == -1 {
			game = battleship.RemovePlayerConnection(game, conn)
			break
		}
		game = battleship.Validate(game, request, conn)
		switch request.Command {
		case "JOIN_ROOM":
			game = battleship.JoinRoom(game, request, conn)
			break
		case "START_GAME":
			game = battleship.StartGame(game)
			break
		case "REMOVE_PLAYER":
			game = battleship.RemovePlayerName(game, request.Delete)
			break
		case "CHANGE_STATE":
			game = battleship.ChangeState(game)
			break
		case "ADD_BOARD":
			game = battleship.AddBoard(game, request)
			break
		case "FIRE":
			game = battleship.Fire(game, request)
			break
		case "UPDATE_RULES":
			game.Rules = request.Rules
			game.Messages = append(game.Messages, fmt.Sprintf("%s updated the rules", request.Name))
			battleship.SendUpdates(game)
			break
		default:
			conn.WriteMessage(t, msg)
		}
	}
}

func main() {
	router := gin.Default()

	router.Use(cors.Default())
	router.Use(static.Serve("/", static.LocalFile("./ui", true)))
	router.GET("/ws", func(c *gin.Context) {
		wshandler(c.Writer, c.Request)
	})

	v1 := router.Group("v1")
	{
		v1.POST("/login", login.Login)
		v1.POST("/create", login.Create)
		v1.GET("/match", match.GetDailyMatch)
	}
	router.Run()
}

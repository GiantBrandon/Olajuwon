package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"math/rand"
	"net/http"
	"os"
	"strconv"

	"github.com/GiantBrandon/Olajuwon/Duncan/types"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/autotls"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

type ApiKey struct {
	Key string `json:"key"`
}

func Login(c *gin.Context) {
	content := gin.H{"ping": "received", "pong": "sent"}
	c.JSON(200, content)
}

func Linkedin(c *gin.Context) {
	resp, err := http.Get("https://api.linkedin.com/v2/me")
	if err != nil {
		log.Fatalln(err)
	}
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}
	fmt.Println(string(body))
	content := gin.H{"body": resp.Body}
	c.JSON(200, content)
}

func AverageStats(stats []types.Statistics) types.AverageStatline {
	avg := types.AverageStatline{}
	for _, statline := range stats {
		ast, _ := strconv.ParseFloat(statline.AST, 64)
		avg.AST += ast
		blk, _ := strconv.ParseFloat(statline.BLK, 64)
		avg.BLK += blk
		dreb, _ := strconv.ParseFloat(statline.DREB, 64)
		avg.DREB += dreb
		fga, _ := strconv.ParseFloat(statline.FGA, 64)
		avg.FGA += fga
		fgm, _ := strconv.ParseFloat(statline.FGM, 64)
		avg.FGM += fgm
		fgp, _ := strconv.ParseFloat(statline.FGP, 64)
		avg.FGP += fgp
		fta, _ := strconv.ParseFloat(statline.FTA, 64)
		avg.FTA += fta
		ftm, _ := strconv.ParseFloat(statline.FTM, 64)
		avg.FTM += ftm
		ftp, _ := strconv.ParseFloat(statline.FTP, 64)
		avg.FTP += ftp
		min, _ := strconv.ParseFloat(statline.MIN, 64)
		avg.MIN += min
		oreb, _ := strconv.ParseFloat(statline.OREB, 64)
		avg.OREB += oreb
		pf, _ := strconv.ParseFloat(statline.PF, 64)
		avg.PF += pf
		pm, _ := strconv.ParseFloat(statline.PM, 64)
		avg.PM += pm
		pts, _ := strconv.ParseFloat(statline.PTS, 64)
		avg.PTS += pts
		stl, _ := strconv.ParseFloat(statline.STL, 64)
		avg.STL += stl
		reb, _ := strconv.ParseFloat(statline.REB, 64)
		avg.REB += reb
		tpa, _ := strconv.ParseFloat(statline.TPA, 64)
		avg.TPA += tpa
		tpm, _ := strconv.ParseFloat(statline.TPM, 64)
		avg.TPM += tpm
		tpp, _ := strconv.ParseFloat(statline.TPP, 64)
		avg.TPP += tpp
		to, _ := strconv.ParseFloat(statline.TO, 64)
		avg.TO += to
	}
	avg.AST = avg.AST / float64(len(stats))
	avg.BLK = avg.BLK / float64(len(stats))
	avg.DREB = avg.DREB / float64(len(stats))
	avg.FGA = avg.FGA / float64(len(stats))
	avg.FGM = avg.FGM / float64(len(stats))
	avg.FGP = avg.FGM / avg.FGA
	avg.FTA = avg.FTA / float64(len(stats))
	avg.FTM = avg.FTM / float64(len(stats))
	avg.FTP = avg.FTM / avg.FGA
	avg.MIN = avg.MIN / float64(len(stats))
	avg.OREB = avg.OREB / float64(len(stats))
	avg.PF = avg.PF / float64(len(stats))
	avg.PM = avg.PM / float64(len(stats))
	avg.PTS = avg.PTS / float64(len(stats))
	avg.STL = avg.STL / float64(len(stats))
	avg.REB = avg.REB / float64(len(stats))
	avg.TPA = avg.TPA / float64(len(stats))
	avg.TPM = avg.TPM / float64(len(stats))
	avg.TPP = avg.TPM / avg.TPA
	avg.TO = avg.TO / float64(len(stats))
	return avg
}

func GetRecentGames(c *gin.Context) {
	player := c.Param("player")
	key, ok := c.MustGet("key").(string)
	if !ok {
		fmt.Println("Could not find key")
	}
	url := fmt.Sprintf("https://api-nba-v1.p.rapidapi.com/statistics/players/playerId/%s", player)
	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("x-rapidapi-key", key)
	req.Header.Add("x-rapidapi-host", "api-nba-v1.p.rapidapi.com")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	stats := types.GetStatsResponse{}
	json.Unmarshal(body, &stats)
	fmt.Println(stats)
	recentStats := stats.Api.Statlines[len(stats.Api.Statlines)-5:]
	content := gin.H{"stats": AverageStats(recentStats)}
	c.JSON(200, content)
}

func GetPlayers(c *gin.Context) {
	key, ok := c.MustGet("key").(string)
	if !ok {
		fmt.Println("Could not find key")
	}
	url := "https://api-nba-v1.p.rapidapi.com/players/league/standard"
	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("x-rapidapi-key", key)
	req.Header.Add("x-rapidapi-host", "api-nba-v1.p.rapidapi.com")

	res, err := http.DefaultClient.Do(req)

	if err != nil {
		fmt.Println(err)
	}

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	players := types.PlayersResponse{}
	json.Unmarshal(body, &players)
	content := gin.H{"players": players.Api.Players}
	c.JSON(200, content)
}

type Status int64

const (
	Empty Status = iota
	Hit
	Miss
)

func GetBoards(c *gin.Context) {
	r := rand.New(rand.NewSource(99))
	var board [100]bool
	for i := 0; i < 100; i++ {
		board[i] = r.Float32() < .5
	}
	content := gin.H{"board": board}
	c.JSON(200, content)
}

func OptionsLogin(c *gin.Context) {
	c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT")
	c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	c.Next()
}

func ApiMiddleware(key string) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Set("key", key)
		c.Next()
	}
}

func GetKey() string {
	keyFile, err := ioutil.ReadFile(".env.local")
	if err != nil {
		fmt.Errorf(".env.local file not found. %w", err)
	}
	key := ApiKey{}
	json.Unmarshal([]byte(keyFile), &key)
	return key.Key
}

var game = types.BattleshipGame{
	Players: []types.BattleshipPlayer{},
	Rules: types.BattleshipRules{
		ShipType: "Ships",
		FireType: "Equality",
	},
	Messages: []string{},
}
var active = 0

func updateGame() {
	for _, player := range game.Players {
		player.Connection.WriteJSON(types.GameToView(game, player))
	}
}

var wsupgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

func wshandler(w http.ResponseWriter, r *http.Request) {
	conn, err := wsupgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println("Failed to set websocket upgrade: %+v", err)
		return
	}

	for {
		t, msg, err := conn.ReadMessage()
		request := types.BattleshipRequest{}
		json.Unmarshal(msg, &request)
		if err != nil || t == -1 {
			for i := 0; i < len(game.Players); i++ {
				if game.Players[i].Connection == conn {
					game.Messages = append(game.Messages, fmt.Sprintf("%s left", game.Players[i].Name))
					game.Players = append(game.Players[:i], game.Players[i+1:]...)
					updateGame()
					break
				}
			}
			break
		}
		switch request.Command {
		case "JOIN_ROOM":
			game.Players = append(game.Players, types.BattleshipPlayer{Name: request.Name, Active: len(game.Players) == 0, Connection: conn})
			game.Messages = append(game.Messages, fmt.Sprintf("%s joined", request.Name))
			updateGame()
			break
		case "RESET":
			for i := 0; i < len(game.Players); i++ {
				game.Players[i] = types.BattleshipPlayer{Name: request.Name, Active: i == 0, Connection: conn}
			}
			updateGame()
			break
		case "ADD_BOARD":
			for i := 0; i < len(game.Players); i++ {
				if game.Players[i].Name == request.Name {
					game.Players[i].Ships = request.Ships
				}
			}
			updateGame()
			break
		case "FIRE":
			if active == len(game.Players)-1 {
				active = 0
			} else {
				active = active + 1
			}
			for i := 0; i < len(game.Players); i++ {
				game.Players[i].Targets = append(game.Players[i].Targets, request.Targets...)
				game.Players[i].Defeat = types.CheckDefeat(game.Players[i])
				if i == active {
					game.Players[i].Active = true
				} else {
					game.Players[i].Active = false
				}
			}
			updateGame()
			break
		case "UPDATE_RULES":
			game.Rules = request.Rules
			game.Messages = append(game.Messages, fmt.Sprintf("%s updated the rules", request.Name))
			updateGame()
			break
		default:
			conn.WriteMessage(t, msg)
		}
	}
}

func main() {
	arg := os.Args[1]
	key := GetKey()
	router := gin.Default()

	router.Use(cors.Default())
	router.Use(ApiMiddleware(key))
	router.GET("/ws", func(c *gin.Context) {
		wshandler(c.Writer, c.Request)
	})

	v1 := router.Group("v1")
	{
		v1.GET("/login", Login)
		v1.OPTIONS("/login", OptionsLogin)
		v1.GET("/linkedin", Linkedin)
		v1.GET("/recentgames/:player", GetRecentGames)
		v1.GET("/players", GetPlayers)
		v1.GET("/boards", GetBoards)
	}

	if arg == "prod" {
		log.Fatal(autotls.Run(router, "api.kyojin.dev", "localhost"))
	} else {
		router.Run()
	}
}

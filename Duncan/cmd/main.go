package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"math/rand"
	"net/http"
	"strconv"

	"github.com/GiantBrandon/Olajuwon/Duncan/types"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/contrib/static"
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

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		fmt.Println(err)
	}

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	stats := types.GetStatsResponse{}
	json.Unmarshal(body, &stats)
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

var turnOrder = make([]string, 0)
var game = types.BattleshipGame{
	Players: make(map[string]types.BattleshipPlayer),
	Rules: types.BattleshipRules{
		ShipType: "Ships",
		FireType: "Original",
	},
	Messages: []string{},
}

func updateGame() {
	for name, player := range game.Players {
		player.Connection.WriteJSON(types.GameToView(game, name, turnOrder[0]))
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
		fmt.Printf("Failed to set websocket upgrade: %+v", err)
		return
	}

	for {
		t, msg, err := conn.ReadMessage()
		request := types.BattleshipRequest{}
		json.Unmarshal(msg, &request)
		if err != nil || t == -1 {
			for name, player := range game.Players {
				if player.Connection == conn {
					game.Messages = append(game.Messages, fmt.Sprintf("%s left", name))
					delete(game.Players, name)
					index := -1
					for i, value := range turnOrder {
						if value == name {
							index = i
						}
					}
					turnOrder = append(turnOrder[:index], turnOrder[index+1:]...)
					updateGame()
					break
				}
			}
			break
		}
		switch request.Command {
		case "JOIN_ROOM":
			game.Players[request.Name] = types.BattleshipPlayer{Connection: conn}
			turnOrder = append(turnOrder, request.Name)
			game.Messages = append(game.Messages, fmt.Sprintf("%s joined", request.Name))
			updateGame()
			break
		case "RESET":
			for name, player := range game.Players {
				game.Players[name] = types.BattleshipPlayer{Connection: player.Connection}
			}
			updateGame()
			break
		case "ADD_BOARD":
			for name, player := range game.Players {
				if name == request.Name {
					game.Players[name] = types.BattleshipPlayer{Ships: request.Ships, Connection: player.Connection}
				}
			}
			updateGame()
			break
		case "FIRE":
			turnOrder = append(turnOrder[1:], turnOrder[0])
			for game.Players[turnOrder[0]].Defeat == true {
				turnOrder = append(turnOrder[1:], turnOrder[0])
			}
			switch game.Rules.FireType {
			case "Original":
				game.Messages = append(game.Messages, fmt.Sprintf("%s fired at %v", request.Name, request.Targets))
				for name, targets := range request.Targets {
					player := game.Players[name]
					player.Targets = append(game.Players[name].Targets, targets...)
					game.Players[name] = player
				}
			case "Equality":
				for name, player := range game.Players {
					player.Targets = append(game.Players[name].Targets, request.Targets["all"]...)
					game.Players[name] = player
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
	key := GetKey()
	router := gin.Default()

	router.Use(cors.Default())
	router.Use(ApiMiddleware(key))
	router.Use(static.Serve("/", static.LocalFile("../maravich/build", true)))
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
	router.Run()
}

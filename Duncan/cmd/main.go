package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type ApiKey struct {
	Key string `json:"key"`
}

type getStatsResponse struct {
	Api getStatsAPI `json:"api"`
}

type getStatsAPI struct {
	Statlines []Statistics `json:"statistics"`
}

type Statistics struct {
	AST  string `json:"assists"`
	BLK  string `json:"blocks"`
	DREB string `json:"defReb"`
	FGA  string `json:"fga"`
	FGM  string `json:"fgm"`
	FGP  string `json:"fgp"`
	FTA  string `json:"fta"`
	FTM  string `json:"ftm"`
	FTP  string `json:"ftp"`
	MIN  string `json:"min"`
	OREB string `json:"offReb"`
	PF   string `json:"pFouls"`
	PM   string `json:"plusMinus"`
	PTS  string `json:"points"`
	STL  string `json:"steals"`
	REB  string `json:"totReb"`
	TPA  string `json:"tpa"`
	TPM  string `json:"tpm"`
	TPP  string `json:"tpp"`
	TO   string `json:"turnovers"`
}

type Statline struct {
	AST  int     `json:"assists"`
	BLK  int     `json:"blocks"`
	DREB int     `json:"defReb"`
	FGA  int     `json:"fga"`
	FGM  int     `json:"fgm"`
	FGP  float32 `json:"fgp"`
	FTA  int     `json:"fta"`
	FTM  int     `json:"ftm"`
	FTP  float32 `json:"ftp"`
	MIN  float32 `json:"min"`
	OREB int     `json:"offReb"`
	PF   int     `json:"pFouls"`
	PM   int     `json:"plusMinus"`
	PTS  int     `json:"points"`
	STL  int     `json:"steals"`
	REB  int     `json:"totReb"`
	TPA  int     `json:"tpa"`
	TPM  int     `json:"tpm"`
	TPP  float32 `json:"tpp"`
	TO   int     `json:"turnovers"`
}

type AverageStatline struct {
	AST  float64 `json:"assists"`
	BLK  float64 `json:"blocks"`
	DREB float64 `json:"defReb"`
	FGA  float64 `json:"fga"`
	FGM  float64 `json:"fgm"`
	FGP  float64 `json:"fgp"`
	FTA  float64 `json:"fta"`
	FTM  float64 `json:"ftm"`
	FTP  float64 `json:"ftp"`
	MIN  float64 `json:"min"`
	OREB float64 `json:"offReb"`
	PF   float64 `json:"pFouls"`
	PM   float64 `json:"plusMinus"`
	PTS  float64 `json:"points"`
	STL  float64 `json:"steals"`
	REB  float64 `json:"totReb"`
	TPA  float64 `json:"tpa"`
	TPM  float64 `json:"tpm"`
	TPP  float64 `json:"tpp"`
	TO   float64 `json:"turnovers"`
}

type PlayersResponse struct {
	Api Players `json:"api"`
}

type Players struct {
	Status  int                      `json:"status"`
	Message string                   `json:"message"`
	Results int                      `json:"results"`
	Filters []map[string]interface{} `json:"filters"`
	Players []Player                 `json:"players"`
}

type Player struct {
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	PlayerId  string `json:"playerId"`
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

func AverageStats(stats []Statistics) AverageStatline {
	avg := AverageStatline{}
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
	avg.FGP = avg.FGP / float64(len(stats))
	avg.FTA = avg.FTA / float64(len(stats))
	avg.FTM = avg.FTM / float64(len(stats))
	avg.FTP = avg.FTP / float64(len(stats))
	avg.MIN = avg.MIN / float64(len(stats))
	avg.OREB = avg.OREB / float64(len(stats))
	avg.PF = avg.PF / float64(len(stats))
	avg.PM = avg.PM / float64(len(stats))
	avg.PTS = avg.PTS / float64(len(stats))
	avg.STL = avg.STL / float64(len(stats))
	avg.REB = avg.REB / float64(len(stats))
	avg.TPA = avg.TPA / float64(len(stats))
	avg.TPM = avg.TPM / float64(len(stats))
	avg.TPP = avg.TPP / float64(len(stats))
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

	stats := getStatsResponse{}
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

	players := PlayersResponse{}
	json.Unmarshal(body, &players)
	content := gin.H{"players": players.Api.Players}
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

func main() {
	key := GetKey()
	router := gin.Default()

	router.Use(cors.Default())
	router.Use(ApiMiddleware(key))

	v1 := router.Group("v1")
	{
		v1.GET("/login", Login)
		v1.OPTIONS("/login", OptionsLogin)
		v1.GET("/linkedin", Linkedin)
		v1.GET("/recentgames/:player", GetRecentGames)
		v1.GET("/players", GetPlayers)
	}

	router.Run()
}

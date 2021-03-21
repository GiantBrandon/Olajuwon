package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type StatisticsResponse struct {
	Api Statistics `json:"api"`
}

type Statistics struct {
	Status     int                      `json:"status"`
	Message    string                   `json:"message"`
	Results    int                      `json:"results"`
	Filters    []map[string]interface{} `json:"filters"`
	Statistics []map[string]interface{} `json:"statistics"`
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

func Fantasy(c *gin.Context) {
	player := c.Param("player")
	data, err := ioutil.ReadFile(".env.local")
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(string(data))
	url := fmt.Sprintf("https://api-nba-v1.p.rapidapi.com/statistics/players/playerId/%s", player)
	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("x-rapidapi-key", string(data))
	req.Header.Add("x-rapidapi-host", "api-nba-v1.p.rapidapi.com")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)
	fmt.Println(string(body))

	stats := StatisticsResponse{}
	json.Unmarshal(body, &stats)
	content := gin.H{"stats": stats.Api.Statistics}
	c.JSON(200, content)
}

func GetPlayers(c *gin.Context) {
	data, err := ioutil.ReadFile(".env.local")
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(string(data))
	url := "https://api-nba-v1.p.rapidapi.com/players/league/standard"
	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("x-rapidapi-key", string(data))
	req.Header.Add("x-rapidapi-host", "api-nba-v1.p.rapidapi.com")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)
	fmt.Println(string(body))

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

func main() {
	router := gin.Default()

	router.Use(cors.Default())

	v1 := router.Group("v1")
	{
		v1.GET("/login", Login)
		v1.OPTIONS("/login", OptionsLogin)
		v1.GET("/linkedin", Linkedin)
		v1.GET("/fantasy/:player", Fantasy)
		v1.GET("/players", GetPlayers)
	}

	router.Run()
}

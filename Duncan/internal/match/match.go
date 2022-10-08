package match

import (
	"math/rand"
	"time"

	"github.com/gin-gonic/gin"
)

type MatchSetup struct {
	Board        [][]int   `json:"board"`
	Replacements []int     `json:"replacements"`
	Expiration   time.Time `json:"expiration"`
}

var currentMatch = MatchSetup{}

func GenerateNewMatch() MatchSetup {
	rand.Seed(time.Now().UnixNano())
	board := make([][]int, 9)
	for row := 0; row < 9; row++ {
		board[row] = make([]int, 12)
		for column := 0; column < 12; column++ {
			item := rand.Intn(4)
			for (row != 0 && item == board[row-1][column]) || (column != 0 && item == board[row][column-1]) {
				item = rand.Intn(4)
			}
			board[row][column] = item
		}
	}
	replacements := make([]int, 1000)
	for index := 1; index < 1000; index++ {
		replacements[index] = rand.Intn(4)
	}
	return MatchSetup{
		Board:        board,
		Replacements: replacements,
		Expiration:   time.Now(),
	}
}

func GetDailyMatch(c *gin.Context) {
	if currentMatch.Expiration.Add(time.Hour * 24).Before(time.Now()) {
		currentMatch = GenerateNewMatch()
	}
	c.JSON(200, currentMatch)
}

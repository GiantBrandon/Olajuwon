package players

type Team struct {
	ID       int32  `json:"id"`
	Location string `json:location"`
	Name     string `json:"name"`
}

//Player represents all of a players stats
type Player struct {
	ID                int32   `json:"id"`
	Name              string  `json:"name"`
	Games             int32   `json:"games"`
	Points            float32 `json:"points"`
	FieldFoals        Shot    `json:"fieldGoals"`
	ThreePointers     Shot    `json:"threePointers"`
	FreeThrows        Shot    `json:"freeThrows"`
	OffensiveRebounds float32 `json:"offensiveRebounds"`
	DefensiveRebounds float32 `json:"defensiveRebounds"`
	Assists           float32 `json:"assists"`
	Turnovers         float32 `json:"turnovers"`
	Steals            float32 `json:"steals"`
	Blocks            float32 `json:"blocks"`
	Fouls             float32 `json:"fouls"`
	PlusMinus         float32 `json:"plusMinus"`
}

type Stats struct {
	ID int32 `json:"id"`
}

//Shot represent a stat that tracks attempts and makes
type Shot struct {
	Made      float32 `json:"Made"`
	Attempted float32 `json:"Attempted"`
}

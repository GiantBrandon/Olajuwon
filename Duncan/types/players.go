package types

type GetStatsResponse struct {
	Api GetStatsAPI `json:"api"`
}

type GetStatsAPI struct {
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

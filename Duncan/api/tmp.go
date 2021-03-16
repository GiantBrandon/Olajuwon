type StatisticsResponse struct {
	Status int `json:"status"`
	Message string `json:"message"`
	Results int `json:"results"`
	Filters [map[string]interface{}] `json:"filters"`
	statistics map[string]interface{} `json:"statistics"`
}
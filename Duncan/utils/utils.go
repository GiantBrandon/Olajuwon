package utils

func ListContains(list []int, target int) bool {
	for _, item := range list {
		if item == target {
			return true
		}
	}
	return false
}

func ShipContains(ships map[string][]int, target int) bool {
	for _, ship := range ships {
		if ListContains(ship, target) {
			return true
		}
	}
	return false
}

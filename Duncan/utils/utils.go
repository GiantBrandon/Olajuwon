package utils

func Contains[T int | string](list []T, target T) bool {
	index := Find(list, target)
	if index == -1 {
		return false
	} else {
		return true
	}
}

func Find[T int | string](list []T, target T) int {
	for index, item := range list {
		if item == target {
			return index
		}
	}
	return -1
}

func ShipContains(ships map[string][]int, target int) bool {
	for _, ship := range ships {
		if Contains(ship, target) {
			return true
		}
	}
	return false
}

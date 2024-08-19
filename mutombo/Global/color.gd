class_name Color16 extends Node

enum ColorType { RED, GREEN, BLUE, YELLOW, VIOLET, INDIGO, WHITE, GRAY }
static var TypeToString = {
	ColorType.RED: "Red",
	ColorType.GREEN: "Green",
	ColorType.BLUE: "Blue",
	ColorType.YELLOW: "Yellow",
	ColorType.VIOLET: "Violet",
	ColorType.INDIGO: "Indigo",
	ColorType.WHITE: "White",
	ColorType.GRAY: "Gray",
}

var r: int
# red - damage
var g: int
# green - range
var b: int
# blue - speed

func _init(r, g, b) -> void:
	self.r = min(15, max(0, r))
	self.g = min(15, max(0, g))
	self.b = min(15, max(0, b))

func to_color() -> Color:
	return Color8(16 * r + 15, 16 * g + 15, 16 * b + 15)

func to_type() -> ColorType:
	if (r > 4 && r >= g * 2 && r >= b * 2):
		return ColorType.RED
	elif (g > 4 && g >= r * 2 && g >= b * 2):
		return ColorType.GREEN
	elif (b > 4 && b >= r * 2 && b >= g * 2):
		return ColorType.BLUE
	elif (r > 4 && g > 4 && abs(r - g) <= 1 && r >= b * 2 && g >= b * 2):
		return ColorType.YELLOW
	elif (r > 64 && b > 4 && abs(r - b) <= 1 && r >= g * 2 && b >= g * 2):
		return ColorType.VIOLET
	elif (g > 64 && b > 4 && abs(g - b) <= 1 && g >= r * 2 && b >= r * 2):
		return ColorType.INDIGO
	elif (r > 12 && g > 12 && b > 12):
		return ColorType.WHITE
	return ColorType.GRAY

func to_name() -> String:
	return TypeToString[to_type()]

func _to_string() -> String:
	return "{ r: {r}, g: {g}, b: {b} }".format({ "r": r, "g": g, "b": b })
	
func plus(r, g, b):
	return Color16.new(self.r + r, self.g + g, self.b + b)

extends Node

signal on_change_tower
@export var current_tower: Node2D:
	get:
		return current_tower
	set(value):
		if (current_tower != null && current_tower != value):
			current_tower.get_node("Range").visible = false
		current_tower = value
		if current_tower != null:
			current_tower.get_node("Range").visible = true
		on_change_tower.emit(value)

signal on_change_health
@export var current_health: int = 100:
	get:
		return current_health
	set(value):
		current_health = value
		on_change_health.emit(value)

signal on_change_money
@export var current_money: int = 10000:
	get:
		return current_money
	set(value):
		current_money = value
		on_change_money.emit(value)
		
static func get_red(color) -> int:
	return (color.r8 + 1) / 16
	
static func get_green(color) -> int:
	return (color.g8 + 1) / 16

static func get_blue(color) -> int:
	return (color.b8 + 1) / 16
	
static func get_color_name(color) -> String:
	var red = color.r8
	var green = color.g8
	var blue = color.b8
	if (red > 64 && red >= green * 2 && red >= blue * 2):
		return "Red"
	elif (green > 64 && green >= red * 2 && green >= blue * 2):
		return "Green"
	elif (blue > 64 && blue >= red * 2 && blue >= green * 2):
		return "Blue"
	elif (red > 64 && green > 64 && abs(red - green) <= 16 && red >= blue * 2 && green >= blue * 2):
		return "Yellow"
	elif (red > 64 && blue > 64 && abs(red - blue) <= 16 && red >= green * 2 && blue >= green * 2):
		return "Violet"
	elif (green > 64 && blue > 64 && abs(green - blue) <= 16 && green >= red * 2 && blue >= red * 2):
		return "Indigo"
	elif (red > 200 && green > 200 && blue > 100):
		return "White"
	return "Gray"

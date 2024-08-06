extends "res://Towers/Tower.gd"

func _init():
	tower_name = "Basic Tower"

func upgrade_green():
	super()
	get_node("Range").shape.radius = 100 + 10 * Global.get_green(color)
	var tower_range = .31 + .031 * Global.get_green(color)
	get_node("Range/VisualRange").scale = Vector2(tower_range, tower_range)

func calc_damage():
	return Global.get_red(color)
	
func calc_cooldown():
	return 2.5 - Global.get_blue(color) / 20.0

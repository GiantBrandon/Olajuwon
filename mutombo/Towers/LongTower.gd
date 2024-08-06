extends "res://Towers/Tower.gd"

func _init():
	tower_name = "Long Tower"
	
func upgrade_green():
	super()
	get_node("Range").shape.radius = 100 + 20 * Global.get_green(color)
	var tower_range = .31 + .062 * Global.get_green(color)
	get_node("Range/VisualRange").scale = Vector2(tower_range, tower_range)

func calc_damage():
	return ceil(Global.get_red(color) / 2.0)
	
func calc_cooldown():
	return 3 - Global.get_blue(color) / 40

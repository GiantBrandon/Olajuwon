extends "res://Towers/Tower.gd"

var y: int = 6

func _init():
	tower_name = "Fast Tower"

func upgrade_green():
	super()
	get_node("Range").shape.radius = 100 + 5 * Global.get_green(color)
	var tower_range = .31 + .0165 * Global.get_green(color)
	get_node("Range/VisualRange").scale = Vector2(tower_range, tower_range)

func calc_damage():
	return Global.get_red(color)
	
func calc_cooldown():
	return 2.5 - Global.get_blue(color) / 10.0
	
func fire_laser(target, rotation):
	var rotated = Vector2(0, y).rotated(rotation)
	get_node("Laser").set_point_position(0, rotated)
	get_node("Laser").set_point_position(1, target)

func reset_laser():
	if (y > 0):
		y = -6
	else:
		y = 6
	get_node("Laser").set_point_position(0, Vector2(0, 0))
	get_node("Laser").set_point_position(1, Vector2(0, 0))

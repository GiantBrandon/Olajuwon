class_name LongTower
extends AttackTower

func _init():
	tower_name = "Long Tower"
	tower_type = Global.TowerType.LONG
	
func upgrade_green():
	super()
	get_node("Range").shape.radius = 100 + 20 * color.g
	var tower_range = .31 + .062 * color.g
	get_node("Range/VisualRange").scale = Vector2(tower_range, tower_range)

func calc_damage():
	return ceil(float(color.r + 1) / 2.0)
	
func calc_cooldown():
	return 3 - color.b / 40

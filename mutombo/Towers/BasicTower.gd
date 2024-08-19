class_name BaseTower
extends AttackTower

func _init():
	tower_name = "Basic Tower"
	tower_type = Global.TowerType.BASIC

func upgrade_green():
	super()
	get_node("Range").shape.radius = 100 + 10 * color.g
	var tower_range = .31 + .031 * color.g
	get_node("Range/VisualRange").scale = Vector2(tower_range, tower_range)

func calc_damage():
	return color.r
	
func calc_cooldown():
	return 1 + 1.5 / color.b

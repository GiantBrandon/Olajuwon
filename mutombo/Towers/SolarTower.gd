class_name SolarTower
extends Tower

var tick = 1

func _init():
	tower_name = "Solar Tower"
	tower_type = Global.TowerType.SOLAR

func _process(delta):
	var stopped = !get_tree().get_root().get_node("Map/Spawner").started
	if (stopped):
		return
	tick -= delta
	if (tick < 0):
		if (color.to_color() == Color.RED):
			Global.current_money += Color8(1, 0, 0)
		elif (color.to_color() == Color.GREEN):
			Global.current_money += Color8(0, 1, 0)
		elif (color.to_color() == Color.BLUE):
			Global.current_money += Color8(0, 0, 1)
		tick += 1

extends Panel

func _ready():
	Global.on_change_health.connect(_on_change_health)
	Global.on_change_money.connect(_on_change_money)
	Global.on_change_tower.connect(_on_change_tower)
	get_node("Column/Store").visible = true
	get_node("Column/TowerUpgrades").visible = false
	get_node("Column/TowerSelection").visible = false

func _on_change_health(health):
	get_node("Column/Info/Health/Value").text = str(health)
	
func _on_change_money(money):
	get_node("Column/Info/Money/Value").text = "R{R} G{G} B{B}".format(
		{ "R": money.r8, "G": money.g8, "B": money.b8 }
	)
	
func _on_change_tower(tower):
	get_node("Column/Store").visible = tower == null
	if (tower == null):
		get_node("Column/Store").visible = true
		get_node("Column/TowerUpgrades").visible = false
		get_node("Column/TowerSelection").visible = false
	elif (tower.tower_type == Global.TowerType.SOLAR):
		get_node("Column/Store").visible = false
		get_node("Column/TowerSelection").visible = true
		
		get_node("Column/TowerUpgrades/Name").text = tower.color.to_name() + " " + tower.tower_name
	else:
		get_node("Column/Store").visible = false
		get_node("Column/TowerUpgrades").visible = true
		
		get_node("Column/TowerUpgrades/Name").text = tower.color.to_name() + " " + tower.tower_name
		get_node("Column/TowerUpgrades/RedUpgrade/Label").text = str(tower.color.r) + " / 16 cost: " + str(tower.color.r * 5)
		get_node("Column/TowerUpgrades/GreenUpgrade/Label").text = str(tower.color.g) + " / 16 cost: " + str(tower.color.g * 5)
		get_node("Column/TowerUpgrades/BlueUpgrade/Label").text = str(tower.color.b) + " / 16 cost: " + str(tower.color.b * 5)

func _on_close_pressed():
	Global.current_tower = null

func _on_button_pressed():
	get_parent().get_node("Spawner").call_next()
	
func upgrade(color, event):
	if event is InputEventMouseButton && event.button_mask == 1:
		var tower = Global.current_tower
		if color == "red" && Global.current_money.r8 >= Global.current_tower.color.r * 5:
			if Global.current_tower.can_upgrade_red():
				Global.current_money -= Color8(Global.current_tower.color.r * 5, 0, 0)
				Global.current_tower.upgrade_red()
		elif color == "green" && Global.current_money.g8 >= Global.current_tower.color.g * 5:
			if Global.current_tower.can_upgrade_green():
				Global.current_money -= Color8(0, Global.current_tower.color.g * 5, 0)
				Global.current_tower.upgrade_green()
		elif color == "blue" && Global.current_money.b8 >= Global.current_tower.color.b * 5:
			if Global.current_tower.can_upgrade_blue():
				Global.current_money -= Color8(0, 0, Global.current_tower.color.b * 5)
				Global.current_tower.upgrade_blue()
	
func _on_red_upgrade_gui_input(event):
	upgrade("red", event)

func _on_green_upgrade_gui_input(event):
	upgrade("green", event)

func _on_blue_upgrade_gui_input(event):
	upgrade("blue", event)

@onready var towers = {
	Global.TowerType.BASIC: preload("res://Towers/BasicTower.tscn"),
	Global.TowerType.FAST: preload("res://Towers/FastTower.tscn"),
	Global.TowerType.STRONG: preload("res://Towers/StrongTower.tscn"),
	Global.TowerType.LONG: preload("res://Towers/LongTower.tscn"),
	Global.TowerType.SOLAR: preload("res://Towers/SolarTower.tscn")
}
var enabled = false

func _on_tower_gui_input(type, event, cost):
	var tower = towers[type].instantiate()
	tower.z_index = 1
	var money = Global.current_money
	if cost.r > money.r || cost.g > money.g || cost.b > money.b:
		return
	if event is InputEventMouseButton && event.button_mask == 1:
		add_child(tower)
		get_child(1).global_position = event.global_position
	elif event is InputEventMouseMotion && event.button_mask == 1:
		get_child(1).global_position = event.global_position
		var map = get_tree().get_root().get_node("Map/Ground")
		var grid_position = map.local_to_map(event.global_position * 5)
		if grid_position.x < 17 and map.get_cell_source_id(1, grid_position) == -1:
			enabled = true
			if (tower.tower_type != Global.TowerType.SOLAR):
				get_child(1).get_node("Range/VisualRange").modulate = Color(1, 1, 1, .8)
		else:
			enabled = false
			if (tower.tower_type != Global.TowerType.SOLAR):
				get_child(1).get_node("Range/VisualRange").modulate = Color(1, 0, 0, .8)
	elif event is InputEventMouseButton && event.button_mask == 0:
		get_child(1).queue_free()
		if enabled:
			var root = get_tree().get_root().get_node("Map/Towers")
			Global.current_money -= cost
			root.add_child(tower)
			var map = get_tree().get_root().get_node("Map/Ground")
			var grid_position = map.local_to_map(event.global_position * 5)
			tower.global_position = map.map_to_local(grid_position) / 5
			if (tower.tower_type != Global.TowerType.SOLAR):
				tower.get_node("Range").visible = false

func _on_basic_tower_gui_input(event):
	_on_tower_gui_input(Global.TowerType.BASIC, event, Color8(20, 20, 20))

func _on_fast_tower_gui_input(event):
	_on_tower_gui_input(Global.TowerType.FAST, event, Color8(20, 20, 20))
	
func _on_strong_tower_gui_input(event):
	_on_tower_gui_input(Global.TowerType.STRONG, event, Color8(20, 20, 20))
	
func _on_long_tower_gui_input(event):
	_on_tower_gui_input(Global.TowerType.LONG, event, Color8(20, 20, 20))

func _on_solar_outline_gui_input(event):
	_on_tower_gui_input(Global.TowerType.SOLAR, event, Color8(100, 100, 100))

func _on_red_selection_gui_input(event):
	if event is InputEventMouseButton && event.button_mask == 1:
		Global.current_tower.color = Color.RED

func _on_green_selection_gui_input(event):
	if event is InputEventMouseButton && event.button_mask == 1:
		Global.current_tower.color = Color.GREEN

func _on_blue_selection_gui_input(event):
	if event is InputEventMouseButton && event.button_mask == 1:
		Global.current_tower.color = Color.BLUE

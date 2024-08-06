extends Panel


func _ready():
	Global.on_change_health.connect(_on_change_health)
	Global.on_change_money.connect(_on_change_money)
	Global.on_change_tower.connect(_on_change_tower)

func _on_change_health(health):
	get_node("Column/Info/Health/Value").text = str(health)
	
func _on_change_money(money):
	get_node("Column/Info/Money/Value").text = str(money)
	
func _on_change_tower(tower):
	get_node("Column/Store").visible = tower == null
	if (tower != null):
		get_node("Column/Store").visible = false
		get_node("Column/Upgrades").visible = true
		
		get_node("Column/Upgrades/Name").text = Global.get_color_name(tower.color) + " " + tower.tower_name
		get_node("Column/Upgrades/RedUpgrade/Label").text = str(Global.get_red(tower.color)) + " / 16"
		get_node("Column/Upgrades/GreenUpgrade/Label").text = str(Global.get_green(tower.color)) + " / 16"
		get_node("Column/Upgrades/BlueUpgrade/Label").text = str(Global.get_blue(tower.color)) + " / 16"
		var cost = (Global.get_red(tower.color) + Global.get_green(tower.color) + Global.get_blue(tower.color)) * 10
		get_node("Column/Upgrades/CostLabel").text = "Cost " + str(cost)
	else:
		get_node("Column/Store").visible = true
		get_node("Column/Upgrades").visible = false

func _on_close_pressed():
	Global.current_tower = null

func _on_button_pressed():
	get_parent().get_node("Timer").call_next()
	
func upgrade(color, event):
	if event is InputEventMouseButton && event.button_mask == 1:
		var tower = Global.current_tower
		var cost = int((tower.color.r + tower.color.g + tower.color.b) * 100)
		var current_color = 255
		if color == "red":
			current_color = tower.color.r8
		elif color == "green":
			current_color = tower.color.g8
		elif color == "blue":
			current_color = tower.color.b8
		if Global.current_money >= cost && current_color < 255:
			if color == "red":
				Global.current_tower.upgrade_red()
			elif color == "green":
				Global.current_tower.upgrade_green()
			elif color == "blue":
				Global.current_tower.upgrade_blue()
			Global.current_money -= cost
	
func _on_red_upgrade_gui_input(event):
	upgrade("red", event)

func _on_green_upgrade_gui_input(event):
	upgrade("green", event)

func _on_blue_upgrade_gui_input(event):
	upgrade("blue", event)

@onready var towers = {
	"basic": preload("res://Towers/BasicTower.tscn"),
	"fast": preload("res://Towers/FastTower.tscn"),
	"strong": preload("res://Towers/StrongTower.tscn"),
	"long": preload("res://Towers/LongTower.tscn")
}
var cost = 100
var enabled = false

func _on_tower_gui_input(type, event):
	var tower = towers[type].instantiate()
	tower.z_index = 1
	if event is InputEventMouseButton && event.button_mask == 1:
		add_child(tower)
		get_child(1).global_position = event.global_position
	elif event is InputEventMouseMotion && event.button_mask == 1:
		get_child(1).global_position = event.global_position
		var map = get_tree().get_root().get_node("Map/Ground")
		var grid_position = map.local_to_map(event.global_position * 5)
		if grid_position.x < 17 and map.get_cell_source_id(1, grid_position) == -1:
			enabled = true
			get_child(1).get_node("Range/VisualRange").modulate = Color(1, 1, 1, .8)
		else:
			enabled = false
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
			tower.get_node("Range").visible = false

func _on_basic_tower_gui_input(event):
	_on_tower_gui_input("basic", event)

func _on_fast_tower_gui_input(event):
	_on_tower_gui_input("fast", event)
	
func _on_strong_tower_gui_input(event):
	_on_tower_gui_input("strong", event)
	
func _on_long_tower_gui_input(event):
	_on_tower_gui_input("long", event)

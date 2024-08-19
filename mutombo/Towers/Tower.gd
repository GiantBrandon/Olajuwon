class_name Tower
extends Node2D

var tower_name: String
var tower_type: Global.TowerType

@export var color: Color16 = Color16.new(1,1,1):
	get:
		return color
	set(value):
		color = value
		get_node("Turret").modulate = color.to_color()
		get_node("Laser").default_color = color.to_color()
		Global.current_tower = self
# red - damage
# blue - speed
# green - range

func _on_reference_rect_gui_input(event):
	if event is InputEventMouseButton && event.button_mask == 1:
		get_node("Range").visible = true
		var panel = get_tree().get_root().get_node("Map/Panel")
		Global.current_tower = self

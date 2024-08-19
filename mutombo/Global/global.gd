extends Node

enum TowerType { BASIC, FAST, STRONG, LONG, SOLAR }

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
@export var current_money: Color = Color8(100, 100, 100):
	get:
		return current_money
	set(value):
		current_money = value
		on_change_money.emit(value)

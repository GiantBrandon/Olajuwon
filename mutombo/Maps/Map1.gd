extends Control


# Called when the node enters the scene tree for the first time.
func _ready():
	Global.current_tower = null
	Global.current_money = 10000
	Global.current_health = 100


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	pass

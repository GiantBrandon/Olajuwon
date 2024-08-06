extends Label

func _ready():
	Global.on_change_health.connect(_on_change)

func _on_change(health):
	text = str(health)

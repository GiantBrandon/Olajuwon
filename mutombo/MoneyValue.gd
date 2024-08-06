extends Label

func _ready():
	Global.on_change_money.connect(_on_change)

func _on_change(money):
	text = str(money)

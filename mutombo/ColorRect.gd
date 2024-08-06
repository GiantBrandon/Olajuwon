extends ColorRect


func _gui_input(event):
	if event is InputEventMouseButton && event.button_mask == 1:
		var tower = get_parent().get_parent().get_parent().tower
		tower.red = min(tower.red + .1, 1)

extends Node2D

var color: Color
# red - health
# blue - speed
# green - frequency
var _current_health: float
var stun_timer = 0
var dot_timer = 0
var dot_tick = .5

func init(color: Color):
	self.color = color
	_current_health = Global.get_red(color)
	get_node("Health/Label").text = "%3d/%3d" % [_current_health, Global.get_red(color)]
	get_node("Slime").modulate = color.inverted()
	
func stun(time):
	stun_timer = max(stun_timer, time)
	
func apply_dot(time):
	dot_timer = max(dot_timer, time)

func damage(amount):
	_current_health -= amount
	var health_percent = float(_current_health) / Global.get_red(color)
	get_node("Health").points[1].x = -32 + max(health_percent, 0) * 64
	get_node("Health/Label").text = "%3d/%3d" % [_current_health, Global.get_red(color)]

func _process(delta):
	var progress = get_parent()
	if _current_health <= 0:
		var map = get_tree().get_root().get_child(0)
		Global.current_money += (Global.get_red(color) + Global.get_green(color) + Global.get_blue(color) + 3) * 2
		progress.queue_free()
	elif progress.progress_ratio == 1:
		var map = get_tree().get_root().get_child(0)
		Global.current_health -= _current_health
		progress.queue_free()
	
	if dot_timer > 0:
		if dot_tick <= 0:
			damage(1)
			dot_tick = .5 - dot_tick
		else:
			dot_tick -= delta
		dot_timer -= delta
	
	if stun_timer > 0:
		stun_timer = max(stun_timer - delta, 0)
	else:
		progress.set_progress(progress.progress + Global.get_blue(color) * 50 * delta)

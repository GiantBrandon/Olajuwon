extends Node2D

var tower_name
@export var color: Color = Color8(15, 15, 15):
	get:
		return color
	set(value):
		color = value
		get_node("Turret").modulate = color
		get_node("Laser").default_color = color
		Global.current_tower = self
# red - damage
# blue - speed
# green - range

var targets = []
var cooldown = 0
var firing = false
var laserTimer = 0

func upgrade_red():
	if Global.get_red(color) < 255:
		color = color + Color8(16, 0, 0)

func upgrade_green():
	if Global.get_green(color) < 255:
		color = color + Color8(0, 16, 0)

func upgrade_blue():
	if Global.get_blue(color) < 255:
		color = color + Color8(0, 0, 16)

func _on_reference_rect_gui_input(event):
	if event is InputEventMouseButton && event.button_mask == 1:
		get_node("Range").visible = true
		var panel = get_tree().get_root().get_node("Map/Panel")
		Global.current_tower = self

func _ready():
	get_node("Turret").modulate = color
	get_node("Laser").default_color = color
	
func fire_laser(target, rotation):
	get_node("Laser").set_point_position(1, target)
	
func trigger_effect(target):
	if (Global.get_color_name(color) == "Red"):
		var enemies = get_tree().get_nodes_in_group("Enemy")
		for enemy in enemies:
			var distance = enemy.global_position.distance_to(target.global_position)
			if enemy != target && distance < color.r8 / 4:
				enemy.damage(calc_damage())
				
	elif (Global.get_color_name(color) == "Green"):
		target.stun(color.g8 / 80.0)
	elif (Global.get_color_name(color) == "Blue"):
		target.apply_dot(color.b8 / 80.0)

func reset_laser():
	get_node("Laser").set_point_position(1, Vector2(0, 0))

func _process(delta):
	cooldown = max(cooldown - delta, 0)
	laserTimer = max(laserTimer - delta, 0)
	var fire = !targets.is_empty() && cooldown == 0
	if !targets.is_empty() && laserTimer == 0:
		get_node("Turret").look_at(targets[0].global_position)
	if fire:
		var target = (targets[0].global_position - global_position)
		fire_laser(target, get_node("Turret").rotation)
		trigger_effect(targets[0])
		cooldown = calc_cooldown()
		laserTimer = .05
		firing = true
		targets[0].damage(calc_damage())
	elif laserTimer == 0 && firing:
		reset_laser()
		firing = false
		
func _on_body_entered(body):
	if body.is_in_group("Enemy"):
		targets.append(body)

func _on_body_exited(body):
	if body in targets:
		targets.remove_at(targets.find(body))
		
func calc_damage():
	assert(false)
	
func calc_cooldown():
	assert(false)

class_name AttackTower
extends Tower

var targets = []
var cooldown = 0
var firing = false
var laserTimer = 0

func can_upgrade_red() -> bool:
	return color.r < 16

func upgrade_red():
	color = color.plus(1, 0, 0)

func can_upgrade_green() -> bool:
	return color.g < 16

func upgrade_green():
	color = color.plus(0, 1, 0)

func can_upgrade_blue() -> bool:
	return color.g < 16

func upgrade_blue():
	color = color.plus(0, 0, 1)

func _ready():
	get_node("Turret").modulate = color.to_color()
	get_node("Laser").default_color = color.to_color()
	
func fire_laser(target, rotation):
	get_node("Laser").set_point_position(1, target)
	
func trigger_effect(target):
	if (color.to_name() == "Red"):
		var enemies = get_tree().get_nodes_in_group("Enemy")
		for enemy in enemies:
			var distance = enemy.global_position.distance_to(target.global_position)
			if enemy != target && distance < color.r / .25:
				enemy.damage(calc_damage())
	elif (color.to_name() == "Green"):
		target.stun(color.g / 5.0)
	elif (color.to_name() == "Blue"):
		target.apply_dot(color.b / 5.0)

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

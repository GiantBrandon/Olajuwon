extends Node

@onready var path = preload("res://Maps/Path1.tscn")
var waves = [
	[Color16.new(1, 1, 1), 10],
	[Color16.new(2, 2, 2), 5],
	[Color16.new(5, 1, 1), 5],
	[Color16.new(1, 5, 1), 5],
	[Color16.new(1, 1, 5), 5],
	[Color16.new(5, 5, 5), 2],
]
var started = false
var paused = false
var timer = 0

func _ready():
	timer = 2.0 / waves[0][0].g
	
func _process(delta):
	if !started:
		return
	timer -= delta
	if timer < 0:
		if (waves[0][1] == 0):
			timer += 20
			paused = true
			waves.pop_front()
			if (waves.size() == 0):
				get_parent().get_node("SidePanel/Column/Timer").text = "Done"
				started = false
		else:
			paused = false
			get_parent().get_node("SidePanel/Column/Timer").text = ""
			spawn()
			timer += 2.0 / waves[0][0].g
	else:
		if paused:
			get_parent().get_node("SidePanel/Column/Timer").text = "Time until next wave: %3.1f" % timer

func spawn():
	var temp_path = path.instantiate()
	temp_path.get_node("Mob").init(waves[0][0])
	get_parent().get_node("Path").add_child(temp_path)
	waves[0][1] -= 1

func call_next():
	if (started):
		paused = false
		timer = 0
	else:
		started = true
		spawn()
	

extends Timer

@onready var path = preload("res://Maps/Path1.tscn")
var waves = [
	[Color8(160, 160, 16), 10],
	[Color8(32, 16, 16), 20],
	[Color8(32, 16, 16), 10],
	[Color8(32, 32, 32), 10],
	[Color8(80, 16, 16), 10],
	[Color8(16, 16, 80), 10],
]
var between_waves = false
var started = false

func _ready():
	wait_time = .2 / waves[0][0].g
	
func _process(delta):
	if between_waves:
		get_parent().get_node("SidePanel/Column/Timer").text = "Time until next wave: %3.1f" % time_left
	else:
		get_parent().get_node("SidePanel/Column/Timer").text = ""

func spawn():
	var temp_path = path.instantiate()
	temp_path.get_node("Mob").init(waves[0][0])
	get_parent().get_node("Path").add_child(temp_path)
	waves[0][1] -= 1

func call_next():
	spawn()
	between_waves = false
	if (!started):
		start()
	else:
		wait_time = 0

func _on_timeout():
	wait_time = .2 / waves[0][0].g
	spawn()
	if waves[0][1] == 1:
		wait_time = 20
	elif waves[0][1] == 0:
		waves.pop_front()
		between_waves = true
	

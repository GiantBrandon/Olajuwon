package users

func GetUsers() []User {
	tmp := make([]User, 3)
	tmp[0] = User{ID: 1, Username: "brandonkurtz"}
	tmp[1] = User{ID: 2, Username: "maxfallan"}
	tmp[2] = User{ID: 3, Username: "xavierreid"}
	return tmp
}

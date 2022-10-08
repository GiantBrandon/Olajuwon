package login

import (
	"crypto/aes"
	"crypto/cipher"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io/ioutil"

	"github.com/gin-gonic/gin"
)

type User struct {
	Name string `json:"name"`
	Pass string `json:"pass"`
}

type LoginAttempt struct {
	Success bool `json:"success"`
}

var bytes = []byte{35, 46, 57, 24, 85, 35, 24, 74, 87, 35, 88, 98, 66, 32, 14, 05}

const MySecret string = "UwwsrrA19zeFFxk6xfHZOX569WkbQYWb"

func Encode(b []byte) string {
	return base64.StdEncoding.EncodeToString(b)
}

func Decode(s string) []byte {
	data, err := base64.StdEncoding.DecodeString(s)
	if err != nil {
		panic(err)
	}
	return data
}

func Encrypt(text string) (string, error) {
	block, err := aes.NewCipher([]byte(MySecret))
	if err != nil {
		return "", err
	}
	plainText := []byte(text)
	cfb := cipher.NewCFBEncrypter(block, bytes)
	cipherText := make([]byte, len(plainText))
	cfb.XORKeyStream(cipherText, plainText)
	return Encode(cipherText), nil
}

func Decrypt(text string) (string, error) {
	block, err := aes.NewCipher([]byte(MySecret))
	if err != nil {
		return "", err
	}
	cipherText := Decode(text)
	cfb := cipher.NewCFBDecrypter(block, bytes)
	plainText := make([]byte, len(cipherText))
	cfb.XORKeyStream(plainText, cipherText)
	return string(plainText), nil
}

func LoadData() []User {
	users := []User{}
	file, err := ioutil.ReadFile("users.json")
	if err != nil {
		fmt.Println(err.Error())
		return users
	}
	json.Unmarshal([]byte(file), &users)
	for index, user := range users {
		decryptedPass, _ := Decrypt(user.Pass)
		users[index] = User{Name: user.Name, Pass: string(decryptedPass)}
	}
	return users
}

func SaveData(users []User) {
	encryptedUsers := []User{}
	for _, user := range users {
		encryptedPass, _ := Encrypt(user.Pass)
		encryptedUsers = append(encryptedUsers, User{Name: user.Name, Pass: string(encryptedPass)})
	}
	fileData, _ := json.Marshal(encryptedUsers)
	ioutil.WriteFile("users.json", fileData, 0777)
}

var users = LoadData()

func Login(c *gin.Context) {
	var login User
	if err := c.BindJSON(&login); err != nil {
		fmt.Println(err)
	}

	for _, user := range users {
		if user.Name == login.Name && user.Pass == login.Pass {
			c.JSON(200, LoginAttempt{Success: true})
			return
		}
	}
	c.JSON(200, LoginAttempt{Success: false})
	return
}

func Create(c *gin.Context) {
	var user User
	if err := c.BindJSON(&user); err != nil {
		fmt.Println(err)
	}

	users = append(users, user)
	SaveData(users)
	c.JSON(200, LoginAttempt{Success: true})
	return
}

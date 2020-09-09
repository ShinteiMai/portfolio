package main

import (
	"api/database"
	"log"

	"github.com/gofiber/cors"
	"github.com/gofiber/fiber"
)

func Initialize() {
	app := fiber.New()
	config := cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "HEAD", "PATCH", "OPTIONS"},
		AllowCredentials: true,
	}

	app.Use(cors.New(config))
	app.Get("/", func(c *fiber.Ctx) {
		c.Send("Hello, World!")
	})

	err := app.Listen(5000)
	if err != nil {
		log.Fatal(err.Error())
	}
}

func main() {
	if err := database.Connect(); err != nil {
		log.Fatal(err)
	}
	Initialize()
}

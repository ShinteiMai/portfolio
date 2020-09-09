package routes

import (
	"api/models"
	"net/http"

	"github.com/gofiber/fiber"
)

func Register(c *fiber.Ctx) {
	admin := new(models.Admin)
	if err := c.BodyParser(&admin); err != nil {
		c.Send("Bad request " + err.Error())
		c.SendStatus(http.StatusBadRequest)
		return
	}

	// Validate
	err := admin.Validate()
	if err != nil {
		c.Send(err.Error())
		c.SendStatus(http.StatusBadRequest)
		return
	}

}

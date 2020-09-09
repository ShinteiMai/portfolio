package models

import (
	"github.com/go-ozzo/ozzo-validation/is"
	validation "github.com/go-ozzo/ozzo-validation/v4"
)

// Admin Model
type Admin struct {
	ID       string `bson:"id" json:"id,omitempty"`
	Username string `bson:"username" json:"username,omitempty"`
	Password string `bson:"password" json:"password,omitempty"`
	Email    string `bson:"email" json:"email,omitempty"`
}

// Validate -- Admin
func (admin *Admin) Validate() error {
	return validation.ValidateStruct(admin,
		validation.Field(&admin.Username, validation.Required),
		validation.Field(&admin.Password, validation.Required, validation.Length(8, 24)),
		validation.Field(&admin.Email, validation.Required, is.Email),
	)
}

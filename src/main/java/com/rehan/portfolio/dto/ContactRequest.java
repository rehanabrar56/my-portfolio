package com.rehan.portfolio.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ContactRequest {

    @NotBlank(message = "Name is required")
    @Size(max = 150, message = "Name must be 150 characters or less")
    private String name;

    @NotBlank(message = "Email address is required")
    @Email(message = "Please provide a valid email address")
    @Size(max = 255, message = "Email address must be 255 characters or less")
    private String email;

    @NotBlank(message = "Message is required")
    @Size(max = 1000000, message = "Message is too long")
    private String message;

    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getMessage() { return message; }
    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
    public void setMessage(String message) { this.message = message; }
}

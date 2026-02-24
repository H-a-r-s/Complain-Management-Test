package com.harsh.complaint_service.dto;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@Data
public class CreateComplaintRequest {
    @NotBlank(message = "name is required")
    @Size(min = 2, max = 50)
    private String name;

    @NotBlank(message = "email is required")
    @Email(message = "email must be valid")
    private String email;

    @NotBlank(message = "phone is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "phone must be 10 digits")
    private String phone;

    @NotBlank(message = "category is required")
    private String category;

    @NotBlank(message = "description is required")
    @Size(min = 10, max = 500)
    private String description;
}

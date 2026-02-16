package com.harsh.complaint_service.dto;
import lombok.*;

@Getter
@Setter
@Data
public class CreateComplaintRequest {
    private String name;
    private String email;
    private String phone;
    private String category;
    private String description;
}

package com.harsh.complaint_service.dto;
import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class CreateComplaintResponse {
    private String ticketNo;
    private String status;
    private LocalDateTime createdAt;
}

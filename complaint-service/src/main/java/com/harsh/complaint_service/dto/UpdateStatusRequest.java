package com.harsh.complaint_service.dto;
import lombok.*;

@Getter
@Setter
public class UpdateStatusRequest {
    private String status;
    private String remark;
}

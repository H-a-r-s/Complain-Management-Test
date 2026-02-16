package com.harsh.complaint_service.dto;
import com.harsh.complaint_service.entity.Complaint;
import com.harsh.complaint_service.entity.ComplaintUpdate;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter @Setter @AllArgsConstructor
public class ComplaintTrackResponse {
    private String ticketNo;
    private String category;
    private String description;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<TimelineItem> timeline;

    @Getter @Setter @AllArgsConstructor
    public static class TimelineItem {
        private String fromStatus;
        private String toStatus;
        private String remark;
        private LocalDateTime createdAt;
    }

    public static ComplaintTrackResponse from(Complaint c, List<ComplaintUpdate> updates) {
        List<TimelineItem> t = updates.stream()
                .map(u -> new TimelineItem(
                        u.getFromStatus() == null ? null : u.getFromStatus().name(),
                        u.getToStatus() == null ? null : u.getToStatus().name(),
                        u.getRemark(),
                        u.getCreatedAt()
                ))
                .collect(Collectors.toList());

        return new ComplaintTrackResponse(
                c.getTicketNo(),
                c.getCategory(),
                c.getDescription(),
                c.getStatus().name(),
                c.getCreatedAt(),
                c.getUpdatedAt(),
                t
        );
    }
}

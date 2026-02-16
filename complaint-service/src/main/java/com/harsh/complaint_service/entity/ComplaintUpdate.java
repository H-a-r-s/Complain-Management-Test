package com.harsh.complaint_service.entity;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "complaint_updates")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ComplaintUpdate {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Complaint complaint;

    private Long changedBy;

    @Enumerated(EnumType.STRING)
    private ComplaintStatus fromStatus;

    @Enumerated(EnumType.STRING)
    private ComplaintStatus toStatus;

    @Column(columnDefinition = "TEXT")
    private String remark;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    void onCreate() {
        createdAt = LocalDateTime.now();
    }
}

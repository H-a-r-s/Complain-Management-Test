package com.harsh.complaint_service.service;
import com.harsh.complaint_service.dto.ComplaintTrackResponse;
import com.harsh.complaint_service.dto.CreateComplaintRequest;
import com.harsh.complaint_service.dto.CreateComplaintResponse;
import com.harsh.complaint_service.dto.UpdateStatusRequest;
import com.harsh.complaint_service.entity.Complaint;
import com.harsh.complaint_service.entity.ComplaintStatus;
import com.harsh.complaint_service.entity.ComplaintUpdate;
import com.harsh.complaint_service.exception.NotFoundException;
import com.harsh.complaint_service.repository.ComplaintRepository;
import com.harsh.complaint_service.repository.ComplaintUpdateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ComplaintService {

    private final ComplaintRepository complaintRepo;
    private final ComplaintUpdateRepository updateRepo;

    @Transactional
    public CreateComplaintResponse create(CreateComplaintRequest req) {
        Complaint c = Complaint.builder()
                .name(req.getName())
                .email(req.getEmail())
                .phone(req.getPhone())
                .category(req.getCategory())
                .description(req.getDescription())
                .status(ComplaintStatus.NEW)
                .ticketNo("PENDING")
                .build();

        c = complaintRepo.save(c);

        String year = String.valueOf(LocalDate.now().getYear());
        String ticket = "CMP-" + year + "-" + String.format("%06d", c.getId());
        c.setTicketNo(ticket);

        c = complaintRepo.save(c);

        return new CreateComplaintResponse(c.getTicketNo(), c.getStatus().name(), c.getCreatedAt());
    }

    public ComplaintTrackResponse track(String ticketNo) {
        Complaint c = complaintRepo.findByTicketNo(ticketNo)
                .orElseThrow(() -> new NotFoundException("Ticket not found"));

        List<ComplaintUpdate> updates = updateRepo.findByComplaintIdOrderByCreatedAtAsc(c.getId());
        return ComplaintTrackResponse.from(c, updates);
    }

    public Page<Complaint> adminList(String status, String q, Pageable pageable) {
        if (status != null && !status.isBlank()) {
            return complaintRepo.findByStatus(ComplaintStatus.valueOf(status), pageable);
        }
        return complaintRepo.findAll(pageable);
    }

    @Transactional
    public void adminUpdateStatus(Long complaintId, UpdateStatusRequest req, Long adminIdNullable) {
        Complaint c = complaintRepo.findById(complaintId)
                .orElseThrow(() -> new NotFoundException("Complaint not found: " + complaintId));

        ComplaintStatus from = c.getStatus();
        ComplaintStatus to = ComplaintStatus.valueOf(req.getStatus());

        c.setStatus(to);
        complaintRepo.save(c);

        updateRepo.save(ComplaintUpdate.builder()
                .complaint(c)
                .changedBy(adminIdNullable)
                .fromStatus(from)
                .toStatus(to)
                .remark(req.getRemark())
                .build());
    }
}

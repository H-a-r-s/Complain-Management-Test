package com.harsh.complaint_service.controller;
import com.harsh.complaint_service.dto.ComplaintTrackResponse;
import com.harsh.complaint_service.dto.CreateComplaintRequest;
import com.harsh.complaint_service.dto.CreateComplaintResponse;
import com.harsh.complaint_service.dto.UpdateStatusRequest;
import com.harsh.complaint_service.entity.Complaint;
import com.harsh.complaint_service.service.ComplaintService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class ComplaintController {

    private final ComplaintService service;

    @PostMapping("/complaints")
    public CreateComplaintResponse create(@RequestBody CreateComplaintRequest req) {
        return service.create(req);
    }

    @GetMapping("/complaints/track/{ticketNo}")
    public ComplaintTrackResponse track(@PathVariable String ticketNo) {
        return service.track(ticketNo);
    }

    // Admin (no security yet; later add JWT role checks)
    @GetMapping("/admin/complaints")
    public Page<Complaint> adminList(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String q,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return service.adminList(status, q, PageRequest.of(page, size, Sort.by("createdAt").descending()));
    }

    @PatchMapping("/admin/complaints/{id}/status")
    public void adminUpdateStatus(@PathVariable Long id, @RequestBody UpdateStatusRequest req) {
        service.adminUpdateStatus(id, req, null);
    }
}

package com.harsh.complaint_service.repository;
import com.harsh.complaint_service.entity.Complaint;
import com.harsh.complaint_service.entity.ComplaintStatus;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.*;
import java.util.Optional;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    Optional<Complaint> findByTicketNo(String ticketNo);
    Page<Complaint> findByStatus(ComplaintStatus status, Pageable pageable);
}


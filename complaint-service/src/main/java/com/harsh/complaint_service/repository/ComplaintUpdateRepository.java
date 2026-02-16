package com.harsh.complaint_service.repository;

import com.harsh.complaint_service.entity.ComplaintUpdate;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ComplaintUpdateRepository extends JpaRepository<ComplaintUpdate, Long> {
    List<ComplaintUpdate> findByComplaintIdOrderByCreatedAtAsc(Long complaintId);
}

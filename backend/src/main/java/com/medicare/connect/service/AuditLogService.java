package com.medicare.connect.service;

import com.medicare.connect.model.AuditLog;
import com.medicare.connect.model.User;
import com.medicare.connect.repository.AuditLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuditLogService {

    @Autowired
    private AuditLogRepository auditLogRepository;

    public void log(User user, String action, String details, String ipAddress) {
        AuditLog log = new AuditLog();
        log.setUser(user);
        log.setAction(action);
        log.setDetails(details);
        log.setIpAddress(ipAddress);
        auditLogRepository.save(log);
    }
}

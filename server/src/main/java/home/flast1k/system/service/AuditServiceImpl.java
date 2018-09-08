package home.flast1k.system.service;

import home.flast1k.system.model.Audit;
import home.flast1k.system.repository.AuditRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuditServiceImpl implements AuditService {
    @Autowired
    private AuditRepository auditRepository;

    public Audit save(Audit audit) {
        return auditRepository.save(audit);
    }
}

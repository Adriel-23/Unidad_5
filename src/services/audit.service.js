import auditLogRepository from "../repositories/auditLog.repository.js";

async function logAction(req, {action, entity, entity_id, details, severity, success}){
    await auditLogRepository.create(
        req.audit.request_id,
        req.audit.user_id,
        req.audit.user_agent,
        req.audit.method,
        req.audit.endpoint,
        action,
        entity,
        entity_id,
        details,
        severity,
        success
    )
}

export default logAction
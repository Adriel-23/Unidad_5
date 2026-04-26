import AuditLog from "../models/auditLog.model.js";
import LOG_SEVERITY from "../constants/logsSeverity.constanst.js";

class AuditLogRepository {
    async create(
        request_id,
        user_id,
        user_agent,
        method,
        endpoint,
        action,
        entity,
        entity_id,
        details = {},
        severity = LOG_SEVERITY.INFO,
        success = true
    ){
        try{
            await AuditLog.create({
                request_id,
                user_id,
                user_agent,
                method,
                endpoint,
                action,
                entity,
                entity_id,
                details,
                severity,
                success
            })
        }
        catch(error){
            console.error('Error al crear el log de auditoría:', error)
        }
    }
}

const auditLogRepository = new AuditLogRepository()

export default auditLogRepository
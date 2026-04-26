import crypto from 'crypto'
import logAction from '../services/audit.service.js';

function auditContextMiddleware(req, res, next) {
    if(req.path.startsWith('/api/auth/login') || req.path.startsWith('/api/auth/register')){
        return next()
    } 
    const request_id = crypto.randomUUID()

    res.on('finish', () => {
        req.audit = {
            request_id: request_id,
            user_agent: req.headers['user-agent'],
            method: req.method,
            endpoint: req.originalUrl,
            user_id: req?.user?.id || null
        };

        const LOG_SEVERITY = res.statusCode >= 500 ? 'CRITICAL' : res.statusCode >= 400 ? 'ERROR' : 'INFO';
        const success = res.statusCode < 400;
        const details = {
            statusCode: res.statusCode,
            responseTime: res.getHeader('X-Response-Time') || null
        }
        const entity = req.originalUrl.split('/')[2] || 'GLOBAL'
        const action = `${req.method}_${entity.toUpperCase()}`

        try{
            logAction(
                req,
                {
                    action: action,
                    entity: entity,
                    entity_id: null,
                    details: details,
                    severity: LOG_SEVERITY,
                    success: success
                }
            )
        }
        catch(error){
            console.log("Error al registrar auditoria", error);
        }
    });
    next()
}

export default auditContextMiddleware
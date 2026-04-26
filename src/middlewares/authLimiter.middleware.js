import rateLimit from "express-rate-limit"

const authLimiterMiddleware = rateLimit(
    {
        windowMs: 24 * 60 * 60 * 1000,
        max: 10,
        keyGenerator: (request) => {   
            return request.body.email
        },
        handler: (request, response) => {
            response.status(429).json({
                ok: false,
                status: 429,
                message: "Demasiados intentos de inicio de sesión fallidos. Por favor, inténtalo de nuevo en 24 horas."
            })
        }
    }
)

export default authLimiterMiddleware;
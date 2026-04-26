import rateLimit from 'express-rate-limit'

const limiterMiddleware = rateLimit(
    {
        windowMs: 1 * 60 * 1000, // Tiempo de lapso a evaluar
        max: 25, // Cantidad máxima de consultas permitidas en ese lapso
        keyGenerator: (request) => {   
            const user_id = request.user.user_id
            return user_id
        }

    }
)

export default limiterMiddleware
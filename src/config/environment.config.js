import dotenv from 'dotenv'

dotenv.config()

const ENVIRONMENT = {
    MONGO_DB_NAME: process.env.MONGO_DB_NAME,
    MONGO_DB_URI: process.env.MONGO_DB_URI,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
<<<<<<< HEAD
    PORT: process.env.PORT,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
    MAIL_USERNAME: process.env.MAIL_USERNAME,
    URL_BACKEND: process.env.URL_BACKEND
=======
    PORT: process.env.PORT
>>>>>>> c156026d6a506c86f0421a7c0ce85d230a59b69f
}

export default ENVIRONMENT
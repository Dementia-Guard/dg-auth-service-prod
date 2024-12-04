import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import corsOption from "./Config/Cors/CorsConfig.js";
import response from "./Utils/ResponseHandler/ResponseHandler.js";
import ResTypes from "./Utils/Constants/ResTypes.js";
import AuthRoute from "./Routes/Auth/AuthRoutes.js"
import { connectDB } from "./Config/Connections/DbCon.js";

dotenv.config()
const app = express()
const PORT = process.env.AUTH_SERVER_PORT || 8457

app.use(cors(corsOption))
app.use(express.json())

// establish firestore connection
connectDB()

app.get('/', (req, res) => {
    return response(res, 200, ResTypes.successMessages.server_online)
})

//routes init
app.use('/service', AuthRoute)

app.use((req, res) => {
    return response(res, 404, { message: "Endpoint not found" })
})

// call listen in a production environment
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 8457;
    app.listen(PORT, () => {
        console.log(`Auth Server is listening on ${PORT}`);
    });
}

// Export the app instance, for testing
export default app;
import response from "../../Utils/ResponseHandler/ResponseHandler.js";
import ResTypes from "../../Utils/Constants/ResTypes.js";
import AuthRepo from "../../Repository/AuthRepo.js";

class AuthController {
    // Test API
    test = async (req, res) => {
        return response(res, 200, ResTypes.successMessages.server_online);
    }

    async signUp(req, res) {
        const { email, password, name, role, telephone } = req.body;
        try {
            const additionalData = { name, role, telephone, isVerified: false };
            const userRecord = await AuthRepo.signUpUser(email, password, additionalData);
            return response(res, 201, { message: 'User signed up successfully', uid: userRecord.uid });
        } catch (error) {
            console.error(error)
            return response(res, 500, { message: error.message });
        }
    }

    async login(req, res) {
        const { email, password } = req.body;
        try {
            // Use Firebase Client SDK on the frontend for login, here we just simulate
            return response(res, 200, { message: 'Login initiated on client side' });
        } catch (error) {
            return response(res, 500, { message: error.message });
        }
    }

    async validateToken(req, res) {
        const { idToken } = req.body; // Extract token from the Authorization header

        try {
            const decodedToken = await AuthRepo.verifyToken(idToken); // Call repository method to validate the token
            return response(res, 200, { message: 'Token is valid', decodedToken });
        } catch (error) {
            return response(res, 401, { message: error.message });
        }
    }

    async getUser(req, res) {
        const { uid } = req.params;
        if (!uid)
            return response(res, 404, { message: "User Id Not Found" })
        try {
            const userRecord = await AuthRepo.getUser(uid);
            return response(res, 200, { user: userRecord ,message:"successfully fetched"});
        } catch (error) {
            return response(res, 500, { message: error.message });
        }
    }

    async deleteUser(req, res) {
        const { uid } = req.params;
        if (!uid)
            return response(res, 404, { message: "User Id Not Found" })
        try {
            const result = await AuthRepo.deleteUser(uid);
            return response(res, 200, result);
        } catch (error) {
            return response(res, 500, { message: error.message });
        }
    }

    async sendPasswordReset(req, res) {
        const { email } = req.body;
        try {
            const result = await AuthRepo.sendPasswordReset(email);
            return response(res, 200, result);
        } catch (error) {
            return response(res, 500, { message: error.message });
        }
    }

    async verifyEmail(req, res) {
        const { uid } = req.params;
        if (!uid)
            return response(res, 404, { message: "User Id Not Found" })
        try {
            const result = await AuthRepo.verifyEmail(uid);
            return response(res, 200, result);
        } catch (error) {
            return response(res, 500, { message: error.message });
        }
    }
}

export default new AuthController()
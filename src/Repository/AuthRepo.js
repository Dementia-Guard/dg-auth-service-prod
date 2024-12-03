import { getAuth } from 'firebase-admin/auth';
import { connectDB} from '../Config/Connections/DbCon.js';

class AuthRepo {
    constructor() {
        this.db = connectDB();
        this.auth = getAuth();
    }

    async signUpUser(email, password, additionalData) {
        try {
            const userRecord = await this.auth.createUser({ email, password });
            await this.db.collection('users').doc(userRecord.uid).set(additionalData);
            return userRecord;
        } catch (error) {
            throw new Error('Failed to sign up user: ' + error.message);
        }
    }

    async loginUser(email, password) {
        // Firebase Admin SDK doesn't support client-side login; consider using Firebase Client SDK for login.
        throw new Error('Use Firebase Client SDK for login on the client side.');
    }

    async verifyToken(token) {
        try {
            const decodedToken = await this.auth.verifyIdToken(token);
            return decodedToken; // Return decoded token information
        } catch (error) {
            throw new Error('Invalid token: ' + error.message);
        }
    }

    async getUser(uid) {
        try {
            const userRecord = await this.auth.getUser(uid);
            return userRecord;
        } catch (error) {
            throw new Error('Failed to get user: ' + error.message);
        }
    }

    async deleteUser(uid) {
        try {
            await this.auth.deleteUser(uid);
            await this.db.collection('users').doc(uid).delete();
            return { message: 'User deleted successfully' };
        } catch (error) {
            throw new Error('Failed to delete user: ' + error.message);
        }
    }

    async sendPasswordReset(email) {
        try {
            await this.auth.generatePasswordResetLink(email);
            return { message: 'Password reset email sent' };
        } catch (error) {
            throw new Error('Failed to send password reset email: ' + error.message);
        }
    }

    async verifyEmail(uid) {
        try {
            const userRecord = await this.auth.updateUser(uid, { emailVerified: true });
            await this.db.collection('users').doc(userRecord.uid).update({
                isVerified: true,
            });

            return { message: 'Email verified successfully' };
        } catch (error) {
            throw new Error('Failed to verify email: ' + error.message);
        }
    }
}

export default new AuthRepo();

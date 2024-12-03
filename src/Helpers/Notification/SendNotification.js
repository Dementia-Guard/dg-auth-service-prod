import axios from 'axios';

export const SendNotification = async (userId, token, email, telephone, type) => {
    try {
        const response = await axios.post('http://your-notification-service-url.com/notify', {
            userId,
            token,
            email,
            telephone,
            type
        });
        return response.data;
    } catch (error) {
        console.error("Notification error:", error);
        return { status: 'error' };
    }
};
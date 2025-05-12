export const refreshAccessToken = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/superAdmin/refresh-token`, {
            method: 'POST',
            credentials: 'include', // Include cookies for refresh token
        });

        if (!response.ok) {
            throw new Error('Failed to refresh token');
        }

        const data = await response.json();
        localStorage.setItem('accessToken', data.data.accessToken);
        return data.data.accessToken;
    } catch (error) {
        console.error('Token refresh failed:', error);
        throw error; // Let the caller handle the error
    }
};
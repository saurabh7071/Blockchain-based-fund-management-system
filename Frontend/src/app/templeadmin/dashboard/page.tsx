'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SuperAdminDashboard() {
    const router = useRouter();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
            router.push('/superadmin/login');
        } else {
            // Optionally, validate the token with the backend
            fetch('/api/v1/superadmin/me', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Unauthorized');
                    }
                })
                .catch(() => {
                    router.push('/superadmin/login');
                });
        }
    }, [router]);

    const handleLogout = async () => {
        try {
            await fetch('/api/v1/superadmin/logout', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            // Clear tokens from localStorage
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');

            // Redirect to login page
            router.push('/superadmin/login');
        } catch (err) {
            console.error('Error during logout:', err);
        }
    };

    return (
        <div>
            <h1>Welcome SuperAdmin</h1>
            {/* SuperAdmin Content */}
        </div>
    );
}

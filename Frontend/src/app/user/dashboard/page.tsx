'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SuperAdminDashboard() {
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('token') // Replace with cookie logic in real setup
        const user = token ? JSON.parse(atob(token.split('.')[1])) : null

        if (!user || user.role !== 'superadmin') {
            router.push('/superadmin/login')
        }
    }, [])

    return (
        <div>
            <h1>Welcome user</h1>
            {/* SuperAdmin Content */}
        </div>
    )
}

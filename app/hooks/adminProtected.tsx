"use client";
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

interface ProtectedProps {
    children: React.ReactNode;
}

export default function AdminProtected({ children }: ProtectedProps) {
    const router = useRouter()
    const { user } = useSelector((state: any) => state.auth)

    useEffect(() => {
        if (user) {

            const isAdmin = user?.role === "admin" || "teacher"
            if (!isAdmin) {
                router.push("/")
            }
        }
    }, [user, router])

    if (!user || !(user?.role === "admin" || user?.role === "teacher")) {
        return null; 
    }

    return <>{children}</>
}

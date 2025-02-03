import {redirect} from 'next/navigation'
import userAuth from "./userAuth"
import toast from 'react-hot-toast';

interface ProtectedProps{
    children :React.ReactNode;
}
export default function Protected({children}:ProtectedProps){
    // toast.error("Login First")
    const isAuthenticated  = userAuth();
    return isAuthenticated ? children : redirect("/")
}
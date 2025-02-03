import { useSelector } from "react-redux";

export default function useUserAuth(): boolean {
    // Accessing user state from Redux
    const { user } = useSelector((state: any) => state.auth);

    // Check if user exists and return the appropriate boolean value
    return Boolean(user);
}

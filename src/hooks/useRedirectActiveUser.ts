import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useRedirectActiveUser = (user: unknown, path: string): void => {
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate(path);
        }
    }, [navigate, path, user]);
};

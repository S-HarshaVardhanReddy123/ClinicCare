import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("cliniccare_token");

        if (!token) {
            setLoading(false);
            return;
        }

        const loadUser = async () => {
            try {
                const response = await api.get("/auth/me");

                if (response.data.success && response.data.user) {
                    setUser(response.data.user);

                    // Keep the local copy synchronized with
                    // the authenticated user returned by the backend.
                    localStorage.setItem(
                        "cliniccare_user",
                        JSON.stringify(response.data.user)
                    );
                } else {
                    localStorage.removeItem("cliniccare_token");
                    localStorage.removeItem("cliniccare_user");
                    setUser(null);
                }
            } catch (error) {
                console.error(
                    "Failed to load authenticated user:",
                    error
                );

                localStorage.removeItem("cliniccare_token");
                localStorage.removeItem("cliniccare_user");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    const login = async (email, password) => {
        const response = await api.post("/auth/login", {
            email: email.trim(),
            password,
        });

        if (response.data.success) {
            const { token, user } = response.data;

            // Remove any previous session first.
            localStorage.removeItem("cliniccare_token");
            localStorage.removeItem("cliniccare_user");

            // Store the new authenticated session.
            localStorage.setItem(
                "cliniccare_token",
                token
            );

            localStorage.setItem(
                "cliniccare_user",
                JSON.stringify(user)
            );

            // IMPORTANT:
            // This updates the actual React authentication state.
            setUser(user);
        }

        return response.data;
    };

    const register = async (userData) => {
        const response = await api.post(
            "/auth/register",
            userData
        );

        return response.data;
    };

    const logout = () => {
        localStorage.removeItem("cliniccare_token");
        localStorage.removeItem("cliniccare_user");

        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
                isAuthenticated: Boolean(user),
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside an AuthProvider"
        );
    }

    return context;
};
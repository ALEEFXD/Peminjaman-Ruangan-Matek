import { createContext, useContext, useState } from "react";
import supabase from "../api/supabase-client";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loginStudent = async (nim, password) => {
        if (!supabase) {
            setError("Konfigurasi server belum lengkap (Missing Supabase URL/Key).");
            return false;
        }

        setLoading(true);
        setError(null);
        try {
            const { data: userData, error: dbError } = await supabase
                .from('users')
                .select('*')
                .eq('nim', nim)
                .single();
            
            if (dbError || !userData) {
                throw new Error('NIM tidak ditemukan.');
            }

            const firstName = userData.nama.split(' ')[0];
            const expectedPassword = `${firstName}${userData.nim}`;

            if (password !== expectedPassword) {
                throw new Error('Password salah. (Format: NamaDepan + NIM)');
            }

            setUser({ ...userData, role: 'student' });
            console.log("Login successful for student:", userData);
            return true;
            
        } catch (err) {
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const loginAdmin = async (username, password) => {
        if (!supabase) {
            setError("Konfigurasi server belum lengkap (Missing Supabase URL/Key).");
            return false;
        }

        setLoading(true);
        setError(null);
        try {
             const { data: adminData, error: dbError } = await supabase
                .from('admins')
                .select('*')
                .eq('username', username)
                .single();

            if (dbError || !adminData) {
                 throw new Error('Admin tidak ditemukan.');
            }

            if (password !== adminData.password) {
                throw new Error('Password admin salah.');
            }

            setUser({ ...adminData, role: 'admin' });
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, loginStudent, loginAdmin, logout, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
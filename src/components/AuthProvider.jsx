import { createContext, useContext, useState, useEffect } from "react";
import supabase from "../api/supabase-client";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!supabase) {
            setLoading(false);
            return;
        }

        const setData = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (!error && session) {
                setUser({ ...session.user, role: 'student' });
            }
            setLoading(false);
        };

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session ? { ...session.user, role: 'student' } : null);
            setLoading(false);
        });

        setData();

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

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
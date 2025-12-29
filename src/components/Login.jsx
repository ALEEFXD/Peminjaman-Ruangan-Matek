import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { User, Lock, BookOpen, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function Login() {
    const { loginStudent, loginAdmin, loading, error, user } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('student');
    const [formData, setFormData] = useState({ identifier: '', password: '' });

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (activeTab === 'student') {
            console.log("Logging in student:", formData.identifier);
            await loginStudent(formData.identifier, formData.password);
        } else {
            console.log("Logging in admin:", formData.identifier);
            await loginAdmin(formData.identifier, formData.password);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-1 flex items-center justify-center p-4 font-sans text-main">
            <div className="max-w-md w-full flex flex-col gap-8">
                <div className="text-center flex flex-col items-center gap-4">
                    <div className="bg-orange-2 w-16 h-16 rounded-[20px] flex items-center justify-center shadow-lg">
                        <BookOpen className="text-fixed-white w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-main">Sistem Peminjaman</h1>
                        <p className="text-grey-0 mt-2">Masuk untuk mengakses layanan</p>
                    </div>
                </div>

                <Card className="overflow-hidden border-grey-0 shadow-sm bg-neutral-0">
                    <div className="flex border-b border-grey-0">
                        <button
                            onClick={() => { setActiveTab('student'); setFormData({ identifier: '', password: '' }); }}
                            className={cn(
                                "flex-1 py-4 text-sm font-medium text-center transition-colors outline-none",
                                activeTab === 'student' 
                                    ? "bg-neutral-0 text-orange-2 border-b-2 border-orange-2" 
                                    : "bg-neutral-1 text-grey-0 hover:text-main"
                            )}
                        >
                            Mahasiswa
                        </button>
                        <button
                            onClick={() => { setActiveTab('admin'); setFormData({ identifier: '', password: '' }); }}
                            className={cn(
                                "flex-1 py-4 text-sm font-medium text-center transition-colors outline-none",
                                activeTab === 'admin' 
                                    ? "bg-neutral-0 text-orange-2 border-b-2 border-orange-2" 
                                    : "bg-neutral-1 text-grey-0 hover:text-main"
                            )}
                        >
                            Admin
                        </button>
                    </div>

                    <CardContent className="p-6 pt-6">
                        {error && (
                            <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md mb-6 text-sm flex items-center gap-2">
                                <AlertCircle size={16} />
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="identifier">
                                    {activeTab === 'student' ? 'NIM' : 'Username'}
                                </Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-2.5 h-4 w-4 text-grey-0" />
                                    <Input
                                        id="identifier"
                                        type="text"
                                        required
                                        placeholder={activeTab === 'student' ? 'Contoh: 1314102938' : 'admin'}
                                        className="pl-10"
                                        value={formData.identifier}
                                        onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-grey-0" />
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        placeholder={activeTab === 'student' ? 'NamaDepan + NIM' : '••••••••'}
                                        className="pl-10"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </div>
                                {activeTab === 'student' && (
                                    <p className="text-xs text-grey-0">
                                        Default: Nama Depan + NIM (Contoh: Aditya1314102938)
                                    </p>
                                )}
                            </div>

                            <Button type="submit" variant="secondary" className="w-full" disabled={loading}>
                                {loading ? 'Memproses...' : (activeTab === 'student' ? 'Masuk sebagai Mahasiswa' : 'Masuk sebagai Admin')}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
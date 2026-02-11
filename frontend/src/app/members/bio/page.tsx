"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import "../../../components/forms/forms.css";
import { UserDto, UserRole, UserStatus } from "@shared/dto/user.dto";
import { useRouter } from "next/navigation";

export default function BioPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string| null>(null);

    // Separate form fields as strings to avoid assigning plain strings to setUser
    const [name, setName] = useState<string>("");
    const [empresa, setEmpresa] = useState<string>("");
    const [CNPJ, setCNPJ] = useState<string>("");

    const router = useRouter();

    const api = {
        fetchPending: async (): Promise<UserDto> => {
            return {
                id: "2",
                name: "Bruno Costa",
                email: "bruno@example.com",
                createdAt: new Date(),
                reason: "Recomendado por equipe Y",
                enterprise: "Google",
                role: UserRole.ADMIN
            }

        }
    };

    useEffect(() => {
        api
            .fetchPending()
            .then((data) => {
                // populate form fields from fetched user if needed
                setName(data.name ?? "");
                setEmpresa((data as any).enterprise ?? "");
                
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    const handleRegister = (e: any) => {
        e.preventDefault();
        const payload: Partial<UserDto> = {
            name,
            enterprise: empresa,
            role: UserRole.MEMBRO,
            status: UserStatus.PENDENTE,
            active: false
        };

        
        
        router.push("/");

         };

    return (
        <div className="form-wrapper">
            <div className="form-card">
                <h1 className="form-title">Informações Pessoais</h1>
                <form onSubmit={handleRegister} className="conteiner-form">
                    <input
                        type="text"
                        placeholder="Nome Completo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-input"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Qual sua Empresa?"
                        value={empresa}
                        onChange={(e) => setEmpresa(e.target.value)}
                        className="form-input"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Qual CNPJ da empresa"
                        value={CNPJ}
                        onChange={(e) => setCNPJ(e.target.value)}
                        className="form-input"
                        required
                    />
                    <div className="conteiner-buttons">
                        <Link href="/" className="form-button">Voltar</Link>
                        <button type="submit" className="form-button">
                            Enviar
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}
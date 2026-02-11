"use client";
import { useState } from "react";
import Link from "next/link";
import "../../components/forms/forms.css";
import { UserDto, UserRole, UserStatus } from "@shared/dto/user.dto";
import {useRouter} from "next/navigation";

export default function RegisterPage() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [motivo, setMotivo] = useState("");
    const [empresa, setEmpresa] = useState("");

    const router = useRouter();

    const handleRegister = (e: any) => {
        e.preventDefault();
        const user: UserDto = {
            name: nome,
            enterprise: empresa,
            reason: motivo,
            email: email,
            password: password,
            role: UserRole.MEMBRO,
            status: UserStatus.PENDENTE,
            active: false
        };

        setNome("");
        setEmpresa("");
        setMotivo("");
        setEmail("");
        setPassword("");

        

        router.push("/");

        // Exemplo de envio (opcional)
        // await fetch('/api/register', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(payload),
        // });

        


    };

    return (
        <div className="form-wrapper">
            <div className="form-card">
                <h1 className="form-title">Inscrição</h1>
                <form onSubmit={handleRegister} className="conteiner-form">
                    <input
                        type="text"
                        placeholder="Nome Completo"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
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
                        placeholder="Por que você quer participar?"
                        value={motivo}
                        onChange={(e) => setMotivo(e.target.value)}
                        className="form-input"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Qual seu Email?"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-input"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Crie sua senha senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
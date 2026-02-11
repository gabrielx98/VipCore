"use client";
import { useState } from "react";
import Link from "next/link";
import "../components/forms/forms.css";
import {useRouter} from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: any) => {
    e.preventDefault();
    // TODO: Implement login
    document.cookie = `auth_token=${"01"}; path=/;`;
    router.push("/members");
   };

  return (
    <div className="form-wrapper">
      <div className="form-card">
        <h1 className="form-title">Login</h1>
        <form onSubmit={handleLogin} className="conteiner-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            required
          />
          <button type="submit" className="form-button">
            Entrar
          </button>
        </form>
        <p className="form-register-text">
          Não tem login? <Link href="/register">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}
"use client";
import React, { useEffect, useState } from "react";
import { UserDto,UserStatus } from "@shared/dto/user.dto";

const api = {
    fetchPending: async (): Promise<UserDto[]> => {
        return [
                {
                    id: "1",
                    name: "Ana Silva",
                    email: "ana@example.com",
                    createdAt: new Date(),
                    reason: "Solicitação para participar do projeto X",
                    enterprise: "Google"
                },
                {
                    id: "2",
                    name: "Bruno Costa",
                    email: "bruno@example.com",
                    createdAt: new Date(),
                    reason: "Recomendado por equipe Y",
                    enterprise: "Google"
                },
            ];
        }
};

export default function Page() {
    const [users, setUsers] = useState<UserDto[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState<UserDto | null>(null);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        setLoading(true);
        api
            .fetchPending()
            .then((data) => setUsers(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    const openEvaluator = (u: UserDto) => {
        setSelected(u);
        setError(null);
    };

    const closeEvaluator = () => {
        setSelected(null);
        setError(null);
    };

    const submit = async (response: UserStatus) => {
        if (!selected) return;
        setSaving(true);
        setError(null);
        
    };

    return (
        <div style={{ padding: 20, fontFamily: "Inter, Roboto, sans-serif" }}>
            <h1 style={{ marginBottom: 8 }}>Aprovações pendentes</h1>
            <p style={{ marginTop: 0, marginBottom: 10, color: "#ffffffff" }}>
                Revise solicitações e realize a avaliação.
            </p>

            {loading && <div>Carregando...</div>}
            {error && <div style={{ color: "crimson", marginBottom: 8 }}>{error}</div>}

            {!loading && users?.length === 0 && <div>Nenhuma aprovação pendente.</div>}

            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {users?.map((u) => (
                    <li
                        key={u.id}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "12px 8px",
                            border: "1px solid #e6e6e6",
                            borderRadius: 6,
                            marginBottom: 8,
                        }}
                    >
                        <div>
                            <div style={{ fontWeight: 600 }}>{u.name}</div>
                            <div style={{ fontSize: 13, color: "#ffffffff" }}>
                                {u.email ?? "sem email"} • {u.createdAt ? (u.createdAt.toLocaleString()) : ""}
                            </div>
                            {u.reason && (
                                <div style={{ marginTop: 6, fontSize: 13, color: "#ffffffff" }}>
                                    {u.reason}
                                </div>
                            )}
                        </div>

                        <div>
                            <button
                                onClick={() => openEvaluator(u)}
                                style={{
                                    padding: "8px 12px",
                                    background: "#2563eb",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: 6,
                                    cursor: "pointer",
                                }}
                            >
                                Avaliar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {selected && (
                <div
                    role="dialog"
                    aria-modal="true"
                    style={{
                        position: "fixed",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        background: "rgba(0,0,0,0.35)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 16,
                    }}
                >
                    <div
                        style={{
                            width: 600,
                            maxWidth: "100%",
                            background: "#fff",
                            borderRadius: 8,
                            padding: 20,
                            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            <div>
                                <h2 style={{ margin: 0, color: "#666" }}>{selected.name} </h2>
                                <div style={{ color: "#666", fontSize: 13 }}>
                                    {selected.createdAt ? (selected.createdAt.toLocaleString()) : ""}
                                </div>
                                <div style={{ color: "#666", fontSize: 13 }}>
                                    {selected.email} : {selected.enterprise}
                                </div>
                                <div style={{ color: "#666", fontSize: 13 }}>
                                    {selected.reason}
                                </div>
                            </div>

                        </div>

                        {error && (
                            <div style={{ color: "crimson", marginTop: 8 }}>{error}</div>
                        )}

                        <div
                            style={{
                                marginTop: 40,
                                marginBottom: 0,
                                display: "flex",
                                gap: 8,
                                justifyContent: "flex-end",
                            }}
                        >
                            <button
                                onClick={() => submit(UserStatus.REJEITADO)}
                                disabled={saving}
                                style={{
                                    padding: "8px 12px",
                                    background: "#ef4444",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: 6,
                                    cursor: "pointer",
                                }}
                            >
                                Rejeitar
                            </button>

                            <button
                                onClick={() => submit(UserStatus.APROVADO)}
                                disabled={saving}
                                style={{
                                    padding: "8px 12px",
                                    background: "#10b981",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: 6,
                                    cursor: "pointer",
                                }}
                            >
                                Aprovar
                            </button>

                            <button
                                onClick={closeEvaluator}
                                disabled={saving}
                                style={{
                                    padding: "8px 12px",
                                    background: "#666",
                                    border: "1px solid #e5e7eb",
                                    borderRadius: 6,
                                    cursor: "pointer",
                                }}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
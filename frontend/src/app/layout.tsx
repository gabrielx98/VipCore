'use client';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GlobalNav } from "../components/layout/nav";
import { UserDto, UserRole } from "@shared/dto/user.dto";
import { useState, useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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

const metadata: Metadata = {
  title: "VipCore",
  description: "Plataforma de Gestão para Grupos de Networking, indicações e geração de negócios.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [user, setUser] = useState<UserDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string| null>(null);

  useEffect(() => {
          api
              .fetchPending()
              .then((data) => setUser(data))
              .catch((err) => setError(err.message))
              .finally(() => setLoading(false));
      }, []);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>

        <div className="fixed top-0 z-10 flex w-full flex-col border-b border-gray-800 bg-black lg:bottom-0 lg:z-auto lg:w-72 lg:border-r lg:border-b-0 lg:border-gray-800">
          <GlobalNav items={[
            { group:"Meetings", name: "Meetings", href: "/meetings" },
            { group:"Invoices",name: "Invoices", href: "/invoices" },
            { group:"Members",name: "Bio", href: "/members/bio" },
            { group:"Members",name: "Members", href: "/members" },
            ...(user?.role === UserRole.ADMIN ? [{ group: "Members", name: "Approvals", href: "/members/approvals" }] : []),
            { group:"Opportunities",name: "Opportunities", href: "/opportunities" },
            { group:"Messages",name: "Messages", href: "/messages" },

          ]} />
        </div>
        
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";

export default function HomeForm() {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId) return;

    setLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        type="text"
        placeholder="Digite seu ID da corretora"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        disabled={loading}
        required
        aria-label="ID da Corretora"
      />
      <Button
        type="submit"
        disabled={loading || !userId}
        className="w-full font-bold bg-gradient-to-r from-accent to-primary text-white"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Verificando...
          </>
        ) : (
          <>
            Enviar e ver painel
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}

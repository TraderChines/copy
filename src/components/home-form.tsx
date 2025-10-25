"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";

export default function HomeForm() {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers
    if (/^\d*$/.test(value)) {
      setUserId(value);
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (userId.length < 7) {
      e.preventDefault();
      return;
    }
    setLoading(true);
  };

  const isButtonDisabled = loading || userId.length < 7;

  return (
    <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
      <Input
        type="text"
        placeholder="Digite seu ID da corretora"
        value={userId}
        onChange={handleInputChange}
        disabled={loading}
        required
        aria-label="ID da Corretora"
        minLength={7}
        pattern="\d*"
      />
      <Link href="/dashboard" passHref legacyBehavior>
        <a onClick={handleSubmit} aria-disabled={isButtonDisabled}>
          <Button
            type="submit"
            disabled={isButtonDisabled}
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
        </a>
      </Link>
    </form>
  );
}

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ExternalLink } from "lucide-react";
import HomeForm from "@/components/home-form";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 sm:p-8">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-4">
          Copie o Trader Chinês e Lucre Junto!
        </h1>
        <p className="max-w-xl mx-auto text-lg text-muted-foreground mb-12">
          Siga os passos abaixo para começar a espelhar as operações do nosso trader especialista e tenha a chance de obter os mesmos resultados.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <Card className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
            <CardHeader>
              <CardDescription>Passo 1</CardDescription>
              <CardTitle>Crie sua conta</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <p className="text-muted-foreground mb-4">
                É necessário criar sua conta na corretora pelo botão abaixo para que a conexão funcione. O cadastro é rápido e seguro.
              </p>
              <Button asChild className="w-full mt-auto bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-bold">
                <a href="https://exnova.com/lp/start-trading/?aff=198544&aff_model=revenue&afftrack=" target="_blank" rel="noopener noreferrer">
                  Criar conta na corretora
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700">
            <CardHeader>
              <CardDescription>Passo 2</CardDescription>
              <CardTitle>Conecte sua conta</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <p className="text-muted-foreground mb-4">
                Após criar sua conta, insira o ID fornecido pela corretora para vincular e começar a copiar as operações.
              </p>
              <HomeForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

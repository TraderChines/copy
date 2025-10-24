import { traderData } from "@/lib/data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Wallet,
  CircleDollarSign,
  BarChart,
  CheckCircle2,
  XCircle,
  TrendingUp,
} from "lucide-react";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export default function DashboardPage() {
  const {
    name,
    initialBalance,
    currentBalance,
    tradeValue,
    status,
    history,
  } = traderData;

  const totalProfit = history.reduce((acc, trade) => {
    const value = parseFloat(
      trade.result
        .replace(/[^\d,-]/g, "")
        .replace(",", ".")
    );
    return acc + value;
  }, 0);

  const stats = [
    {
      title: "Saldo Inicial",
      value: formatCurrency(initialBalance),
      icon: Wallet,
      color: "text-blue-400",
    },
    {
      title: "Saldo Atual",
      value: formatCurrency(currentBalance),
      icon: TrendingUp,
      color: "text-purple-400",
    },
    {
      title: "Lucro Total",
      value: formatCurrency(totalProfit),
      icon: BarChart,
      color: totalProfit > 0 ? "text-emerald-400" : "text-red-400",
    },
    {
      title: "Valor por Operação",
      value: formatCurrency(tradeValue),
      icon: CircleDollarSign,
      color: "text-amber-400",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <User className="w-10 h-10 text-primary" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold font-headline">{name}</h1>
              <div className="flex items-center gap-2">
                <Badge
                  variant={status === "Online" ? "default" : "destructive"}
                  className={`border-none ${
                    status === "Online"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {status}
                </Badge>
                {status === "Online" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-400" />
                )}
              </div>
            </div>
          </div>
          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar à Página Inicial
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat, index) => (
            <Card
              key={stat.title}
              className="animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: '500ms' }}>
          <CardHeader>
            <CardTitle>Histórico de Operações</CardTitle>
            <CardDescription>
              As últimas 10 operações realizadas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative w-full overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Ativo</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead className="text-right">Resultado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {history.slice(0, 10).map((trade, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{trade.date}</TableCell>
                      <TableCell>{trade.asset}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(trade.amount)}
                      </TableCell>
                      <TableCell
                        className={`text-right font-semibold ${
                          trade.result.startsWith("+")
                            ? "text-emerald-500"
                            : "text-red-500"
                        }`}
                      >
                        {trade.result}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

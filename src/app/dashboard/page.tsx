"use client";

import { useState } from "react";
import { traderData as initialTraderData } from "@/lib/data";
import type { Trade, TraderData } from "@/lib/data";
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
  Sparkles,
  Edit,
  Trash2,
  PlusCircle,
  Minus,
  Plus
} from "lucide-react";
import PerformanceChart from "@/components/performance-chart";
import { parseTradeResult } from "@/lib/utils";
import AiAnalysis from "@/components/ai-analysis";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const assetOptions = [
  "AUD/JPY",
  "AUD/JPY (OTC)",
  "EUR/JPY",
  "EUR/JPY (OTC)",
  "EUR/USD",
  "EUR/USD (OTC)",
  "USD/JPY",
  "USD/JPY (OTC)",
];

export default function DashboardPage() {
  const [traderData, setTraderData] = useState<TraderData>(initialTraderData);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedData, setEditedData] = useState(traderData);

  const {
    name,
    initialBalance,
    currentBalance,
    tradeValue,
    status,
    history,
  } = traderData;

  const totalProfit = currentBalance - initialBalance;

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

  const chartData = history
    .slice()
    .reverse()
    .reduce((acc, trade) => {
      const profit = parseTradeResult(trade.result);
      const lastCumulativeProfit = acc.length > 0 ? acc[acc.length - 1].cumulativeProfit : 0;
      const newCumulativeProfit = lastCumulativeProfit + profit;
      
      acc.push({
        name: new Date(trade.date.split(" ")[0].split("/").reverse().join("-")).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
        profit: newCumulativeProfit,
        cumulativeProfit: newCumulativeProfit,
      });
      return acc;
    }, [] as { name: string; profit: number; cumulativeProfit: number }[]);

  const handleOpenEditModal = () => {
    setEditedData(traderData);
    setIsEditModalOpen(true);
  };
  
  const handleSaveChanges = () => {
    setTraderData({ ...editedData });
    setIsEditModalOpen(false);
  };

  const handleHistoryChange = (index: number, field: keyof Trade, value: string | number) => {
    const newHistory = [...editedData.history];
    (newHistory[index] as any)[field] = value;
    setEditedData({ ...editedData, history: newHistory });
  };

  const handleResultButtonClick = (index: number, type: 'win' | 'loss') => {
    const trade = editedData.history[index];
    const resultValue = trade.amount * 0.85; // Example payout
    const resultString = `${type === 'win' ? '+' : '-'}R$${resultValue.toFixed(2).replace('.', ',')}`;
    handleHistoryChange(index, 'result', resultString);
  };
  
  const handleRemoveTrade = (index: number) => {
    const newHistory = editedData.history.filter((_, i) => i !== index);
    setEditedData({ ...editedData, history: newHistory });
  };

  const handleAddTrade = () => {
    const newTrade: Trade = {
        date: new Intl.DateTimeFormat('pt-BR', { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(new Date()),
        asset: 'EUR/USD',
        type: "Call",
        amount: editedData.tradeValue,
        result: `+R$${(editedData.tradeValue * 0.85).toFixed(2).replace('.', ',')}`
    };
    const newHistory = [newTrade, ...editedData.history];
    setEditedData({ ...editedData, history: newHistory });
  };

  const editedTotalProfit = editedData.currentBalance - editedData.initialBalance;


  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <User className="w-10 h-10 text-primary" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold font-headline">{name}</h1>
              <div className="flex items-center gap-2">
                <button onClick={handleOpenEditModal} className="group relative">
                  <Badge
                    variant={status === "Online" ? "default" : "destructive"}
                    className={`border-none transition-all group-hover:ring-2 group-hover:ring-primary/50 ${
                      status === "Online"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {status}
                  </Badge>
                  <div className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Edit className="w-3 h-3 text-primary"/>
                  </div>
                </button>
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
        
        <div className="grid gap-8 lg:grid-cols-3 mb-8">
            <Card className="lg:col-span-2 animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: '400ms' }}>
                <CardHeader>
                <CardTitle>Evolução do Lucro</CardTitle>
                <CardDescription>
                    Gráfico do lucro acumulado ao longo do tempo.
                </CardDescription>
                </CardHeader>
                <CardContent>
                    <PerformanceChart data={chartData} />
                </CardContent>
            </Card>
            <Card className="animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: '500ms' }}>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Sparkles className="text-primary w-5 h-5" />
                        Análise de IA
                    </CardTitle>
                    <CardDescription>
                        Peça à IA para analisar o desempenho do trader.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <AiAnalysis history={history} />
                </CardContent>
            </Card>
        </div>


        <Card className="animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: '600ms' }}>
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
                    <TableHead>Tipo</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead className="text-right">Resultado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {history.slice(0, 10).map((trade, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{trade.date}</TableCell>
                      <TableCell>{trade.asset}</TableCell>
                      <TableCell>
                        <Badge variant={trade.type === 'Call' ? 'default' : 'destructive'} className={`${trade.type === 'Call' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'} border-none`}>
                            {trade.type}
                        </Badge>
                      </TableCell>
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
      
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Editar Dados do Trader</DialogTitle>
            <DialogDescription>
              Altere as informações abaixo e clique em salvar.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 py-4">
            {/* Coluna de Dados Gerais */}
            <div className="space-y-4 pr-4 border-r border-border">
                <h3 className="text-lg font-medium text-foreground mb-4">Informações Gerais</h3>
                <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Nome
                    </Label>
                    <Input
                        id="name"
                        value={editedData.name}
                        onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                        className="col-span-2"
                    />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="initialBalance" className="text-right">
                        Saldo Inicial
                    </Label>
                    <Input
                        id="initialBalance"
                        type="number"
                        value={editedData.initialBalance}
                        onChange={(e) => setEditedData({ ...editedData, initialBalance: parseFloat(e.target.value) || 0 })}
                        className="col-span-2"
                    />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="currentBalance" className="text-right">
                        Saldo Atual
                    </Label>
                    <Input
                        id="currentBalance"
                        type="number"
                        value={editedData.currentBalance}
                        onChange={(e) => setEditedData({ ...editedData, currentBalance: parseFloat(e.target.value) || 0 })}
                        className="col-span-2"
                    />
                </div>
                 <div className="grid grid-cols-3 items-center gap-4">
                    <Label className="text-right">Lucro Total</Label>
                    <div className="col-span-2 font-bold text-lg">
                        <span className={editedTotalProfit > 0 ? 'text-emerald-400' : 'text-red-400'}>
                            {formatCurrency(editedTotalProfit)}
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="tradeValue" className="text-right">
                        Valor/Operação
                    </Label>
                    <Input
                        id="tradeValue"
                        type="number"
                        value={editedData.tradeValue}
                        onChange={(e) => setEditedData({ ...editedData, tradeValue: parseFloat(e.target.value) || 0 })}
                        className="col-span-2"
                    />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                        Status
                    </Label>
                    <div className="col-span-2 flex items-center space-x-2">
                        <Switch
                        id="status"
                        checked={editedData.status === 'Online'}
                        onCheckedChange={(checked) => setEditedData({ ...editedData, status: checked ? 'Online' : 'Offline' })}
                        />
                        <Label htmlFor="status" className={editedData.status === 'Online' ? 'text-emerald-400' : 'text-red-400'}>{editedData.status}</Label>
                    </div>
                </div>
            </div>
            {/* Coluna do Histórico de Operações */}
            <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-foreground">Histórico de Operações</h3>
                    <Button variant="outline" size="sm" onClick={handleAddTrade}>
                        <PlusCircle className="mr-2 h-4 w-4"/> Adicionar Operação
                    </Button>
                </div>
                <ScrollArea className="h-80 pr-4">
                <div className="space-y-3">
                    {editedData.history.map((trade, index) => (
                    <div key={index} className="flex gap-2 items-start p-3 rounded-md border bg-muted/20">
                        <div className="flex-1 grid grid-cols-2 gap-2">
                            <Input
                                value={trade.date}
                                onChange={(e) => handleHistoryChange(index, 'date', e.target.value)}
                                className="text-xs h-8 col-span-2"
                                placeholder="Data/Hora"
                            />
                            <Select
                                value={trade.asset}
                                onValueChange={(value) => handleHistoryChange(index, "asset", value)}
                            >
                                <SelectTrigger className="text-xs h-8">
                                <SelectValue placeholder="Ativo" />
                                </SelectTrigger>
                                <SelectContent>
                                  {assetOptions.map(option => (
                                    <SelectItem key={option} value={option}>{option}</SelectItem>
                                  ))}
                                </SelectContent>
                            </Select>
                            <Select
                                value={trade.type}
                                onValueChange={(value) => handleHistoryChange(index, "type", value)}
                            >
                                <SelectTrigger className="text-xs h-8">
                                <SelectValue placeholder="Tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                <SelectItem value="Call">Call</SelectItem>
                                <SelectItem value="Put">Put</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="col-span-2 space-y-2">
                                <Label className="text-xs">Valor da Operação</Label>
                                <Input
                                    type="number"
                                    value={trade.amount}
                                    onChange={(e) => handleHistoryChange(index, 'amount', parseFloat(e.target.value) || 0)}
                                    className="text-xs h-8"
                                    placeholder="Valor"
                                />
                            </div>
                            <div className="col-span-2 space-y-2">
                                <Label className="text-xs">Resultado</Label>
                                <div className="flex gap-2">
                                    <Button size="sm" className="flex-1 bg-emerald-500/80 hover:bg-emerald-500 text-white text-xs h-8" onClick={() => handleResultButtonClick(index, 'win')}>Win</Button>
                                    <Button size="sm" className="flex-1 bg-red-500/80 hover:bg-red-500 text-white text-xs h-8" onClick={() => handleResultButtonClick(index, 'loss')}>Loss</Button>
                                </div>
                                <Input
                                    value={trade.result}
                                    onChange={(e) => handleHistoryChange(index, 'result', e.target.value)}
                                    className="text-xs h-8 mt-2"
                                    placeholder="+R$0,00"
                                />
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:bg-destructive/20 hover:text-destructive flex-shrink-0 mt-5"
                            onClick={() => handleRemoveTrade(index)}
                        >
                            <Trash2 className="h-4 w-4"/>
                        </Button>
                    </div>
                    ))}
                </div>
                </ScrollArea>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleSaveChanges}>
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

    
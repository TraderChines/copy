"use client";

import { useState, useEffect } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Wallet,
  CircleDollarSign,
  TrendingUp,
  Edit,
  Trash2,
  PlusCircle,
  Settings,
  Target,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { parseTradeResult } from "@/lib/utils";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const assetOptions = [
    "AUD/CAD", "AUD/JPY", "AUD/NZD", "AUD/USD", "CAD/JPY", 
    "EUR/AUD", "EUR/CAD", "EUR/GBP", "EUR/JPY", "EUR/NZD", "EUR/USD", 
    "GBP/AUD", "GBP/CAD", "GBP/JPY", "GBP/NZD", "GBP/USD", 
    "NZD/JPY", "NZD/USD", "USD/CAD", "USD/CHF", "USD/JPY"
];

const emptyTrade: Trade = {
  date: new Intl.DateTimeFormat('pt-BR', { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(new Date()),
  asset: 'EUR/USD',
  type: "Call",
  amount: 0,
  result: '+R$0,00'
};

export default function DashboardPage() {
  const [traderData, setTraderData] = useState<TraderData>({
    name: "Trader Chinês",
    initialBalance: 1177.78,
    currentBalance: 32210.91,
    tradeValue: 1500,
    status: "Offline",
    history: [
      { date: "27/10/25, 20:43", asset: "USD/JPY", type: "Call", amount: 1500, result: "+R$1.305,00" },
      { date: "24/10 13:57", asset: "EUR/USD", type: "Put", amount: 1500, result: "+R$1.275,00" },
      { date: "23/10 14:49", asset: "EUR/USD", type: "Put", amount: 1500, result: "+R$1.305,00" },
      { date: "22/10 15:09", asset: "EUR/JPY", type: "Put", amount: 4500, result: "-R$4.500,00" },
      { date: "21/10 16:05", asset: "EUR/USD", type: "Put", amount: 1500, result: "-R$1.500,00" },
      { date: "20/10 13:22", asset: "EUR/JPY", type: "Put", amount: 10500, result: "+R$9.240,00" },
      { date: "20/10 03:00", asset: "EUR/JPY", type: "Put", amount: 4497, result: "+R$1.139,24" },
      { date: "20/10 02:56", asset: "EUR/JPY", type: "Put", amount: 7495, result: "+R$6.595,60" },
      { date: "17/10 13:17", asset: "EUR/USD", type: "Put", amount: 4500, result: "+R$1.140,00" },
      { date: "16/10 12:45", asset: "EUR/JPY", type: "Call", amount: 4500, result: "+R$3.960,00" },
      { date: "14/10 14:05", asset: "AUD/JPY", type: "Call", amount: 1500, result: "+R$1.335,00" },
    ],
  });
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  
  const [editedProfile, setEditedProfile] = useState(traderData);
  const [editedTrade, setEditedTrade] = useState<Trade | null>(null);
  const [editedTradeIndex, setEditedTradeIndex] = useState<number | null>(null);
  const [rawResult, setRawResult] = useState("");

  const [isEditMode, setIsEditMode] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  
  const [payout] = useState(0.87); // 87% payout default

  useEffect(() => {
    if (clickCount >= 5) {
      setIsEditMode(true);
      setClickCount(0); // Reset count after activation
    }

    const timer = setTimeout(() => {
      setClickCount(0);
    }, 1500); // Reset if clicks are too spaced out

    return () => clearTimeout(timer);
  }, [clickCount]);

  const handleProfileCardClick = () => {
    setClickCount(prev => prev + 1);
  };


  const {
    name,
    initialBalance,
    currentBalance,
    tradeValue,
    status,
    history,
  } = traderData;

  const totalProfit = currentBalance - initialBalance;
  
  const wins = history.filter(trade => parseTradeResult(trade.result) > 0).length;
  const totalTrades = history.length;
  const winRate = totalTrades > 0 ? (wins / totalTrades) * 100 : 0;

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
      icon: TrendingUp,
      color: totalProfit > 0 ? "text-emerald-400" : "text-red-400",
    },
    {
      title: "Valor por Operação",
      value: formatCurrency(tradeValue),
      icon: CircleDollarSign,
      color: "text-amber-400",
    },
     {
      title: "Assertividade",
      value: `${winRate.toFixed(1)}%`,
      icon: Target,
      color: "text-rose-400",
    },
  ];

  const handleOpenProfileModal = () => {
    setEditedProfile(traderData);
    setIsProfileModalOpen(true);
  };
  
  const handleSaveProfile = () => {
    // A lógica de recálculo foi removida. O saldo atual é salvo diretamente do modal.
    setTraderData(editedProfile);
    setIsProfileModalOpen(false);
  };

  const handleOpenTradeModal = (trade: Trade | null, index: number | null) => {
    const tradeToEdit = trade ? { ...trade } : { ...emptyTrade, amount: traderData.tradeValue };
    setEditedTrade(tradeToEdit);
    setEditedTradeIndex(index);
    if(trade) {
        // Remove currency symbols and formatting for editing
        const numericResult = String(Math.abs(parseTradeResult(trade.result)));
        setRawResult(numericResult);
    } else {
        setRawResult("");
    }
    setIsTradeModalOpen(true);
  };

  const handleSaveTrade = () => {
    if (!editedTrade) return;

    const resultValue = parseFloat(rawResult.replace(',', '.')) || 0;
    const sign = editedTrade.result.startsWith('-') ? '-' : '+';
    
    const finalResult = `${sign}R$${new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(resultValue)}`;

    const finalTrade = { ...editedTrade, result: finalResult };

    let newHistory: Trade[];
    if (editedTradeIndex !== null) {
      newHistory = traderData.history.map((trade, index) =>
        index === editedTradeIndex ? finalTrade : trade
      );
    } else {
      newHistory = [finalTrade, ...traderData.history];
    }
    
    const newCurrentBalance = newHistory.reduce((acc, trade) => acc + parseTradeResult(trade.result), traderData.initialBalance);

    setTraderData({
      ...traderData,
      history: newHistory,
      currentBalance: newCurrentBalance,
    });

    setIsTradeModalOpen(false);
    setEditedTrade(null);
    setEditedTradeIndex(null);
    setRawResult("");
  };

  const handleRemoveTrade = (indexToRemove: number) => {
    const newHistory = traderData.history.filter((_, index) => index !== indexToRemove);
    const newCurrentBalance = newHistory.reduce((acc, trade) => acc + parseTradeResult(trade.result), traderData.initialBalance);
    setTraderData({
      ...traderData,
      history: newHistory,
      currentBalance: newCurrentBalance,
    });
  };

  const handleTradeInputChange = (field: keyof Trade, value: string | number) => {
    if (editedTrade) {
      setEditedTrade({ ...editedTrade, [field]: value });
    }
  };
  
  const handleResultButtonClick = (type: 'win' | 'loss') => {
    if (!editedTrade) return;
    const amount = editedTrade.amount || 0;
    const resultValue = type === 'win' ? amount * payout : amount;
    const resultSign = type === 'win' ? '+' : '-';
    setEditedTrade({ ...editedTrade, result: `${resultSign}R$` });
    setRawResult(resultValue.toFixed(2).replace('.', ','));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-lg px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="flex items-center gap-2">
            <User className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-semibold">Dashboard do Trader</h1>
          </div>
          <div className="ml-auto flex items-center gap-2">
             {isEditMode && (
              <Button variant="destructive" size="sm" onClick={() => setIsEditMode(false)}>
                Sair do Modo de Edição
              </Button>
            )}
            <Link href="/" passHref legacyBehavior>
              <Button asChild variant="outline" size="sm">
                <a>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Página Inicial
                </a>
              </Button>
            </Link>
          </div>
      </header>
      <main className="p-4 sm:p-6 lg:p-8 grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1 flex flex-col gap-8">
            <Card className="overflow-hidden" onClick={handleProfileCardClick}>
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 h-24 relative">
                    {isEditMode && (
                      <Button variant="ghost" size="icon" onClick={handleOpenProfileModal} className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors">
                          <Settings size={18}/>
                      </Button>
                    )}
                </div>
                <CardContent className="relative text-center p-6 pt-0">
                    <Avatar className="w-24 h-24 mx-auto -mt-12 border-4 border-background">
                        <AvatarImage src={`https://avatar.vercel.sh/${name}.png`} />
                        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h2 className="text-2xl font-bold mt-4">{name}</h2>
                    <Badge
                        variant={status === "Online" ? "default" : "destructive"}
                        className={`mt-2 border-none transition-all ${
                        status === "Online"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                    >
                        {status}
                    </Badge>
                </CardContent>
            </Card>
        </div>

        <div className="md:col-span-2 flex flex-col gap-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stats.slice(0, -1).map((stat) => (
              <Card key={stat.title}>
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
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Assertividade
                  </CardTitle>
                  <Target className="h-5 w-5 text-rose-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{`${winRate.toFixed(1)}%`}</div>
                </CardContent>
              </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row justify-between items-center">
              <div>
                <CardTitle>Histórico de Operações</CardTitle>
                <CardDescription>As últimas operações realizadas.</CardDescription>
              </div>
              {isEditMode && (
                <Button size="sm" onClick={() => handleOpenTradeModal(null, null)}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Adicionar Operação
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data/Hora</TableHead>
                      <TableHead>Ativo</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead className="text-right">Resultado</TableHead>
                      {isEditMode && <TableHead className="text-right">Ações</TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {history.map((trade, index) => (
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
                            parseTradeResult(trade.result) > 0
                              ? "text-emerald-500"
                              : "text-red-500"
                          }`}
                        >
                          {trade.result}
                        </TableCell>
                        {isEditMode && (
                          <TableCell className="text-right">
                            <div className="flex gap-2 justify-end">
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleOpenTradeModal(trade, index)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-400" onClick={() => handleRemoveTrade(index)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
            </CardContent>
          </Card>
        </div>
      </main>
      
      {/* Profile Edit Modal */}
      <Dialog open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Perfil do Trader</DialogTitle>
            <DialogDescription>
              Altere as informações gerais e clique em salvar.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
              <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                      Nome
                  </Label>
                  <Input
                      id="name"
                      value={editedProfile.name}
                      onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
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
                      value={editedProfile.initialBalance}
                      onChange={(e) => setEditedProfile({ ...editedProfile, initialBalance: parseFloat(e.target.value) || 0 })}
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
                      value={editedProfile.currentBalance}
                      onChange={(e) => setEditedProfile({ ...editedProfile, currentBalance: parseFloat(e.target.value) || 0 })}
                      className="col-span-2"
                  />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="tradeValue" className="text-right">
                      Valor/Operação
                  </Label>
                  <Input
                      id="tradeValue"
                      type="number"
                      value={editedProfile.tradeValue}
                      onChange={(e) => setEditedProfile({ ...editedProfile, tradeValue: parseFloat(e.target.value) || 0 })}
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
                      checked={editedProfile.status === 'Online'}
                      onCheckedChange={(checked) => setEditedProfile({ ...editedProfile, status: checked ? 'Online' : 'Offline' })}
                      />
                      <Label htmlFor="status" className={editedProfile.status === 'Online' ? 'text-emerald-400' : 'text-red-400'}>{editedProfile.status}</Label>
                  </div>
              </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleSaveProfile}>
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Trade Edit/Add Modal */}
      <Dialog open={isTradeModalOpen} onOpenChange={setIsTradeModalOpen}>
        <DialogContent className="sm:max-w-md">
           <DialogHeader>
            <DialogTitle>{editedTradeIndex !== null ? 'Editar Operação' : 'Adicionar Nova Operação'}</DialogTitle>
          </DialogHeader>
          {editedTrade && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                  <Label>Data / Hora</Label>
                  <Input
                      value={editedTrade.date}
                      onChange={(e) => handleTradeInputChange('date', e.target.value)}
                      placeholder="dd/mm/aa hh:mm"
                  />
              </div>
              <div className="space-y-2">
                  <Label>Ativo</Label>
                   <Select
                      value={editedTrade.asset}
                      onValueChange={(value) => handleTradeInputChange("asset", value)}
                  >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o ativo" />
                      </SelectTrigger>
                      <SelectContent>
                        {assetOptions.map(option => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                  </Select>
              </div>
               <div className="space-y-2">
                  <Label>Tipo</Label>
                   <Select
                      value={editedTrade.type}
                      onValueChange={(value) => handleTradeInputChange("type", value)}
                  >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Call">Call</SelectItem>
                        <SelectItem value="Put">Put</SelectItem>
                      </SelectContent>
                  </Select>
              </div>
              <div className="space-y-2">
                  <Label>Valor da Operação</Label>
                  <Input
                      type="number"
                      value={editedTrade.amount}
                      onChange={(e) => handleTradeInputChange('amount', parseFloat(e.target.value) || 0)}
                  />
              </div>
               <div className="space-y-2">
                  <Label>Resultado</Label>
                  <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-emerald-500/80 hover:bg-emerald-500 text-white" onClick={() => handleResultButtonClick('win')}>Win</Button>
                      <Button size="sm" className="flex-1 bg-red-500/80 hover:bg-red-500 text-white" onClick={() => handleResultButtonClick('loss')}>Loss</Button>
                  </div>
                   <div className="relative mt-2">
                     <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                        {editedTrade.result.startsWith('-') ? '-R$' : '+R$'}
                    </span>
                    <Input
                        type="text"
                        value={rawResult}
                        onChange={(e) => setRawResult(e.target.value.replace(/[^0-9,]/g, ''))}
                        placeholder="0,00"
                        className="pl-12 text-right"
                    />
                  </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleSaveTrade}>
              Salvar Operação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}

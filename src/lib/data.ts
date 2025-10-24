export interface Trade {
  date: string;
  asset: string;
  type: "Call" | "Put";
  amount: number;
  result: string;
}

export interface TraderData {
  name: string;
  initialBalance: number;
  currentBalance: number;
  tradeValue: number;
  status: "Online" | "Offline";
  history: Trade[];
}

export const traderData: TraderData = {
  name: "Trader Chinês",
  initialBalance: 1000.0,
  currentBalance: 1250.5,
  tradeValue: 50.0,
  status: "Online",
  history: [
    { date: "24/10/2025 14:22", asset: "EUR/USD", type: "Call", amount: 50, result: "+R$12,50" },
    { date: "24/10/2025 13:47", asset: "BTC/USDT", type: "Put", amount: 50, result: "-R$10,00" },
    { date: "24/10/2025 13:15", asset: "GBP/USD", type: "Call", amount: 50, result: "+R$25,00" },
    { date: "24/10/2025 12:44", asset: "USD/JPY", type: "Put", amount: 50, result: "+R$15,00" },
    { date: "24/10/2025 12:10", asset: "ETH/USDT", type: "Call", amount: 50, result: "-R$5,00" },
    { date: "24/10/2025 11:55", asset: "AUD/CAD", type: "Put", amount: 50, result: "+R$18,20" },
    { date: "24/10/2025 11:23", asset: "XAU/USD", type: "Call", amount: 50, result: "-R$15,00" },
    { date: "24/10/2025 10:45", asset: "EUR/GBP", type: "Put", amount: 50, result: "+R$22,80" },
    { date: "24/10/2025 10:11", asset: "SPX500", type: "Call", amount: 50, result: "+R$30,00" },
    { date: "24/10/2025 09:30", asset: "EUR/USD", type: "Put", amount: 50, result: "-R$8,00" },
  ],
};

export interface Trade {
  date: string;
  asset: string;
  amount: number;
  result: string;
}

interface TraderData {
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
    { date: "24/10/2025 14:22", asset: "EUR/USD", amount: 50, result: "+R$12,50" },
    { date: "24/10/2025 13:47", asset: "BTC/USDT", amount: 50, result: "-R$10,00" },
    { date: "24/10/2025 13:15", asset: "GBP/USD", amount: 50, result: "+R$25,00" },
    { date: "24/10/2025 12:44", asset: "USD/JPY", amount: 50, result: "+R$15,00" },
    { date: "24/10/2025 12:10", asset: "ETH/USDT", amount: 50, result: "-R$5,00" },
    { date: "24/10/2025 11:55", asset: "AUD/CAD", amount: 50, result: "+R$18,20" },
    { date: "24/10/2025 11:23", asset: "XAU/USD", amount: 50, result: "-R$15,00" },
    { date: "24/10/2025 10:45", asset: "EUR/GBP", amount: 50, result: "+R$22,80" },
    { date: "24/10/2025 10:11", asset: "SPX500", amount: 50, result: "+R$30,00" },
    { date: "24/10/2025 09:30", asset: "EUR/USD", amount: 50, result: "-R$8,00" },
  ],
};

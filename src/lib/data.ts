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
  initialBalance: 1177.78,
  currentBalance: 32210.91,
  tradeValue: 1500,
  status: "Offline",
  history: [
    { date: "27/10/25 20:43", asset: "USD/JPY", type: "Call", amount: 1500, result: "+R$1.305,00" },
    { date: "24/10/25 13:57", asset: "EUR/USD", type: "Put", amount: 1500, result: "+R$1.275,00" },
    { date: "23/10/25 14:49", asset: "EUR/USD", type: "Put", amount: 1500, result: "+R$1.305,00" },
    { date: "22/10/25 15:09", asset: "EUR/JPY", type: "Put", amount: 4500, result: "-R$4.500,00" },
    { date: "21/10/25 16:05", asset: "EUR/USD", type: "Put", amount: 1500, result: "-R$1.500,00" },
    { date: "20/10/25 13:22", asset: "EUR/JPY", type: "Put", amount: 10500, result: "+R$9.240,00" },
    { date: "20/10/25 03:00", asset: "EUR/JPY", type: "Put", amount: 4497, result: "+R$1.139,24" },
    { date: "20/10/25 02:56", asset: "EUR/JPY", type: "Put", amount: 7495, result: "+R$6.595,60" },
    { date: "17/10/25 13:17", asset: "EUR/USD", type: "Put", amount: 4500, result: "+R$1.140,00" },
    { date: "16/10/25 12:45", asset: "EUR/JPY", type: "Call", amount: 4500, result: "+R$3.960,00" },
    { date: "14/10/25 14:05", asset: "AUD/JPY", type: "Call", amount: 1500, result: "+R$1.335,00" },
  ],
};

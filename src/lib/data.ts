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
  currentBalance: 30905.91,
  tradeValue: 1500,
  status: "Online",
  history: [
    {
      date: "24/10 13:57",
      asset: "EUR/USD",
      type: "Put",
      amount: 1500,
      result: "+R$1,275",
    },
    {
      date: "23/10 14:49",
      asset: "EUR/USD",
      type: "Put",
      amount: 1500,
      result: "+R$1,305",
    },
    {
      date: "22/10 15:09",
      asset: "USD/JPY",
      type: "Put",
      amount: 4500,
      result: "-R$4,500",
    },
    {
      date: "21/10 16:05",
      asset: "EUR/USD",
      type: "Put",
      amount: 1500,
      result: "-R$1,500",
    },
    {
      date: "20/10 13:22",
      asset: "EUR/JPY",
      type: "Put",
      amount: 10500,
      result: "+R$9,240",
    },
    {
      date: "20/10 03:00",
      asset: "EUR/JPY",
      type: "Put",
      amount: 4497,
      result: "+R$1,139.24",
    },
    {
      date: "20/10 02:56",
      asset: "EUR/JPY",
      type: "Put",
      amount: 7495,
      result: "+R$6,595.60",
    },
    {
      date: "17/10 13:17",
      asset: "EUR/USD",
      type: "Put",
      amount: 4500,
      result: "+R$1,140",
    },
    {
      date: "16/10 12:45",
      asset: "EUR/JPY",
      type: "Call",
      amount: 4500,
      result: "+R$3,960",
    },
    {
      date: "14/10 14:05",
      asset: "AUD/JPY",
      type: "Call",
      amount: 1500,
      result: "+R$1,335",
    },
  ],
};

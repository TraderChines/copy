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
  initialBalance: 0,
  currentBalance: 0,
  tradeValue: 0,
  status: "Online",
  history: [],
};

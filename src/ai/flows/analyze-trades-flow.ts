'use server';
/**
 * @fileOverview Um fluxo de IA para analisar o histórico de negociações de um trader.
 *
 * - analyzeTrades - Uma função que recebe o histórico de negociações e retorna uma análise.
 * - AnalyzeTradesInput - O tipo de entrada para a função analyzeTrades.
 * - AnalyzeTradesOutput - O tipo de retorno para a função analyzeTrades.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const TradeSchema = z.object({
  date: z.string(),
  asset: z.string(),
  amount: z.number(),
  result: z.string(),
});

const AnalyzeTradesInputSchema = z.object({
  history: z.array(TradeSchema).describe("Uma lista de objetos de negociação, onde cada objeto representa uma única operação."),
});
export type AnalyzeTradesInput = z.infer<typeof AnalyzeTradesInputSchema>;

const AnalyzeTradesOutputSchema = z.object({
  analysis: z.string().describe("Uma análise concisa e perspicaz do histórico de negociações fornecido, em português. Destaque os pontos positivos e negativos, e o desempenho geral. Formate a resposta usando markdown."),
});
export type AnalyzeTradesOutput = z.infer<typeof AnalyzeTradesOutputSchema>;

export async function analyzeTrades(input: AnalyzeTradesInput): Promise<AnalyzeTradesOutput> {
  return analyzeTradesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeTradesPrompt',
  input: { schema: AnalyzeTradesInputSchema },
  output: { schema: AnalyzeTradesOutputSchema },
  prompt: `Você é um analista financeiro especialista em day trading. Sua tarefa é analisar o histórico de operações de um trader e fornecer um resumo do seu desempenho.

  Seja direto e use uma linguagem clara. Forneça insights sobre os pontos fortes e fracos do trader com base nos dados.
  
  O histórico de operações é o seguinte:
  {{#each history}}
  - Data: {{date}}, Ativo: {{asset}}, Resultado: {{result}}
  {{/each}}
  
  Gere um resumo da análise em português e formate-o em markdown.`,
});

const analyzeTradesFlow = ai.defineFlow(
  {
    name: 'analyzeTradesFlow',
    inputSchema: AnalyzeTradesInputSchema,
    outputSchema: AnalyzeTradesOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error("A análise da IA falhou em retornar uma resposta.");
    }
    return output;
  }
);

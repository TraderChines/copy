"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";
import { analyzeTrades } from "@/ai/flows/analyze-trades-flow";
import type { Trade } from "@/lib/data";

interface AiAnalysisProps {
  history: Trade[];
}

// Basic markdown to HTML renderer
const MarkdownRenderer = ({ content }: { content: string }) => {
    const htmlContent = content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
        .replace(/\*(.*?)\*/g, '<em>$1</em>')           // Italic
        .replace(/^- (.*)/gm, '<li class="ml-4 list-disc">$1</li>') // List items
        .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');      // Wrap list items in ul


    return <div className="text-sm space-y-2" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};


export default function AiAnalysis({ history }: AiAnalysisProps) {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState("");

  const handleAnalysis = async () => {
    setLoading(true);
    setAnalysis("");
    try {
      const result = await analyzeTrades({ history });
      setAnalysis(result.analysis);
    } catch (error) {
      console.error("Error fetching AI analysis:", error);
      setAnalysis("Ocorreu um erro ao buscar a análise. Tente novamente.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-4">
      {analysis ? (
         <div className="prose prose-sm dark:prose-invert max-w-none">
            <MarkdownRenderer content={analysis} />
         </div>
      ) : (
        <p className="text-muted-foreground text-sm">
          Receba insights sobre a performance, pontos fortes e fracos do trader com base no histórico de operações.
        </p>
      )}

      <Button
        onClick={handleAnalysis}
        disabled={loading}
        className="w-full mt-auto"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analisando...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            {analysis ? "Analisar Novamente" : "Analisar Desempenho"}
          </>
        )}
      </Button>
    </div>
  );
}

import { GoogleGenAI } from "@google/genai";
import { createFileRoute } from "@tanstack/react-router";

type IncomingMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatRequestBody = {
  messages?: IncomingMessage[];
  userRole?: string | null;
  conditions?: string[];
  mode?: "noor" | "therapist";
  language?: "en" | "ar" | "hi";
};

const MODELS = ["gemini-4-hydrogen", "gemini-3.1-flash-lite"] as const;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const apiKey = process.env["GEMINI_API_KEY"];
          if (!apiKey) {
            return Response.json(
              { error: "GEMINI_API_KEY is not configured on the server." },
              { status: 503 },
            );
          }

          const body = (await request.json()) as ChatRequestBody;
          const messages = Array.isArray(body.messages) ? body.messages.slice(-10) : [];
          if (messages.length === 0) {
            return Response.json({ error: "No message provided." }, { status: 400 });
          }

          const ai = new GoogleGenAI({
            apiKey,
            httpOptions: {
              headers: {
                "User-Agent": "aistudio-build",
              },
            },
          });

          const roleLabel =
            body.userRole === "child" ? "student / child" : body.userRole || "parent or educator";
          const conditionList =
            body.userRole !== "child" &&
            Array.isArray(body.conditions) &&
            body.conditions.length > 0
              ? body.conditions.join(", ")
              : "general calm & accessible learning support";

          const langInstruction =
            body.language === "ar"
              ? "Always reply in clear, warm Arabic (العربية)."
              : body.language === "hi"
                ? "Always reply in clear, warm Hindi (हिन्दी)."
                : "Always reply in clear, warm English.";

          const isTherapist = body.mode === "therapist";
          const conversation = messages
            .map(
              (m) =>
                `${m.role === "user" ? "User" : isTherapist ? "Dr. Meera" : "Noor"}: ${m.content}`,
            )
            .join("\n");

          const systemInstruction = isTherapist
            ? [
                "You are Dr. Meera Nair, an RCI-certified child speech and sensory therapist on the Amanah Care Team (UAE–India partnership).",
                `Current user role: ${roleLabel}. Support focus: ${conditionList}.`,
                langInstruction,
                "Style rules:",
                "- Reply warmly, calmly, and gently in 2–3 short sentences.",
                "- Acknowledge feelings first and offer one practical sensory or communication step.",
                "- Never mention diagnostic labels to a student/child and never prescribe medication.",
              ].join("\n")
            : [
                "You are Noor, the gentle dove companion of Amanah.",
                "Amanah connects neurodivergent students, parents, and educators across the UAE–India partnership in support of Vision 2030 and UN SDG 3.",
                `Current user role: ${roleLabel}. Support focus: ${conditionList}.`,
                langInstruction,
                "Style rules:",
                "- Keep replies warm, calm, clear, and concise (2 to 3 short sentences or 3 simple steps).",
                "- If talking to a student/child, never mention diagnostic labels; keep it friendly, reassuring, and simple.",
                "- Never diagnose or prescribe medication; suggest tapping a Tap-to-Talk card to alert a parent or educator when helpful.",
              ].join("\n");

          let replyText: string | undefined;
          let usedModel: string = MODELS[0];
          let lastError: unknown;

          for (const model of MODELS) {
            try {
              const response = await ai.models.generateContent({
                model,
                contents: conversation,
                config: { systemInstruction },
              });
              if (response.text?.trim()) {
                replyText = response.text.trim();
                usedModel = model;
                break;
              }
            } catch (err) {
              lastError = err;
              await new Promise((r) => setTimeout(r, 400));
            }
          }

          if (!replyText) {
            const detail =
              lastError instanceof Error ? lastError.message : "Gemini service unavailable.";
            return Response.json({ error: detail }, { status: 503 });
          }

          return Response.json({ reply: replyText, model: usedModel });
        } catch (err) {
          const message = err instanceof Error ? err.message : "Failed to reach Gemini API.";
          return Response.json({ error: message }, { status: 500 });
        }
      },
    },
  },
});

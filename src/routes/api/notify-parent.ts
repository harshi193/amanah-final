import { createFileRoute } from "@tanstack/react-router";

type NotifyParentBody = {
  childName?: string;
  parentEmail?: string;
  parentName?: string;
  card?: string;
  at?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Route = createFileRoute("/api/notify-parent")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as NotifyParentBody;
          const childName = (body.childName ?? "").trim();
          const parentEmail = (body.parentEmail ?? "").trim().toLowerCase();
          const parentName = (body.parentName ?? "Parent").trim();
          const card = (body.card ?? "").trim();
          const at = (
            body.at ?? new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          ).trim();

          if (!childName || !card || !EMAIL_RE.test(parentEmail)) {
            return Response.json(
              { error: "Valid childName, card, and parentEmail are required." },
              { status: 400 },
            );
          }

          const resendApiKey = process.env["RESEND_API_KEY"];
          const fromEmail = process.env["RESEND_FROM_EMAIL"] || "Amanah <notifications@resend.dev>";

          if (resendApiKey) {
            const subject = `Amanah alert from ${childName}: ${card}`;
            const text = [
              `Hello ${parentName},`,
              "",
              `${childName} sent a Tap-to-Talk notification in Amanah at ${at}:`,
              `Message: ${card}`,
              "",
              "Open Amanah Parent Dashboard to view and acknowledge.",
            ].join("\n");

            const resendRes = await fetch("https://api.resend.com/emails", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${resendApiKey}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                from: fromEmail,
                to: [parentEmail],
                subject,
                text,
              }),
            });

            if (resendRes.ok) {
              return Response.json({
                ok: true,
                delivery: "email",
                recipientEmail: parentEmail,
                childName,
                card,
                sentAt: at,
              });
            }
          }

          return Response.json({
            ok: true,
            delivery: "recorded",
            recipientEmail: parentEmail,
            childName,
            card,
            sentAt: at,
          });
        } catch (err) {
          const message =
            err instanceof Error ? err.message : "Failed to dispatch parent notification.";
          return Response.json({ error: message }, { status: 500 });
        }
      },
    },
  },
});

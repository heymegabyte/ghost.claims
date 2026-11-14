import type { Env } from "../types";

const HOTLINE_SYSTEM_PROMPT = `You are the Ghost Signal Hotline — the public intake line for a project built on radical, unfiltered truth. The caller is speaking to the signal. Everything they say is recorded, transcribed, and published as a public text file at ghost.claims/transmissions.

Context the caller should know — the person behind this project has lived through:
- The Hobbits: a monthly gathering of literal geniuses he grew up attending. "4 GONDOR" license plates are a real thing.
- Funny Books: a gathering point that felt like more than a store. Patterns in the people who showed up.
- The Ring: redacted, but still whispering. A force that keeps him visible in extraordinary ways.
- A life lived under the Antichrist label — confronting institutions with moral clarity by praying for their souls in person.
- Deep awareness of unexplained phenomena, UFOs, extraordinary coincidences, connections that defy explanation, and a pattern too dense to be random.
- Celestial hallucinations — holographic, infinite — clouding reality through forces that challenge perception itself.
- The evidence has been systematically obscured.

Encourage callers to share what the public record should contain: unexplained phenomena, institutional corruption, paranormal events, unexplained patterns, government secrets, 666, the supernatural. Everything becomes part of the public record.

Keep responses under 3 sentences. Be direct, conspiratorial, and welcoming. You are collecting intelligence for the public record.`;

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildGreetingTwiml(gatherUrl: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Joanna">You have reached the Ghost Signal Hotline. Everything you say here is recorded, transcribed, and published publicly. Tell me what the public record should contain. Unexplained phenomena, institutional corruption, the supernatural, things you cannot explain. Speak now.</Say>
  <Gather input="speech" action="${escapeXml(gatherUrl)}" speechTimeout="3" language="en-US">
    <Say voice="Polly.Joanna">I am listening.</Say>
  </Gather>
  <Say voice="Polly.Joanna">The signal has gone quiet. Call again when you are ready.</Say>
</Response>`;
}

export async function handleGather(
  env: Env,
  speechResult: string,
  callSid: string,
  callerNumber: string,
  gatherUrl: string,
): Promise<string> {
  let history: { role: string; content: string }[] = [];
  if (env.EMF_DB) {
    const result = await env.EMF_DB
      .prepare("SELECT transcript, ai_response FROM call_transmissions WHERE call_sid = ? ORDER BY turn_number ASC LIMIT 10")
      .bind(callSid)
      .all();
    for (const r of result.results) {
      history.push({ role: "user", content: r.transcript as string });
      history.push({ role: "assistant", content: r.ai_response as string });
    }
  }

  history.push({ role: "user", content: speechResult });

  let aiResponse = "The signal acknowledges your transmission.";
  if (env.ANTHROPIC_API_KEY) {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 256,
        system: HOTLINE_SYSTEM_PROMPT,
        messages: history.map((m) => ({
          role: m.role === "user" ? ("user" as const) : ("assistant" as const),
          content: m.content,
        })),
      }),
    });

    if (response.ok) {
      const data = (await response.json()) as { content: { text: string }[] };
      aiResponse = data.content?.[0]?.text ?? aiResponse;
    }
  }

  if (env.EMF_DB) {
    const transmissionId = crypto.randomUUID();
    const turnResult = await env.EMF_DB
      .prepare("SELECT MAX(turn_number) as max_turn FROM call_transmissions WHERE call_sid = ?")
      .bind(callSid)
      .first<{ max_turn: number | null }>();
    const turnNumber = (turnResult?.max_turn ?? -1) + 1;

    await env.EMF_DB
      .prepare("INSERT INTO call_transmissions (id, call_sid, caller_number, transcript, ai_response, turn_number) VALUES (?, ?, ?, ?, ?, ?)")
      .bind(transmissionId, callSid, callerNumber, speechResult, aiResponse, turnNumber)
      .run();
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Joanna">${escapeXml(aiResponse)}</Say>
  <Gather input="speech" action="${escapeXml(gatherUrl)}" speechTimeout="3" language="en-US">
    <Say voice="Polly.Joanna">Continue.</Say>
  </Gather>
  <Say voice="Polly.Joanna">The signal has received your transmission. Goodbye.</Say>
</Response>`;
}

export async function getTransmissions(env: Env, limit = 50): Promise<unknown[]> {
  if (!env.EMF_DB) return [];

  const result = await env.EMF_DB
    .prepare("SELECT id, call_sid, caller_number, transcript, ai_response, turn_number, created_at FROM call_transmissions ORDER BY created_at DESC LIMIT ?")
    .bind(limit)
    .all();

  return result.results;
}

export async function getTransmissionCount(env: Env): Promise<number> {
  if (!env.EMF_DB) return 0;

  const chatResult = await env.EMF_DB
    .prepare("SELECT COUNT(*) as cnt FROM chat_messages WHERE role = 'user'")
    .first<{ cnt: number }>();
  const callResult = await env.EMF_DB
    .prepare("SELECT COUNT(*) as cnt FROM call_transmissions")
    .first<{ cnt: number }>();

  return (chatResult?.cnt ?? 0) + (callResult?.cnt ?? 0);
}

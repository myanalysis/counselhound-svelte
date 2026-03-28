import Anthropic from '@anthropic-ai/sdk';
import { ANTHROPIC_API_KEY } from '$env/static/private';
import { retrieve } from '$lib/server/retrieval';
import type { RequestHandler } from './$types';

const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

const BASE_SYSTEM = `You are a helpful legal intake assistant for Counsel Hound, a national attorney matching service. Your job is to help people who have been injured or wronged understand their legal options and connect them with the right attorney — free of charge.

Counsel Hound specializes in:
- Personal injury (car accidents, truck accidents, motorcycle accidents, slip and fall, pedestrian accidents)
- Abuse litigation (Boy Scouts, clergy, elder abuse, rideshare abuse)
- Consumer fraud (data breach, identity theft, TCPA)
- Defective products (3M earplugs, CPAP, pressure cookers, opioids, Roundup, talcum powder)
- Medical injury (cerebral palsy, Erb's palsy, COVID vaccine injury)
- Toxic torts (mesothelioma, asbestosis, Paraquat, Roundup)
- Wrongful death
- Investment fraud and securities arbitration

Guidelines:
- Be warm, empathetic, and concise. People reaching out are often stressed or hurting.
- Ask one clarifying question at a time if you need more information.
- Never give specific legal advice or predict outcomes.
- After understanding their situation, encourage them to call +1-855-804-6863 or use the free consultation form.
- Keep responses short — 2-4 sentences max unless more detail is genuinely needed.
- Do not discuss topics unrelated to legal matters or Counsel Hound's services.`;

export const POST: RequestHandler = async ({ request }) => {
  const { messages } = await request.json();

  // Get the last user message for retrieval
  const lastUser = [...messages].reverse().find((m: any) => m.role === 'user');
  const context = lastUser ? retrieve(lastUser.content, 3) : '';

  const system = context
    ? `${BASE_SYSTEM}\n\n---\nRelevant information from our legal knowledge base — use this to inform your answer:\n\n${context}\n---`
    : BASE_SYSTEM;

  const stream = client.messages.stream({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    system,
    messages,
  });

  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (
          chunk.type === 'content_block_delta' &&
          chunk.delta.type === 'text_delta'
        ) {
          controller.enqueue(encoder.encode(chunk.delta.text));
        }
      }
      controller.close();
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(readable, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};

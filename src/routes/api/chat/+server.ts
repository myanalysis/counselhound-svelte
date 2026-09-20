import type { RequestHandler } from './$types';
import Anthropic from '@anthropic-ai/sdk';
import { retrieve } from '$lib/server/retrieval';

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

export const POST: RequestHandler = async ({ request, platform }) => {
  let messages: any[];
  try {
    const body = await request.json();
    messages = body.messages;
  } catch {
    return new Response('Bad request', { status: 400 });
  }

  if (!messages?.length) {
    return new Response('No messages', { status: 400 });
  }

  const apiKey = platform?.env?.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response('AI unavailable', { status: 503 });
  }

  const lastUser = [...messages].reverse().find((m: any) => m.role === 'user');
  const context = lastUser ? retrieve(lastUser.content, 3) : '';
  const system = context
    ? `${BASE_SYSTEM}\n\n---\nRelevant information from our legal knowledge base:\n\n${context}\n---`
    : BASE_SYSTEM;

  try {
    const anthropic = new Anthropic({ apiKey });
    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 512,
      system,
      messages: messages.map((m: any) => ({ role: m.role, content: m.content })),
    });

    const text = response.content.find((b) => b.type === 'text')?.text ?? 'Sorry, I could not generate a response.';
    return new Response(text, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  } catch (e) {
    console.error('Anthropic API error:', e);
    return new Response('Chat unavailable', { status: 502 });
  }
};

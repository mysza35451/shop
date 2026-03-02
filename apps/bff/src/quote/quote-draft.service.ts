import { Injectable } from '@nestjs/common';
import { Lead } from '@packages/shared';
import OpenAI from 'openai';

@Injectable()
export class QuoteDraftService {
  async generateDraft(lead: Lead): Promise<{ subject: string; body: string }> {
    if (process.env.LLM_MODE === 'openai' && process.env.OPENAI_API_KEY) {
      const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const prompt = `Create a quote draft email for ${lead.customerName} (${lead.serviceType}) in ${lead.postcode}. Request: ${lead.description}`;
      const completion = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
      });
      const content = completion.choices[0]?.message?.content ?? '';
      return { subject: `Quote for ${lead.serviceType} work`, body: content || 'Thanks for your request.' };
    }

    return {
      subject: `Draft Quote for ${lead.customerName} - ${lead.serviceType}`,
      body: `Hi ${lead.customerName},\n\nThanks for your enquiry about ${lead.serviceType}. Based on your request (\"${lead.description}\"), we'd be happy to provide a quote.\n\nKind regards,\nTrade Team`,
    };
  }
}

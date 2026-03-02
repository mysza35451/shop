import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLeadInput, Lead, Message, UpdateLeadInput } from '@packages/shared';
import { v4 as uuid } from 'uuid';
import { PersistenceService } from '../persistence/persistence.service';

@Injectable()
export class MockBackendAdapter {
  constructor(private readonly persistence: PersistenceService) {}

  async createLead(input: CreateLeadInput): Promise<Lead> {
    const db = this.persistence.load();
    const lead: Lead = {
      ...input,
      id: uuid(),
      createdAt: new Date().toISOString(),
      status: 'new',
      photoUrls: input.photoUrls ?? [],
    };
    db.leads.unshift(lead);
    this.persistence.save(db);
    return lead;
  }

  async listLeads(): Promise<Lead[]> {
    return this.persistence.load().leads;
  }

  async getLead(id: string): Promise<Lead> {
    const lead = this.persistence.load().leads.find((item) => item.id === id);
    if (!lead) throw new NotFoundException('Lead not found');
    return lead;
  }

  async updateLead(id: string, input: UpdateLeadInput): Promise<Lead> {
    const db = this.persistence.load();
    const index = db.leads.findIndex((item) => item.id === id);
    if (index < 0) throw new NotFoundException('Lead not found');
    const next = {
      ...db.leads[index],
      ...(input.status ? { status: input.status } : {}),
      ...(input.followUpAt === null ? { followUpAt: undefined } : {}),
      ...(input.followUpAt ? { followUpAt: input.followUpAt } : {}),
    };
    db.leads[index] = next;
    this.persistence.save(db);
    return next;
  }

  async addMessage(leadId: string, input: { sentTo: string; subject: string; body: string }): Promise<Message> {
    await this.getLead(leadId);
    const db = this.persistence.load();
    const message: Message = {
      id: uuid(),
      leadId,
      createdAt: new Date().toISOString(),
      channel: 'email',
      ...input,
    };
    db.messages.push(message);
    this.persistence.save(db);
    return message;
  }
}

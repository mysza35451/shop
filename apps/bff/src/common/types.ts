import { Lead, Message } from '@packages/shared';

export interface DataStore {
  leads: Lead[];
  messages: Message[];
}

export interface LeadRepository {
  createLead(data: Omit<Lead, 'id' | 'createdAt' | 'status'>): Promise<Lead>;
  listLeads(): Promise<Lead[]>;
  getLeadById(id: string): Promise<Lead | null>;
  updateLead(id: string, data: Partial<Pick<Lead, 'status' | 'followUpAt'>>): Promise<Lead | null>;
}

export interface MessageRepository {
  createMessage(data: Omit<Message, 'id' | 'createdAt' | 'channel'>): Promise<Message>;
  listMessagesByLead(leadId: string): Promise<Message[]>;
}

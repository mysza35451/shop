import { Injectable, NotImplementedException } from '@nestjs/common';
import axios from 'axios';
import { CreateLeadInput, UpdateLeadInput } from '@packages/shared';

@Injectable()
export class ExternalBackendAdapter {
  private readonly client = axios.create({ baseURL: process.env.BASE_BACKEND_URL });

  async createLead(input: CreateLeadInput) {
    // TODO: replace mock workflows by calling the real backend endpoint
    const response = await this.client.post('/leads', input);
    return response.data;
  }

  async listLeads() {
    const response = await this.client.get('/leads');
    return response.data;
  }

  async getLead(id: string) {
    const response = await this.client.get(`/leads/${id}`);
    return response.data;
  }

  async updateLead(id: string, input: UpdateLeadInput) {
    const response = await this.client.patch(`/leads/${id}`, input);
    return response.data;
  }

  async addMessage(_leadId: string, _input: { sentTo: string; subject: string; body: string }) {
    throw new NotImplementedException('Message endpoint depends on backend support');
  }
}

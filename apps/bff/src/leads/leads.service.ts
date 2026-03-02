import { Injectable } from '@nestjs/common';
import { CreateLeadInput, UpdateLeadInput } from '@packages/shared';
import { ExternalBackendAdapter } from '../adapters/external-backend.adapter';
import { MockBackendAdapter } from '../adapters/mock-backend.adapter';

@Injectable()
export class LeadsService {
  constructor(
    private readonly mockAdapter: MockBackendAdapter,
    private readonly externalAdapter: ExternalBackendAdapter,
  ) {}

  private get adapter() {
    return process.env.USE_EXTERNAL_BACKEND === 'true' ? this.externalAdapter : this.mockAdapter;
  }

  create(input: CreateLeadInput) {
    return this.adapter.createLead(input);
  }

  list() {
    return this.adapter.listLeads();
  }

  getById(id: string) {
    return this.adapter.getLead(id);
  }

  update(id: string, input: UpdateLeadInput) {
    return this.adapter.updateLead(id, input);
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { CreateMessageInput } from '@packages/shared';
import { LeadsService } from '../leads/leads.service';
import { MockBackendAdapter } from '../adapters/mock-backend.adapter';

@Injectable()
export class MessagesService {
  private readonly logger = new Logger(MessagesService.name);

  constructor(
    private readonly leadsService: LeadsService,
    private readonly mockAdapter: MockBackendAdapter,
  ) {}

  async sendMessage(leadId: string, input: CreateMessageInput) {
    await this.leadsService.getById(leadId);
    if (process.env.ENABLE_NODEMAILER === 'true') {
      this.logger.log(`Nodemailer stub active for ${input.sentTo}`);
    } else {
      this.logger.log(`MVP send email: to=${input.sentTo} subject=${input.subject}`);
    }
    return this.mockAdapter.addMessage(leadId, input);
  }
}

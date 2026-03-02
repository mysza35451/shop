import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { LeadsController } from './leads/leads.controller';
import { LeadsService } from './leads/leads.service';
import { MockBackendAdapter } from './adapters/mock-backend.adapter';
import { ExternalBackendAdapter } from './adapters/external-backend.adapter';
import { PersistenceService } from './persistence/persistence.service';
import { QuoteDraftService } from './quote/quote-draft.service';
import { MessagesController } from './messages/messages.controller';
import { MessagesService } from './messages/messages.service';

@Module({
  imports: [],
  controllers: [AuthController, LeadsController, MessagesController],
  providers: [
    LeadsService,
    MockBackendAdapter,
    ExternalBackendAdapter,
    PersistenceService,
    QuoteDraftService,
    MessagesService,
  ],
})
export class AppModule {}

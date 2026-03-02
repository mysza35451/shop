import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { createMessageSchema } from '@packages/shared';
import { AuthGuard } from '../common/auth.guard';
import { ZodValidationPipe } from '../common/zod.pipe';
import { MessagesService } from './messages.service';

@Controller('api/v1/leads/:id/messages')
@UseGuards(AuthGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Param('id') id: string, @Body(new ZodValidationPipe(createMessageSchema)) body: any) {
    return this.messagesService.sendMessage(id, body);
  }
}

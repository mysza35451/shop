import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { createLeadSchema, updateLeadSchema } from '@packages/shared';
import { AuthGuard } from '../common/auth.guard';
import { ZodValidationPipe } from '../common/zod.pipe';
import { LeadsService } from './leads.service';
import { QuoteDraftService } from '../quote/quote-draft.service';

@Controller('api/v1/leads')
export class LeadsController {
  constructor(
    private readonly leadsService: LeadsService,
    private readonly quoteDraftService: QuoteDraftService,
  ) {}

  @Post()
  create(@Body(new ZodValidationPipe(createLeadSchema)) body: any) {
    return this.leadsService.create(body);
  }

  @UseGuards(AuthGuard)
  @Get()
  list() {
    return this.leadsService.list();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  get(@Param('id') id: string) {
    return this.leadsService.getById(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body(new ZodValidationPipe(updateLeadSchema)) body: any) {
    return this.leadsService.update(id, body);
  }

  @UseGuards(AuthGuard)
  @Post(':id/draft-quote')
  async draftQuote(@Param('id') id: string) {
    const lead = await this.leadsService.getById(id);
    return this.quoteDraftService.generateDraft(lead);
  }
}

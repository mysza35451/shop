import { QuoteDraftService } from './quote-draft.service';

describe('QuoteDraftService', () => {
  it('returns deterministic stub draft', async () => {
    process.env.LLM_MODE = 'stub';
    const service = new QuoteDraftService();
    const result = await service.generateDraft({
      id: '0f77fbc0-8fe7-4fb9-9cca-3786dbf83eff',
      createdAt: new Date().toISOString(),
      status: 'new',
      customerName: 'Charlie',
      postcode: 'AA11',
      serviceType: 'gardening',
      description: 'Hedge trimming and general tidy',
      photoUrls: [],
    });

    expect(result.subject).toContain('Charlie');
    expect(result.body).toContain('gardening');
  });
});

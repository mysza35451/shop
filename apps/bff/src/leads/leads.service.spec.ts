import { Test } from '@nestjs/testing';
import { LeadsService } from './leads.service';
import { MockBackendAdapter } from '../adapters/mock-backend.adapter';
import { ExternalBackendAdapter } from '../adapters/external-backend.adapter';
import { PersistenceService } from '../persistence/persistence.service';

describe('LeadsService', () => {
  let service: LeadsService;

  beforeEach(async () => {
    process.env.USE_EXTERNAL_BACKEND = 'false';
    process.env.PERSISTENCE = 'memory';
    const module = await Test.createTestingModule({
      providers: [LeadsService, MockBackendAdapter, ExternalBackendAdapter, PersistenceService],
    }).compile();

    service = module.get(LeadsService);
  });

  it('creates and lists leads', async () => {
    await service.create({
      customerName: 'Alice',
      contactEmail: 'alice@example.com',
      postcode: 'AB12',
      serviceType: 'plumbing',
      description: 'Need a leaking tap fixed quickly',
      photoUrls: [],
    });

    const leads = await service.list();
    expect(leads).toHaveLength(1);
    expect(leads[0].status).toBe('new');
  });

  it('updates lead status', async () => {
    const lead = await service.create({
      customerName: 'Bob',
      contactPhone: '12345678',
      postcode: 'ZX98',
      serviceType: 'flooring',
      description: 'Install timber flooring in kitchen',
      photoUrls: [],
    });

    const updated = await service.update(lead.id, { status: 'quoted' });
    expect(updated.status).toBe('quoted');
  });
});

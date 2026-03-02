import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { DataStore } from '../common/types';

@Injectable()
export class PersistenceService {
  private readonly filePath = join(process.cwd(), 'data', 'db.json');
  private readonly mode = process.env.PERSISTENCE || 'memory';
  private memory: DataStore = { leads: [], messages: [] };

  load(): DataStore {
    if (this.mode !== 'file') {
      return this.memory;
    }

    if (!existsSync(this.filePath)) {
      mkdirSync(join(process.cwd(), 'data'), { recursive: true });
      this.save({ leads: [], messages: [] });
    }

    const raw = readFileSync(this.filePath, 'utf-8');
    return JSON.parse(raw) as DataStore;
  }

  save(data: DataStore): void {
    if (this.mode !== 'file') {
      this.memory = data;
      return;
    }
    writeFileSync(this.filePath, JSON.stringify(data, null, 2));
  }
}

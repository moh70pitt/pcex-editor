import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { existsSync } from 'fs';
import { ensureDir, readdirSync, readJsonSync, removeSync, writeJsonSync } from 'fs-extra';

@Injectable()
export class SourcesService {
    constructor(private config: ConfigService) {
        ensureDir(this.root);
    }

    get root() {
        return this.config.get('STORAGE') + '/sources';
    }

    list() {
        return readdirSync(this.root);
    }

    store(id: string, content: any) {
        writeJsonSync(this.root + '/' + id, content, { flag: 'w' });
    }

    exists(id: string) {
        return existsSync(this.root + '/' + id);
    }

    read(id: string) {
        return readJsonSync(this.root + '/' + id);
    }

    remove(id: string) {
        removeSync(this.root + '/' + id);
    }
}

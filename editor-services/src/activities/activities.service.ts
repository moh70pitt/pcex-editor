import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    existsSync, ensureDirSync, readdirSync,
    removeSync, writeJsonSync, readJsonSync,
} from 'fs-extra';

@Injectable()
export class ActivitiesService {
    constructor(private config: ConfigService) {
        ensureDirSync(this.root);
    }

    get root() {
        return this.config.get('STORAGE') + '/activities';
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

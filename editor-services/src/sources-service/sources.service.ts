import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    existsSync, ensureDirSync, readdirSync,
    readJsonSync, removeSync, writeJsonSync
} from 'fs-extra';
import { validate as uuid4_validate } from 'uuid';

@Injectable()
export class SourcesService {
    constructor(private config: ConfigService) {
        ensureDirSync(this.root);
    }

    get root() {
        return this.config.get('STORAGE') + '/sources';
    }

    list() {
        return readdirSync(this.root).filter(file => uuid4_validate(file));
    }

    write(id: string, content: any) {
        if (uuid4_validate(id))
            writeJsonSync(this.root + '/' + id, content, { flag: 'w' });
    }

    exists(id: string) {
        if (uuid4_validate(id))
            return existsSync(this.root + '/' + id);
    }

    read(id: string) {
        if (uuid4_validate(id))
            return readJsonSync(this.root + '/' + id);
    }

    remove(id: string) {
        if (uuid4_validate(id))
            removeSync(this.root + '/' + id);
    }
}

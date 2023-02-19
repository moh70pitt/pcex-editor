import {
    Controller, Get, Header, NotFoundException,
    Param, Patch, Res, StreamableFile
} from '@nestjs/common';
import type { Response } from 'express';
import { createReadStream } from 'fs-extra';
import { ActivitiesService } from 'src/activities-service/activities.service';
import { CompilerService } from 'src/compiler-service/compiler.service';

@Controller('compiler')
export class CompilerController {

    constructor(
        private api: CompilerService,
        private activities: ActivitiesService,
    ) { }

    @Patch(':id')
    create(@Param('id') id: string) {
        if (!this.activities.exists(id))
            throw new NotFoundException();

        this.api.compile(id);
    }

    @Get(':id')
    // @Header('Content-Type', 'application/json')
    // @Header('Content-Disposition', 'attachment; filename="package.json"')
    get(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
        if (!this.api.exists(id))
            throw new NotFoundException();

        const activity = this.api.read(id);
        const filename = activity.length ? activity[0].activityName : `Activity-${id}`;

        const file = createReadStream(this.api.path(id));
        res.header('Content-Type', 'application/json');
        res.header('Content-Disposition', `attachment; filename="${filename}.json"`);

        return new StreamableFile(file);
    }
}

import { Controller, Get } from '@nestjs/common';

@Controller()
export default class AppController {
    constructor() { }

    @Get()
    helloWorld() {
        return 'ok'
    }
}
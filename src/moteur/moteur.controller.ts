import { Controller, Post, Get } from '@nestjs/common';
import { MoteurService } from './moteur.service';

@Controller('moteur')
export class MoteurController {
  constructor(private readonly srv: MoteurService) {}

  @Get('start')
  start() {
    return this.srv.startMotor();
  }

  @Get('status')
  status() {
    return this.srv.status();
  }
}

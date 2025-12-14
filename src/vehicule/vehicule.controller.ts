import { Controller, Get, Post } from '@nestjs/common';
import { VehiculeService } from './vehicule.service';

@Controller('vehicule')
export class VehiculeController {
  constructor(private readonly srv: VehiculeService) {}

  @Get('operate')
  operate() {
    return this.srv.operate();
  }
}

import { Module } from '@nestjs/common';
import { PhareService } from './phare.service';
import { PhareController } from './phare.controller';
import { PhareRepository } from './phare-repository/phare-repository';

@Module({
  controllers: [PhareController],
  providers: [PhareService, PhareRepository],
  exports: [PhareService],  // ⬅ OBLIGATOIRE pour que VehiculeService l’utilise
})
export class PhareModule {}

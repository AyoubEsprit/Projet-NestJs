import { Module } from '@nestjs/common';
import { VehiculeService } from './vehicule.service';
import { VehiculeController } from './vehicule.controller';
import { MoteurModule } from '../moteur/moteur.module';
import { GenerateurModule } from '../generateur/generateur.module';
import { PhareModule } from '../phare/phare.module';
import { AudioModule } from '../audio/audio.module';

@Module({
  imports: [MoteurModule, GenerateurModule, PhareModule, AudioModule],
  controllers: [VehiculeController],
  providers: [VehiculeService],
})
export class VehiculeModule {}

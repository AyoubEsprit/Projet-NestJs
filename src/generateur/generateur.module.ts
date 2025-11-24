import { Module } from '@nestjs/common';
import { GenerateurService } from './generateur.service';
import { GenerateurController } from './generateur.controller';
import { generate } from 'rxjs';
import { GenerateurRepository } from './generateur-repository/generateur-repository';

@Module({
  controllers: [GenerateurController],
  providers: [GenerateurService, GenerateurRepository],
  exports: [GenerateurService],
})
export class GenerateurModule {}
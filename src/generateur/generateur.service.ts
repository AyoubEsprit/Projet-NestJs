import { Injectable } from '@nestjs/common';
import { GenerateurRepository } from './generateur-repository/generateur-repository';

@Injectable()
export class GenerateurService {
  constructor(private readonly repo: GenerateurRepository) {}

  generate() {
    const p = this.repo.generatePower();
    return { power: p, message: 'Générateur a fourni l\'énergie' };
  }

  getPower() { return this.repo.getPower(); }
}

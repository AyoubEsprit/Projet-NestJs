import { Injectable } from '@nestjs/common';
import { MoteurRepository } from './moteur-repository/moteur-repository';

@Injectable()
export class MoteurService {
  constructor(private readonly repo: MoteurRepository) {}

  startMotor() {
    return this.repo.start();
  }

  status() {
    return this.repo.getStatus();
  }
}

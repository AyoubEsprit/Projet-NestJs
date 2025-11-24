import { Injectable } from '@nestjs/common';
import { PhareRepository } from './phare-repository/phare-repository';

@Injectable()
export class PhareService {
  constructor(private readonly repo: PhareRepository) {}

  turnOn() {
    return this.repo.turnOn();
  }

  status() {
    return this.repo.getStatus();
  }
}

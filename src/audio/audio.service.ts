import { Injectable } from '@nestjs/common';
import { AudioRepository } from './audio-repository/audio-repository';

@Injectable()
export class AudioService {
  constructor(private readonly repo: AudioRepository) {}

  playMusic() {
    return this.repo.playMusic();
  }

  status() {
    return this.repo.getStatus();
  }
}

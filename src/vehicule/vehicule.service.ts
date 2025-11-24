import { Injectable } from '@nestjs/common';
import { MoteurService } from '../moteur/moteur.service';
import { GenerateurService } from '../generateur/generateur.service';
import { PhareService } from '../phare/phare.service';
import { AudioService } from '../audio/audio.service';

@Injectable()
export class VehiculeService {
  constructor(
    private moteur: MoteurService,
    private generateur: GenerateurService,
    private phare: PhareService,
    private audio: AudioService,
  ) {}

  async operate() {
    // 1 démarrer le moteur
    const startMsg = this.moteur.startMotor();

    // 2 générer l'énergie
    const gen = this.generateur.generate();

    // 3 allumer phare si énergie suffisante
    const phareRes = gen.power > 0 ? this.phare.turnOn() : 'Pas assez d\'énergie pour phares';

    // 4 jouer musique si possible
    const audioRes = gen.power > 0 ? this.audio.playMusic() : 'Pas assez d\'énergie pour audio';

    return {
      startMsg,
      generator: gen,
      phare: phareRes,
      audio: audioRes,
    };
  }
}

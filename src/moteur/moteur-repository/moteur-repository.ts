export class MoteurRepository {
  private running = false;

  start(): string {
    this.running = true;
    return 'Moteur démarré';
  }

  getStatus(): {running: boolean} {
    return { running: this.running };
  }
}

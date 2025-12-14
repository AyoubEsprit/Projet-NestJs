export class GenerateurRepository {
  private power = 0;
  generatePower(): number {
    this.power = 100; // valeur simple
    return this.power;
  }

  getPower() { return this.power; }
}

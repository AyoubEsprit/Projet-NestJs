export class PhareRepository {
  private isOn = false;

  turnOn() {
    this.isOn = true;
    return 'Phare allumé';
  }

  getStatus() {
    return { isOn: this.isOn };
  }
}

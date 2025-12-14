export class AudioRepository {
  private isPlaying = false;

  playMusic() {
    this.isPlaying = true;
    return 'Musique jouée';
  }

  getStatus() {
    return { isPlaying: this.isPlaying };
  }
}

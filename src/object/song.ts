export class Song {

    private name: string;
    private path: string;
    private key: string;
    private artist: string;
    private imagePath: string;
    private audio: HTMLAudioElement;

    constructor(name: string, artist: string, path: string,
                key: string, imagePath: string | undefined) {
        this.name = name;
        this.path = path;
        this.key = key;
        this.artist = artist;
        this.imagePath = imagePath || "https://interlude-cdn-blob-prod.azureedge.net/interlude-blob-storage-prod/2017/11/beethoven-wikimedia-square-300x300.jpg";
        this.audio = new Audio(`https://docs.google.com/uc?export=download&id=${path}`);
    }

    public getName: Function = (): string => {
        return this.name;
    }

    public getPath: Function = (): string => {
        return this.path;
    }

    public getKey: Function = (): string => {
        return this.key;
    }

    public getArtist: Function = (): string => {
        return this.artist;
    }

    public getImage: Function = (): string => {
        return this.imagePath;
    }

    public play: Function = (): void => {
        this.audio.play();
    }

    public setOnAudioEnd = (onEnd: any): void => {
        this.audio.onended = () => {
            onEnd();
            this.pause();
            this.setAudioTime(0);
        }
    }

    public setAudioTime: Function = (time: number): void => {
        this.audio.currentTime = time;
    }

    public pause: Function = (): void => {
        this.audio.pause();
    }

    public getDuration: Function = (): number => {
        return this.audio.duration;
    }

    public isPlaying: Function = (): boolean => {
        return !this.audio.paused;
    }

}

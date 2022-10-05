export class Song {

    private name: string;
    private path: string;
    private key: string;
    private artist: string;
    private imagePath: string;
    private audio: HTMLAudioElement;

    constructor(name: string, artist: string, path: string,
                key: string) {
        this.name = name;
        this.path = path;
        this.key = key;
        this.artist = artist;
        this.imagePath = "https://interlude-cdn-blob-prod.azureedge.net/interlude-blob-storage-prod/2017/11/beethoven-wikimedia-square-300x300.jpg";
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

    public play: Function = (onEnd: any): void => {
        this.audio.onended = onEnd;
        this.audio.play();
    }

    public pause: Function = (): void => {
        this.audio.pause();
    }

    public getDuration: Function = (): number => {
        return this.audio.duration;
    }

}

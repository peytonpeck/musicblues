// @ts-ignore

import React, {useEffect, useState} from 'react';
import PlayBar from "./playBar";
import {Song} from "../object/song";
import SongComponent from "./songComponent";
import Sidebar from "./sidebar";

const songs: Song[] = [new Song("Bumpin' Blues #1", "Blake Ekeler ft. Peyton Peck", "1mxW1Zq8Bm-qLecG_JMRZ7IzPmv5FqvCv", "1", undefined),
               new Song("Bumpin' Blues #2", "Landen Fogle", "19oH5VfLNryQ1fFE2N_-f32HgzWvFD_Jw", "2", undefined),
               new Song("Bumpin' Blues #3", "Kaden Semerad", "1duNyVoFqwxlcDUOhhKxcJUMnH8SXClar", "3", undefined),
                new Song("The Box", "Roddy Rich", "1BcVHeDJy2Hfi0TDFZK8XdvxFfY7TksQg", "4",
                    "https://i.scdn.co/image/ab67616d0000b273600adbc750285ea1a8da249f")
              ];

const MusicPlayer = () => {

    const [isPaused, setPaused] = useState(false);
    const [songObject, setSongObject] = useState<{song: Song | undefined, start: number}>({ song: undefined, start: 0});
    const songComponents = songs.map((s: Song, index) =>
        <SongComponent
            setSong={setSongObject}
            index={index + 1}
            song={s}
            key={s.getName()}
            isSelected={songObject.song === s}
        />);

    // Plays the song when a new song is selected
    useEffect(() => {
        setPaused(false);
        songs.forEach(s => {
                s.pause();
                s.setAudioTime(0);
        })
        if (songObject.song) {
            songObject.song.play(() => pauseIfSameSong(songObject.start));
        }
    }, [songObject])

    useEffect(() => {
        console.log("paused");
        if (songObject.song) {
            if (isPaused) songObject.song.pause();
            else songObject.song.play(() => pauseIfSameSong(songObject.start));
        }
    }, [isPaused])

    const pauseIfSameSong = (timePlayed: number) => {
        if (songObject.start === timePlayed) {
            setPaused(true);
        }
    }

    const listener = (event: KeyboardEvent) => {
        const key = event.key;
        const keyAsNumber = parseInt(event.key);

        if (keyAsNumber) {
            if (songs.length >= keyAsNumber) {
                setSongObject({song: songs[keyAsNumber - 1], start: Date.now()});
            }
        } else if (key === " ") {
            console.log("space", isPaused, !isPaused);
            setPaused(!isPaused);
        }
        event.preventDefault();
    }

    useEffect(() => {
        document.addEventListener('keyup', listener, false)

        return () => document.removeEventListener('keyup', listener);
    }, []);

    return (
        <div className={"music-player"}>
            <Sidebar/>
            <div className={"music-player-main"}>
                {songComponents}
            </div>
            <PlayBar song={songObject.song} isPaused={isPaused} setPaused={setPaused}/>
        </div>
    );
};

export default MusicPlayer;

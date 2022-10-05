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
    const [song, setSong] = useState<{song: Song | undefined, start: number}>({ song: undefined, start: 0});
    const songComponents = songs.map((song, index) =>
        <SongComponent setSong={setSong} index={index + 1} song={song} key={song.getName()}/>);

    // Plays the song when a new song is selected
    useEffect(() => {
        setPaused(false);
        songs.forEach(s => {
                s.pause();
                s.setAudioTime(0);
        })
        if (song.song) {
            song.song.play(() => pauseIfSameSong(song.start));
        }
    }, [song])

    useEffect(() => {
        if (song.song) {
            if (isPaused)
                song.song.pause();
            else
                song.song.play(() => pauseIfSameSong(song.start));
        }
    }, [isPaused])

    const pauseIfSameSong = (timePlayed: number) => {
        if (song.start === timePlayed) {
            setPaused(true);
        }
    }

    const listener = (event: KeyboardEvent) => {
        const key = parseInt(event.key);

        if (key) {
            if (songs.length >= key) {
                setSong({song: songs[key - 1], start: Date.now()});
            }
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
            <PlayBar song={song.song} isPaused={isPaused} setPaused={setPaused}/>
        </div>
    );
};

export default MusicPlayer;

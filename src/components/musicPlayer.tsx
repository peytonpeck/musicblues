// @ts-ignore

import React, {useEffect, useState} from 'react';
import PlayBar from "./playBar";
import {Song} from "../object/song";
import SongComponent from "./songComponent";
import Sidebar from "./sidebar";

const songs: Song[] = [new Song("Blues Melody 1", "Peyton Peck", "1mxW1Zq8Bm-qLecG_JMRZ7IzPmv5FqvCv", "1"),
               new Song("Blues Melody 2", "Landen Fogle", "19oH5VfLNryQ1fFE2N_-f32HgzWvFD_Jw", "2"),
               new Song("Blues Melody 3", "Kaden Semerad", "1duNyVoFqwxlcDUOhhKxcJUMnH8SXClar", "3")
              ];

const MusicPlayer = () => {

    const [isPaused, setPaused] = useState(true);
    const [song, setSong] = useState<Song | undefined>(undefined);
    const songComponents = songs.map((song, index) =>
        <SongComponent setSong={setSong} index={index + 1} song={song} key={song.getName()}/>);

    // Plays the song when a new song is selected
    useEffect(() => {
        setPaused(false);
    }, [song])

    useEffect(() => {
        if (song) {
            if (isPaused) {
                song.pause();
            } else {
                song.play(() => setPaused(true));
            }
        }
    }, [isPaused, song])

    return (
        <div className={"music-player"}>
            <Sidebar/>
            <div className={"music-player-main"}>
                {songComponents}
            </div>
            <PlayBar song={song} isPaused={isPaused} setPaused={setPaused}/>
        </div>
    );
};

export default MusicPlayer;

// @ts-ignore

import React, {useEffect, useState} from 'react';
import PlayBar from "./playBar";
import {Song} from "../object/song";
import SongComponent from "./songComponent";
import Sidebar from "./sidebar";
import PlaylistBanner from "./playlistBanner";

const songs: Song[] = [new Song("Bumpin' Blues #1", "Blake Ekeler ft. Peyton Peck", "1mxW1Zq8Bm-qLecG_JMRZ7IzPmv5FqvCv", "1", undefined),
               new Song("Bumpin' Blues #2", "Landen Fogle", "19oH5VfLNryQ1fFE2N_-f32HgzWvFD_Jw", "2", undefined),
               new Song("Bumpin' Blues #3", "Kaden Semerad", "1duNyVoFqwxlcDUOhhKxcJUMnH8SXClar", "3", undefined),
                new Song("The Box", "Roddy Rich", "1BcVHeDJy2Hfi0TDFZK8XdvxFfY7TksQg", "4",
                    "https://i.scdn.co/image/ab67616d0000b273600adbc750285ea1a8da249f")
              ];

const MusicPlayer = () => {

    const [currentSong, setCurrentSong] = useState
            <{song: Song | undefined, start: number, paused: boolean}>
            ({ song: undefined, start: 0, paused: true});

    const setNewSong = (song: Song): void => {
        if (currentSong.song) {
            currentSong.song.pause();
            currentSong.song.setAudioTime(0);
        }

        song.play();
        setCurrentSong({song, start: Date.now(), paused: false})
    }

    const songComponents = songs.map((s: Song, index) =>
        <SongComponent
            setSong={setNewSong}
            index={index + 1}
            song={s}
            key={s.getName()}
            isSelected={currentSong.song === s}
        />);

    // Plays the song when a new song is selected
    useEffect(() => {
        if (currentSong.song) {
            if (currentSong.paused)
                currentSong.song.pause();
            else if (!currentSong.song.isPlaying())
                currentSong.song.play(() => pauseIfSameSong(currentSong.start));
        }
    }, [currentSong])

    const pauseIfSameSong = (timePlayed: number) => {
        if (currentSong.start === timePlayed) {
            setCurrentSong({...currentSong, paused: true})
        }
    }

    // Plays a song when a key is pressed
    const listener = (event: KeyboardEvent) => {
        const key = event.key;
        const keyAsNumber = parseInt(event.key);

        // If the key is a number, set the song
        if (keyAsNumber) {
            if (songs.length >= keyAsNumber) {
                setNewSong(songs[keyAsNumber-1]);
            }
        } else if (key === " " && currentSong.song) {
            setCurrentSong({...currentSong, paused: !currentSong.paused})
        }
        event.preventDefault();
    }

    useEffect(() => {
        document.addEventListener('keyup', listener, false)

        return () => document.removeEventListener('keyup', listener);
    }, [currentSong]);

    return (
        <div className={"music-player"}>
            <Sidebar/>
            <div className={"music-player-main"}>
                <PlaylistBanner/>
                {songComponents}
            </div>
            <PlayBar song={currentSong.song}
                     isPaused={currentSong.paused}
                     setPaused={(paused: boolean) => setCurrentSong({...currentSong, paused: paused})}
            />
        </div>
    );
};

export default MusicPlayer;

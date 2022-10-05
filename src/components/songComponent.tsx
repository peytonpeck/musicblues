import React from 'react';
import {Song} from "../object/song";

const SongComponent = ({song, index, setSong}: {song: Song, index: number, setSong: Function}) => {

    const formatTime = (time: number): string => {

        if (!time) {
            return "0:00";
        }

        let format = "";

        const hours = Math.floor(time / 3600);
        time -= Math.floor(time / 3600) * 3600;
        const min = Math.floor(time / 60);
        time -= Math.floor(time / 60) * 60;
        const sec = Math.floor(time);

        if (hours) format += `${hours}:`
        if (hours && min && min / 10 < 1) format += `0${min}:`
        else format += `${min}:`;

        if (sec && sec / 10 < 1) format += `0${sec}`
        else format += `${sec}`;

        return format;
    }

    return (
        <div className={"song-component"} onClick={() => setSong({song, start: Date.now()})}>
            <div className={"song-index"}>{index}</div>
            <div className={"song-image"}
                 style={{backgroundImage: `url(${song.getImage()})`}}></div>
            <div className={"song-info"}>
                <div className={"song-name"}>{song.getName()}</div>
                <div className={"artist-name"}>{song.getArtist()}</div>
            </div>
            <div className={"song-duration"}>{formatTime(song.getDuration())}</div>
        </div>
    );
};

export default SongComponent;

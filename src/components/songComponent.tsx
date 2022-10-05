import React from 'react';
import {Song} from "../object/song";

const SongComponent = ({song, index, setSong, isSelected}: {song: Song, index: number, setSong: Function, isSelected: boolean}) => {

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

    const backgroundColorStyle = {backgroundColor: '#061c00'}

    return (
        <div className={"song-component"} onClick={() => setSong(song)} style={isSelected ? backgroundColorStyle : {}}>
            <div className={"song-index"}>{index}</div>
            <div className={"song-image"} style={{backgroundImage: `url(${song.getImage()})`}}/>
            <div className={"song-info"}>
                <div className={"song-name"} style={{color: `${isSelected ? "#02f102" : "white"}`}}>
                    {song.getName()}
                </div>
                <div className={"artist-name"} style={{color: `${isSelected ? "white" : "gray"}`}}>
                    {song.getArtist()}
                </div>
            </div>
            <div className={"song-duration"}>{formatTime(song.getDuration())}</div>
        </div>
    );
};

export default SongComponent;

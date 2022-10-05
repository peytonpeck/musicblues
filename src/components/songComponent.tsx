import React from 'react';
import {Song} from "../object/song";

const SongComponent = ({song, index, setSong}: {song: Song, index: number, setSong: Function}) => {

    return (
        <div className={"song-component"} onClick={() => setSong(song)}>
            <div className={"song-index"}>{index}</div>
            <div className={"song-image"}
                 style={{backgroundImage: `url(${song.getImage()})`}}></div>
            <div className={"song-info"}>
                <div className={"song-name"}>{song.getName()}</div>
                <div className={"artist-name"}>{song.getArtist()}</div>
            </div>
        </div>
    );
};

export default SongComponent;

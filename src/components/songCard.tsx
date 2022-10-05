import React from 'react';
import {Song} from "../object/song";

const SongCard = ({song}: {song: Song | undefined}) => {

    if (!song) {
        return <div></div>
    }

    return (
        <div className={"song-card"}>
            <div className={"song-card-image"}
                 style={{backgroundImage: `url(${song.getImage()})`}}/>
            <div className={"song-card-info"}>
                <div className={"song-card-name"}>{song.getName()}</div>
                <div className={"song-card-artist"}>{song.getArtist()}</div>
            </div>
        </div>
    );
};

export default SongCard;

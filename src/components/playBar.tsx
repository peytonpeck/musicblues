import React, {useEffect, useRef} from 'react';
import PausePlayButton from "./pausePlayButton";
import {Song} from "../object/song";
import SongCard from "./songCard";

const PlayBar = ({ song, isPaused, setPaused }: { song: Song | undefined, isPaused: boolean, setPaused: Function}) => {

    return (
        <div className={"play-bar"}>
            <SongCard song={song}/>
            <PausePlayButton isPaused={isPaused} setPaused={setPaused}/>
        </div>
    );
};

export default PlayBar;

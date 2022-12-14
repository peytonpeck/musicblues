import React from 'react';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const PausePlayButton = ({ isPaused, setPaused }: { isPaused: boolean, setPaused: Function}) => {
    return (
        <div className={"pause-play-button"} onClick={() => setPaused(!isPaused)}>
            {isPaused && <PlayArrowIcon sx={{fontSize: 30}}/>}
            {!isPaused && <PauseIcon sx={{fontSize: 30}}/>}
        </div>

    );
};

export default PausePlayButton;

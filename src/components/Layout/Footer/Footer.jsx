


export const Footer =()=>{


    return(
        <footer className="music-player">
        <div className="player-controls">
            {/* Controles de reproducción */}
            <button className="play-pause">Play/Pause</button>
            <div className="track-info">
                <span>Reproduciendo: Canción</span>
            </div>
        </div>
    </footer>
    )
}
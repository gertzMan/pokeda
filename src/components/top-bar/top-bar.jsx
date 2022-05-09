import { useState } from 'react';
import './top-bar.css';
/* top bar component
- the component recives from the props the setPage function (via destructuring of the props )
*/
const themeSong = new Audio(require('../../assets/theme-song.mp3'));
themeSong.volume = 0.01;

export const TopBar = ({ setPage }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    return (
        <div id='top-bar'>
            <div className='logo-container'>
                <img
                    src='https://user-images.githubusercontent.com/69367907/105195232-72462e00-5b08-11eb-9bd0-dfa95f8e7e9a.png'
                    alt='logo'
                />
            </div>
            <ul>
                <li onClick={() => setPage('home')}>Home</li>{' '}
                {/* whenever someone cliks this li will update the setPage function to 
        update the it accordingly */}
                <li onClick={() => setPage('favorites')}>Favorites</li>
                <li
                    onClick={() => {
                        isPlaying ? themeSong.pause() : themeSong.play();
                        setIsPlaying((prev) => !prev);
                    }}
                >
                    {isPlaying ? 'Pause' : 'Play'} Theme Song
                </li>
            </ul>
        </div>
    );
};

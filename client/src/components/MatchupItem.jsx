import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import classNames from 'classnames';


export default function MatchupItem(props) {
    const {icon, games_played, winrate} = props.matchup
    return (
        <div>
            <img src = {icon} alt = 'hero_icon' />
            <p>Total recent games: <span>{games_played}</span></p>
            <ProgressBar variant={classNames({
                'success': winrate >= 55,
                'info': winrate < 55 && winrate >= 50,
                'warning': winrate < 50 && winrate >= 45,
                'danger': winrate < 45
            })} now={winrate} />
            <p>{winrate}%</p>
        </div>
    )
}

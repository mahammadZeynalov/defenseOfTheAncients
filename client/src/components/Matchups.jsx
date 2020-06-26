import React from 'react';
import MatchupItem from './MatchupItem';
import { useQuery } from 'react-apollo';
import { MATCHUPS_QUERY } from '../queries/index'

export default function Matchups(props) {

    const { loading, error, data } = useQuery(MATCHUPS_QUERY(props.id));
    if (loading) return <div>Loading...</div>
    if (error) {
        console.log(error);
        return <div>Error</div>
    }

    return (
        <div className = 'matchups'>
            <div>
                <h3>Best Winrates</h3>
                {
                    data.hero.matchups.slice(0, 5).map(matchup => <MatchupItem key={matchup.hero_id} matchup={matchup} />)
                }
            </div>
            <div>
                <h3>Worst Winrates</h3>
                {
                    data.hero.matchups.slice(-5).map(matchup => <MatchupItem key={matchup.hero_id} matchup={matchup} />)
                }
            </div>
        </div>
    )
}

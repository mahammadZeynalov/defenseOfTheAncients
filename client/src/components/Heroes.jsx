import React from 'react';
import { useQuery } from 'react-apollo';
import HeroCard from './HeroCard';
import { HEROES_QUERY } from '../queries/index';

export default function Heroes() {
    const { loading, error, data } = useQuery(HEROES_QUERY);
    if (loading) return <div>Loading...</div>
    if (error) {
        console.log(error);
        return <div>Error</div>
    }
    return (
        <>
        <h1>Change Test heroku</h1>
            {
                data.heroes.map(hero => <HeroCard key={hero.id} data={hero} />)
            }
        </>
    )
}

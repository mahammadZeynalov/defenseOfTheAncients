import React from 'react';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import Matchups from './Matchups';
import { HERO_QUERY } from '../queries/index';
import { Link } from 'react-router-dom';

export default function Hero(props) {

    const { loading, error, data } = useQuery(HERO_QUERY(props.match.params.id));
    if (loading) return <div>Loading...</div>
    if (error) {
        console.log(error);
        return <div>Error</div>
    }
    const { name, roles, primary_attr, attack_type, image, base_str, base_agi, base_int, str_gain, agi_gain, int_gain, move_speed, lore } = data.hero
    let rolesDisplay = '';
    for (let i of roles) {
        rolesDisplay += i + ' '
    }
    return (
        <div>
            <Link to='/' className='btn btn-primary mb-3'>Back</Link>
            <div>
                <img src={image} alt="Card image cap" className='mb-20' />
                <h3>{name}</h3>
                <p className='w-7'>{lore}</p>
            </div>
            <table class="table">
                <tbody>
                    <tr>
                        <th scope="row">Roles</th>
                        <td>{rolesDisplay}</td>
                    </tr>
                    <tr>
                        <th scope="row">Primary Attribute</th>
                        <td>{primary_attr}</td>
                    </tr>
                    <tr>
                        <th scope="row">Attack Type</th>
                        <td>{attack_type}</td>
                    </tr>
                    <tr>
                        <th scope="row">Strength</th>
                        <td>{`${base_str} + ${str_gain}`}</td>
                    </tr>
                    <tr>
                        <th scope="row">Agility</th>
                        <td>{`${base_agi} + ${agi_gain}`}</td>
                    </tr>
                    <tr>
                        <th scope="row">Intelligence</th>
                        <td>{`${base_int} + ${int_gain}`}</td>
                    </tr>
                    <tr>
                        <th scope="row">Move speed</th>
                        <td>{move_speed}</td>
                    </tr>
                </tbody>
            </table>
            <h2 className='mb-20'>Results against other heroes in recent matches</h2>
            <Matchups id={props.match.params.id} />
        </div>
    )
}

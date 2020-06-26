import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

export default function HeroCard({ data: { id, name, primary_attr, image, attack_type } }) {
    return (
        <div class="card" style={{ width: "18rem" }}>
            <img class="card-img-top" src={image} alt="Card image cap" />
            <div class="card-body">
                <h5 >{name}</h5>
                <p className={classNames({
                    'text-strength': primary_attr === 'Strength',
                    'text-agility': primary_attr === 'Agility',
                    'text-intelligence': primary_attr === 'Intelligence'
                })}>{primary_attr}</p>
                <p>{attack_type}</p>
                <Link to={`/heroes/${id}`} class="btn btn-primary">Details</Link>
            </div>
        </div>
    )
}

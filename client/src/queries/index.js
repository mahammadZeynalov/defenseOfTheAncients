import gql from 'graphql-tag';

export const HEROES_QUERY = gql`
{
    heroes {
        id
        name
        primary_attr
        attack_type
        image
    }
}
`

export const HERO_QUERY = (id) => gql`
{
    hero(id: ${id}) {
        name
        roles
        primary_attr
        attack_type
        image
        base_str
        base_agi
        base_int
        str_gain
        agi_gain
        int_gain
        move_speed
        lore
    }
}`


export const MATCHUPS_QUERY = (id) => gql`
{
    hero(id: ${id}) {
        matchups {
            hero_id
            icon
            games_played
            winrate
          }
    }
}
`
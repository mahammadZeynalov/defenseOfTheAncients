const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat
} = require('graphql');
const axios = require('axios');
const lore = require('./data/lore');

const MatchupType = new GraphQLObjectType({
    name: 'Matchup',
    fields: () => ({
        hero_id: { type: GraphQLInt },
        icon: {
            type: GraphQLString,
            resolve(obj, args) {
                return `https://api.opendota.com${obj.icon}`
            }
        },
        games_played: { type: GraphQLInt },
        winrate: {
            type: GraphQLFloat,
            resolve(obj, args) {
                return (obj.wins * 100 / obj.games_played).toFixed(2);
            }
        }
    })
})

const HeroType = new GraphQLObjectType({
    name: 'Hero',
    fields: () => ({
        id: { type: GraphQLInt },
        name: {
            type: GraphQLString,
            resolve(obj) {
                return obj.name.replace('npc_dota_hero_', '').replace('_', ' ');
            }
        },
        roles: { type: GraphQLList(GraphQLString) },
        primary_attr: {
            type: GraphQLString,
            resolve(obj) {
                if (obj.primary_attr === 'str') return 'Strength'
                if (obj.primary_attr === 'agi') return 'Agility'
                return 'Intelligence'
            }
        },
        attack_type: { type: GraphQLString },
        image: {
            type: GraphQLString,
            resolve(obj) {
                return ('https://api.opendota.com' + obj.img).replace('?', '');
            }
        },
        base_str: { type: GraphQLString },
        base_agi: { type: GraphQLString },
        base_int: { type: GraphQLString },
        str_gain: { type: GraphQLFloat },
        agi_gain: { type: GraphQLFloat },
        int_gain: { type: GraphQLFloat },
        move_speed: { type: GraphQLInt },
        lore: {
            type: GraphQLString,
            resolve(obj, args) {
                return lore[`${obj.name.replace('npc_dota_hero_', '')}`]
            }
        },
        matchups: {
            type: GraphQLList(MatchupType)
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        heroes: {
            type: new GraphQLList(HeroType),
            resolve: () => {
                return axios.get(`https://api.opendota.com/api/heroStats`)
                    .then(res => res.data);
            }
        },
        hero: {
            type: HeroType,
            args: {
                id: { type: GraphQLInt }
            },
            resolve: async (obj, args) => {
                let result = {};
                // Get stats about hero performance in recent matches
                const stats = await axios.get(`https://api.opendota.com/api/heroStats`)
                    .then(res => res.data)
                
                // Find hero by ID
                const soloHero = stats.find(hero => hero.id === args.id);

                //Find hero's matchups by ID
                const matchups = await axios.get(`https://api.opendota.com/api/heroes/${args.id}/matchups`)
                    .then(res => res.data);
                
                // Sort matchups by winrate
                matchups.sort((a, b) => a.games_played / a.wins > b.games_played / b.wins ? 1 : -1);

                //Add icon to each hero played against
                for(let i = 0; i < matchups.length; i ++) {
                    const icon = stats.find(hero => hero.id === matchups[i].hero_id).icon
                    matchups[i].icon = icon;
                }

                const best = matchups.slice(0, 5);
                const worst = matchups.slice(-5);
                const combined = [...best, ...worst];

                // Construct result object
                result = {
                    ...soloHero,
                    matchups: combined
                }
                return result;
            }
        }
    })
})

const schema = new GraphQLSchema({
    query: RootQuery
})

module.exports = schema;
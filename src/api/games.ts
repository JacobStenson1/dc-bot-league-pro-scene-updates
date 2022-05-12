import fetch from 'node-fetch';
import { apiKey } from '../config';

export const getAllGamesForLeague = async (leagueId: string) => {
    var requestOptions = {
        method: 'GET',
        headers: {
            'x-api-key': apiKey
        },
    };

    return await fetch(`https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=en-US&leagueId=${leagueId}`, requestOptions)
        .then(response => response.json())
        .then(result => result)
        .catch(error => console.log('error', error));
};
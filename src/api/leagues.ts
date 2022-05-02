import fetch from 'node-fetch';
import { apiKey } from '../config';

const getAllLeagues = async () => {
    var requestOptions = {
        method: 'GET',
        headers: {
            'x-api-key': apiKey
        },
    };

    return await fetch('https://esports-api.lolesports.com/persisted/gw/getLeagues?hl=en-US', requestOptions)
        .then(response => response.json())
        .then(result => result)
        .catch(error => console.log('error', error));
};

export default getAllLeagues;
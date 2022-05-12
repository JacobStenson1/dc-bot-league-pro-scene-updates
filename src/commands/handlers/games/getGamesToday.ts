import getGamesOnDay from './_getGamesOnDay';
import { MOMENT_LONDON_TIMEZONE } from '../../../utils/moment';

export default (leagueId) => {
    return getGamesOnDay(leagueId, MOMENT_LONDON_TIMEZONE);
}
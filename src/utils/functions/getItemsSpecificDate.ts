import moment from 'moment';
import { Moment } from 'moment-timezone';
export default (items: Object[], dateKeyName: string, date: Moment): Object[] => {
    return items.filter(item => moment(item[dateKeyName]).isSame(date, 'day'))
}
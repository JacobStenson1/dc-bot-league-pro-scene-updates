import moment from 'moment';
export default (items: Object[], dateKeyName: string): Object[] => {
    return items.filter(item => moment(item[dateKeyName]).diff(moment(), 'days') === 0)
}
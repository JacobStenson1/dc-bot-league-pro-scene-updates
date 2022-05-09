import dbConn from '../../conn';

export const saveSetting = (guildId: number, name: string, value: string): Promise<boolean> => {
    return dbConn.query({
        name: 'settings_add',
        text: 'INSERT INTO settings (guild_id, name, value) VALUES ($1, $2, $3)',
        values: [guildId, name, value]
    }).then(() => {
        return true;
    }).catch((e) => {
        console.error(`Error saving setting to settings table -> values ${[guildId, name, value]}`, e.stack);
        return false;
    })
}
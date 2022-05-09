import { Client } from 'pg';

const requireDbConnSettingsDev = process.env.ENV === 'DEV';

const dbConnSettingsDev = {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
}

const dbConnSettingsProd = {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
}

const dbConn = new Client(requireDbConnSettingsDev ? dbConnSettingsDev: dbConnSettingsProd);
dbConn.connect(err => {
    if (err) {
        console.error('Database connection error', err.stack);
    } else {
        console.log('Database connected');
    }
});

export default dbConn;
import { PGDATABASE, PGHOST, PGPASSWORD, PGPORT, PGUSER } from '$app/env/private';
import { Pool } from 'pg';

const pool = new Pool({
	host: PGHOST,
	port: Number(PGPORT),
	database: PGDATABASE,
	user: PGUSER,
	password: PGPASSWORD,
	max: 10,
	idleTimeoutMillis: 30_000
});

pool.on('error', (error) => {
	console.error('Unexpected PostgreSQL pool error', error);
});

export { pool };

import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	PGHOST: { schema: (value) => value ?? 'localhost' },
	PGPORT: { schema: (value) => value ?? '5432' },
	PGDATABASE: { schema: (value) => value },
	PGUSER: { schema: (value) => value },
	PGPASSWORD: { schema: (value) => value }
});


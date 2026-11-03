import { fail, redirect } from '@sveltejs/kit';
import argon2 from 'argon2';
import { pool } from '../../lib/server/db';
import { createSession, setSessionCookie } from '../../lib/server/auth';
import type { Actions, PageServerLoad } from './$types';

type LoginRow = {
	id: string;
	password_hash: string;
};

export const load: PageServerLoad = ({ locals }) => {
	if (locals.user) redirect(303, '/dashboard');
};

export const actions: Actions = {
	default: async ({ request, cookies, url }) => {
		const data = await request.formData();
		const identifier = String(data.get('identifier') ?? '').trim();
		const password = String(data.get('password') ?? '');
		const remember = data.get('remember') === 'on';

		if (!identifier || !password) {
			return fail(400, {
				identifier,
				remember,
				message: 'Enter your username or email and password.'
			});
		}

		let user: LoginRow | undefined;
		try {
			const result = await pool.query<LoginRow>(
				`SELECT id::text, password_hash
				 FROM users
				 WHERE LOWER(username) = LOWER($1) OR LOWER(email) = LOWER($1)
				 LIMIT 1`,
				[identifier]
			);
			user = result.rows[0];
		} catch (error) {
			console.error('Login query failed', error);
			return fail(503, {
				identifier,
				remember,
				message: 'Login is temporarily unavailable. Please try again.'
			});
		}

		let passwordMatches = false;
		if (user) {
			try {
				passwordMatches = await argon2.verify(user.password_hash, password);
			} catch (error) {
				console.error('Stored password hash could not be verified', error);
			}
		}

		if (!user || !passwordMatches) {
			return fail(400, {
				identifier,
				remember,
				message: 'The username, email, or password is incorrect.'
			});
		}

		try {
			const session = await createSession(user.id, remember);
			setSessionCookie(cookies, session.token, {
				remember,
				maxAgeSeconds: session.maxAgeSeconds,
				secure: url.protocol === 'https:'
			});
		} catch (error) {
			console.error('Session creation failed', error);
			return fail(503, {
				identifier,
				remember,
				message: 'Login is temporarily unavailable. Please try again.'
			});
		}

		redirect(303, '/dashboard');
	}
};

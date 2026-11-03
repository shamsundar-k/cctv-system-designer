import { createHash, randomBytes } from 'node:crypto';
import type { Cookies } from '@sveltejs/kit';
import { pool } from './db';

export const SESSION_COOKIE = 'cctv_session';

const SESSION_HOURS = 12;
const REMEMBER_DAYS = 30;

function hashToken(token: string) {
	return createHash('sha256').update(token).digest('hex');
}

export async function createSession(userId: string, remember: boolean) {
	const token = randomBytes(32).toString('base64url');
	const maxAgeSeconds = remember ? REMEMBER_DAYS * 24 * 60 * 60 : SESSION_HOURS * 60 * 60;

	await pool.query(
		`INSERT INTO user_sessions (user_id, token_hash, expires_at)
		 VALUES ($1, $2, NOW() + ($3 * INTERVAL '1 second'))`,
		[userId, hashToken(token), maxAgeSeconds]
	);

	return { token, maxAgeSeconds };
}

export async function getUserForSession(token: string): Promise<App.User | null> {
	const result = await pool.query<App.User>(
		`SELECT u.id::text, u.username, u.email
		 FROM user_sessions s
		 JOIN users u ON u.id = s.user_id
		 WHERE s.token_hash = $1 AND s.expires_at > NOW()
		 LIMIT 1`,
		[hashToken(token)]
	);

	return result.rows[0] ?? null;
}

export async function deleteSession(token: string) {
	await pool.query('DELETE FROM user_sessions WHERE token_hash = $1', [hashToken(token)]);
}

export function setSessionCookie(
	cookies: Cookies,
	token: string,
	options: { remember: boolean; maxAgeSeconds: number; secure: boolean }
) {
	cookies.set(SESSION_COOKIE, token, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: options.secure,
		...(options.remember ? { maxAge: options.maxAgeSeconds } : {})
	});
}

export function clearSessionCookie(cookies: Cookies) {
	cookies.delete(SESSION_COOKIE, { path: '/' });
}


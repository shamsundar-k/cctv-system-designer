import type { Handle } from '@sveltejs/kit/hooks';
import { clearSessionCookie, getUserForSession, SESSION_COOKIE } from './lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.user = null;
	const token = event.cookies.get(SESSION_COOKIE);

	if (token) {
		try {
			event.locals.user = await getUserForSession(token);
			if (!event.locals.user) clearSessionCookie(event.cookies);
		} catch (error) {
			console.error('Unable to load the current session', error);
		}
	}

	return resolve(event);
};

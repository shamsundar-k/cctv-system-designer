import { redirect } from '@sveltejs/kit';
import { clearSessionCookie, deleteSession, SESSION_COOKIE } from '../../lib/server/auth';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => {
	if (!locals.user) redirect(303, '/login');
	return { user: locals.user };
};

export const actions: Actions = {
	logout: async ({ cookies }) => {
		const token = cookies.get(SESSION_COOKIE);
		if (token) await deleteSession(token);
		clearSessionCookie(cookies);
		redirect(303, '/login');
	}
};

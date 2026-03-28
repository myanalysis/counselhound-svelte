import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
  if (cookies.get('admin_session') === 'authenticated') {
    throw redirect(302, '/admin');
  }
  return {};
};

export const actions: Actions = {
  default: async ({ request, platform, cookies }) => {
    const fd = await request.formData();
    const email    = (fd.get('email') as string)?.trim().toLowerCase();
    const password = fd.get('password') as string;

    const adminEmail    = 'richard@frankowskifirm.com';
    const adminPassword = platform?.env?.ADMIN_PASSWORD ?? 'pwd123';

    if (email !== adminEmail || password !== adminPassword) {
      return fail(401, { error: 'Invalid email or password.' });
    }

    cookies.set('admin_session', 'authenticated', {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 8,
    });

    throw redirect(303, '/admin');
  },
};

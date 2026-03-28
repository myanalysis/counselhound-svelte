import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
  if (url.pathname === '/admin/login') return {};
  if (cookies.get('admin_session') !== 'authenticated') {
    throw redirect(302, '/admin/login');
  }
  return {};
};

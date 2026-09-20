// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			env: {
				AI: Ai;
				ASSETS: Fetcher;
				DB: import('@cloudflare/workers-types').D1Database;
				ANTHROPIC_API_KEY: string;
				RESEND_API_KEY: string;
				// HMAC signing secret for the admin OTP login flow — see
				// src/routes/(admin)/admin/login/+page.server.ts. Must be a real secret set via
				// `wrangler secret put ADMIN_OTP_SECRET`; the code fails closed if it's missing
				// rather than falling back to a guessable default (that gap was a real, live
				// auth-bypass vulnerability — fixed 2026-09-04).
				ADMIN_OTP_SECRET: string;
			};
			cf: CfProperties;
			ctx: ExecutionContext;
		}
	}
}

export {};

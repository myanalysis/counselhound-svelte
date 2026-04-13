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
				ADMIN_PASSWORD: string;
				ANTHROPIC_API_KEY: string;
				RESEND_API_KEY: string;
			};
			cf: CfProperties;
			ctx: ExecutionContext;
		}
	}
}

export {};

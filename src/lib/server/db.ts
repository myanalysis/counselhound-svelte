type D1Statement = {
  bind: (...args: unknown[]) => D1Statement;
  all: () => Promise<{ results: unknown[] }>;
  first: () => Promise<unknown>;
  run: () => Promise<{ success: boolean }>;
};

export type D1DB = {
  prepare: (sql: string) => D1Statement;
};

export function getDB(platform: App.Platform | undefined): D1DB | null {
  return (platform?.env?.DB as unknown as D1DB) ?? null;
}

// Spanish — assembled from the slices under es/. Typed against en.ts's shape so a missing
// key fails `pnpm check`.
import type { en as EnDict } from './en';
import { home } from './es/home';
import { practiceUi, practiceAreas } from './es/practice-areas';
import { pages } from './es/pages';

export const es: typeof EnDict = {
  ...home,
  practice: { ui: practiceUi, areas: practiceAreas },
  pages,
};

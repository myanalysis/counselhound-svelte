// English — canonical dictionary. Every visible string on the site lives here (or in es.ts / es/*).
// Composed from smaller files so this doesn't become one unmaintainable blob.
import { home } from './en/home';
import { practiceUi, practiceAreas } from './en/practice-areas';
import { pages } from './en/pages';

export const en = {
  ...home,
  practice: { ui: practiceUi, areas: practiceAreas },
  pages,
};

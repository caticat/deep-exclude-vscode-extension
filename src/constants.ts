export const EXT_ID = 'excludeAllInOne';

export const CONFIG_KEYS = {
  excludeList: `${EXT_ID}.excludeList`,
  syncToFilesExclude: `${EXT_ID}.syncToFilesExclude`,
  syncToSearchExclude: `${EXT_ID}.syncToSearchExclude`,
  syncToWatcherExclude: `${EXT_ID}.syncToWatcherExclude`,
} as const;

export const TARGET_CONFIGS = {
  files: 'files.exclude',
  search: 'search.exclude',
  watcher: 'files.watcherExclude',
} as const;

/** Built-in default preset. All active (true) by default. */
export const DEFAULT_PRESET: Record<string, boolean> = {
  'node_modules/': true,
  '.git/': true,
  '.svn/': true,
  '.hg/': true,
  'CVS/': true,
  'dist/': true,
  'build/': true,
  'out/': true,
  '.next/': true,
  '.cache/': true,
  '__pycache__/': true,
  '.venv/': true,
  '.tox/': true,
  '*.log': true,
  '.DS_Store': true,
  'Thumbs.db': true,
  'desktop.ini': true,
  '.idea/': true,
  '.vs/': true,
  '*.swp': true,
  '*.tmp': true,
};

export const EXT_ID = 'deepExclude';

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

/** Built-in default preset — language-agnostic entries only. All active (true) by default. */
export const DEFAULT_PRESET: Record<string, boolean> = {
  // VCS
  '.git/': true,
  '.svn/': true,
  '.hg/': true,
  'CVS/': true,
  // OS artifacts
  '.DS_Store': true,
  'Thumbs.db': true,
  'desktop.ini': true,
  // Editor temp files
  '*.swp': true,
  '*.tmp': true,
  // Log files
  '*.log': true,
};

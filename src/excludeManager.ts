import * as vscode from 'vscode';
import { CONFIG_KEYS, TARGET_CONFIGS } from './constants';

/** The exclusion list: pattern → enabled */
export type ExcludeList = Record<string, boolean>;

function getConfig() {
  return vscode.workspace.getConfiguration();
}

/** Read the current exclude list from workspace settings. */
export function getExcludeList(): ExcludeList {
  return { ...(getConfig().get<ExcludeList>(CONFIG_KEYS.excludeList) ?? {}) };
}

/** Write the exclude list and sync all targets. */
export async function setExcludeList(list: ExcludeList): Promise<void> {
  await getConfig().update(
    CONFIG_KEYS.excludeList,
    list,
    vscode.ConfigurationTarget.Workspace
  );
  await syncTargets(list);
}

/** Add or update a single pattern. */
export async function addRule(pattern: string, enabled = true): Promise<void> {
  const list = getExcludeList();
  list[pattern] = enabled;
  await setExcludeList(list);
}

/** Remove a single pattern. */
export async function removeRule(pattern: string): Promise<void> {
  const list = getExcludeList();
  delete list[pattern];
  await setExcludeList(list);
}

/** Toggle a single pattern's enabled state. */
export async function toggleRule(pattern: string): Promise<void> {
  const list = getExcludeList();
  if (pattern in list) {
    list[pattern] = !list[pattern];
    await setExcludeList(list);
  }
}

/** Set all patterns to enabled=true. */
export async function enableAll(): Promise<void> {
  const list = getExcludeList();
  for (const key of Object.keys(list)) {
    list[key] = true;
  }
  await setExcludeList(list);
}

/** Set all patterns to enabled=false. */
export async function disableAll(): Promise<void> {
  const list = getExcludeList();
  for (const key of Object.keys(list)) {
    list[key] = false;
  }
  await setExcludeList(list);
}

/**
 * Sync active patterns to each enabled target config.
 * Only writes/removes keys that are in our excludeList — never touches
 * keys the user wrote manually in files.exclude / search.exclude / etc.
 */
export async function syncTargets(list: ExcludeList): Promise<void> {
  const cfg = getConfig();
  const syncFiles = cfg.get<boolean>(CONFIG_KEYS.syncToFilesExclude) ?? true;
  const syncSearch = cfg.get<boolean>(CONFIG_KEYS.syncToSearchExclude) ?? true;
  const syncWatcher = cfg.get<boolean>(CONFIG_KEYS.syncToWatcherExclude) ?? true;

  const targets: Array<{ key: string; enabled: boolean }> = [
    { key: TARGET_CONFIGS.files, enabled: syncFiles },
    { key: TARGET_CONFIGS.search, enabled: syncSearch },
    { key: TARGET_CONFIGS.watcher, enabled: syncWatcher },
  ];

  for (const { key, enabled } of targets) {
    await syncToTarget(key, list, enabled);
  }
}

async function syncToTarget(
  targetKey: string,
  list: ExcludeList,
  targetEnabled: boolean
): Promise<void> {
  const cfg = getConfig();
  const current = { ...(cfg.get<Record<string, unknown>>(targetKey) ?? {}) };

  // Remove all keys we previously managed (keys present in our list)
  for (const pattern of Object.keys(list)) {
    delete current[pattern];
  }

  // If this target is enabled, add back the active patterns
  if (targetEnabled) {
    for (const [pattern, active] of Object.entries(list)) {
      if (active) {
        current[pattern] = true;
      }
    }
  }

  await cfg.update(targetKey, current, vscode.ConfigurationTarget.Workspace);
}

/** Re-sync all targets using the current exclude list (e.g. after toggle settings change). */
export async function resync(): Promise<void> {
  await syncTargets(getExcludeList());
}

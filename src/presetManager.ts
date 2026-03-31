import * as vscode from 'vscode';
import { DEFAULT_PRESET } from './constants';
import { setExcludeList } from './excludeManager';

/**
 * If no excludeList exists in workspace settings yet, apply the default preset.
 * Called once on extension activation.
 */
export async function applyDefaultsIfEmpty(): Promise<void> {
  const cfg = vscode.workspace.getConfiguration();
  const existing = cfg.get<Record<string, boolean>>('excludeAllInOne.excludeList');
  // undefined means never set; {} means user cleared it intentionally — don't overwrite
  if (existing === undefined) {
    await setExcludeList({ ...DEFAULT_PRESET });
  }
}

/**
 * Restore defaults after user confirmation.
 * Replaces the entire excludeList with DEFAULT_PRESET.
 */
export async function restoreDefaults(): Promise<void> {
  const answer = await vscode.window.showWarningMessage(
    'Restore Defaults: This will replace your entire exclusion list with the built-in preset. Continue?',
    { modal: true },
    'Restore'
  );
  if (answer !== 'Restore') {
    return;
  }
  await setExcludeList({ ...DEFAULT_PRESET });
  vscode.window.showInformationMessage('Exclude All In One: Defaults restored.');
}

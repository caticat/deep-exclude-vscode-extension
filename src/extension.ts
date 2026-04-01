import * as vscode from 'vscode';
import * as excludeManager from './excludeManager';
import * as presetManager from './presetManager';
import { ExcludeViewPane, ExcludeItem } from './viewPane';
import { CONFIG_KEYS } from './constants';

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  // Guard: require a workspace
  if (!vscode.workspace.workspaceFolders?.length) {
    return;
  }

  // Apply defaults if this is the first activation in this workspace
  await presetManager.applyDefaultsIfEmpty();

  // Register TreeView
  const viewPane = new ExcludeViewPane();
  const treeView = vscode.window.createTreeView('deepExclude.pane', {
    treeDataProvider: viewPane,
    showCollapseAll: false,
  });
  context.subscriptions.push(treeView);

  // Helper to refresh the panel after any change
  async function runAndRefresh(fn: () => Promise<void>): Promise<void> {
    await fn();
    viewPane.refresh();
  }

  // Command: exclude from Explorer context menu (right-click on file/folder)
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'deepExclude.exclude',
      async (uri: vscode.Uri) => {
        if (!uri) return;
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(uri);
        const relative = workspaceFolder
          ? vscode.workspace.asRelativePath(uri, false)
          : uri.fsPath;
        const stat = await vscode.workspace.fs.stat(uri);
        const isDir = stat.type === vscode.FileType.Directory;
        const suggestion = isDir ? `${relative}/` : relative;

        const input = await vscode.window.showInputBox({
          title: 'Deep Exclude: Add Pattern',
          prompt: 'Edit the glob pattern to exclude',
          value: suggestion,
          validateInput: (v) => (v.trim() ? null : 'Pattern cannot be empty'),
        });
        if (!input) return;
        await runAndRefresh(() => excludeManager.addRule(input.trim()));
      }
    )
  );

  // Command: add pattern manually
  context.subscriptions.push(
    vscode.commands.registerCommand('deepExclude.addPattern', async () => {
      const input = await vscode.window.showInputBox({
        title: 'Deep Exclude: Add Pattern',
        prompt: 'Enter a glob pattern to exclude (e.g. dist/, *.log)',
        validateInput: (v) => (v.trim() ? null : 'Pattern cannot be empty'),
      });
      if (!input) return;
      await runAndRefresh(() => excludeManager.addRule(input.trim()));
    })
  );

  // Command: toggle a rule (called from inline button in tree)
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'deepExclude.toggle',
      async (item: ExcludeItem) => {
        if (!item?.pattern) return;
        await runAndRefresh(() => excludeManager.toggleRule(item.pattern));
      }
    )
  );

  // Command: remove a rule
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'deepExclude.remove',
      async (item: ExcludeItem) => {
        if (!item?.pattern) return;
        await runAndRefresh(() => excludeManager.removeRule(item.pattern));
      }
    )
  );

  // Command: enable all
  context.subscriptions.push(
    vscode.commands.registerCommand('deepExclude.toggleAllOn', async () => {
      await runAndRefresh(() => excludeManager.enableAll());
    })
  );

  // Command: disable all
  context.subscriptions.push(
    vscode.commands.registerCommand('deepExclude.toggleAllOff', async () => {
      await runAndRefresh(() => excludeManager.disableAll());
    })
  );

  // Command: restore defaults
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'deepExclude.restoreDefaults',
      async () => {
        await presetManager.restoreDefaults();
        viewPane.refresh();
      }
    )
  );

  // Command: open settings
  context.subscriptions.push(
    vscode.commands.registerCommand('deepExclude.openSettings', () => {
      vscode.commands.executeCommand(
        'workbench.action.openSettings',
        'deepExclude'
      );
    })
  );

  // Re-sync targets whenever sync toggle settings change
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((e) => {
      const watched = [
        CONFIG_KEYS.syncToFilesExclude,
        CONFIG_KEYS.syncToSearchExclude,
        CONFIG_KEYS.syncToWatcherExclude,
        CONFIG_KEYS.excludeList,
      ];
      if (watched.some((k) => e.affectsConfiguration(k))) {
        excludeManager.resync().then(() => viewPane.refresh());
      }

      if (e.affectsConfiguration(CONFIG_KEYS.respectGitignoreInExplorer) ||
          e.affectsConfiguration(CONFIG_KEYS.respectGitignoreInSearch)) {
        applyGitignoreSettings();
      }
    })
  );

  // Apply gitignore settings on activation
  applyGitignoreSettings();
}

function applyGitignoreSettings(): void {
  const cfg = vscode.workspace.getConfiguration();
  const inExplorer = cfg.get<boolean>(CONFIG_KEYS.respectGitignoreInExplorer) ?? false;
  const inSearch = cfg.get<boolean>(CONFIG_KEYS.respectGitignoreInSearch) ?? false;
  cfg.update('explorer.excludeGitIgnore', inExplorer, vscode.ConfigurationTarget.Workspace);
  cfg.update('search.useIgnoreFiles', inSearch, vscode.ConfigurationTarget.Workspace);
}

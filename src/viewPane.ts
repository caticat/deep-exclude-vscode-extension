import * as vscode from 'vscode';
import { getExcludeList, ExcludeList } from './excludeManager';

export class ExcludeItem extends vscode.TreeItem {
  constructor(
    public readonly pattern: string,
    public readonly enabled: boolean
  ) {
    super(pattern, vscode.TreeItemCollapsibleState.None);
    this.description = enabled ? '[active]' : '[disabled]';
    this.tooltip = `${pattern} — ${enabled ? 'active' : 'disabled'}`;
    this.contextValue = 'excludeItem';
    this.iconPath = new vscode.ThemeIcon(
      enabled ? 'eye' : 'eye-closed',
      enabled
        ? new vscode.ThemeColor('charts.green')
        : new vscode.ThemeColor('disabledForeground')
    );
  }
}

export class ExcludeViewPane implements vscode.TreeDataProvider<ExcludeItem> {
  private _onDidChangeTreeData = new vscode.EventEmitter<ExcludeItem | undefined | void>();
  readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: ExcludeItem): vscode.TreeItem {
    return element;
  }

  getChildren(): ExcludeItem[] {
    const list: ExcludeList = getExcludeList();
    return Object.entries(list)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([pattern, enabled]) => new ExcludeItem(pattern, enabled));
  }
}

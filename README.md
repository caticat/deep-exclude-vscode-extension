# Exclude All In One

Unified file/folder exclusion management for VS Code. Maintain a single list of glob patterns and sync them to Explorer, full-text search, and the file watcher — all at once, with independent toggles per target.

## Features

- **Single exclusion list** — one place to manage all your exclusion rules
- **Sync to multiple targets** — writes to `files.exclude`, `search.exclude`, and `files.watcherExclude` simultaneously
- **Independent toggles** — enable/disable each sync target independently in settings
- **Glob pattern support** — files, folders, or any glob expression (e.g. `*.log`, `dist/`)
- **Built-in preset** — common patterns pre-configured on first install
- **Restore Defaults** — reset to the built-in preset at any time
- **Sidebar panel** — view, toggle, and remove rules from the Explorer sidebar
- **Right-click to exclude** — right-click any file or folder in Explorer to add it

## Usage

### Add an exclusion rule

- Right-click a file or folder in Explorer → **Exclude (All In One)**
- Or: Command Palette → **Exclude All In One: Add Pattern**

### Manage rules

Open the **Excluded Items** panel in the Explorer sidebar:

| Action | How |
|--------|-----|
| Toggle a rule on/off | Click the eye icon |
| Remove a rule | Click the trash icon |
| Enable all | Toolbar button (✓✓) |
| Disable all | Toolbar button (✗✗) |
| Restore defaults | Toolbar button (↺) |
| Open settings | Toolbar button (⚙) |

### Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `excludeAllInOne.syncToFilesExclude` | `true` | Sync to `files.exclude` (Explorer, Quick Open, Symbol Search) |
| `excludeAllInOne.syncToSearchExclude` | `true` | Sync to `search.exclude` (full-text search) |
| `excludeAllInOne.syncToWatcherExclude` | `true` | Sync to `files.watcherExclude` (performance) |

### Default preset

`node_modules/`, `.git/`, `.svn/`, `.hg/`, `CVS/`, `dist/`, `build/`, `out/`, `.next/`, `.cache/`, `__pycache__/`, `.venv/`, `.tox/`, `*.log`, `.DS_Store`, `Thumbs.db`, `desktop.ini`, `.idea/`, `.vs/`, `*.swp`, `*.tmp`

## Attribution

Inspired by [explorer-exclude-vscode-extension](https://github.com/sfccdevops/explorer-exclude-vscode-extension) by sfccdevops (MIT). No code reused.

---

# Exclude All In One（中文说明）

统一管理 VS Code 文件/文件夹排除规则的插件。维护一份 glob 模式列表，同时同步到 Explorer、全文搜索和文件监听器，每个同步目标均可独立开关。

## 功能特性

- **统一排除列表** — 所有排除规则在一处管理
- **多目标同步** — 同时写入 `files.exclude`、`search.exclude`、`files.watcherExclude`
- **独立开关** — 每个同步目标可在设置中单独启用/禁用
- **Glob 模式支持** — 支持文件、文件夹或任意 glob 表达式（如 `*.log`、`dist/`）
- **内置预设** — 首次安装后自动加载常用排除规则
- **还原默认值** — 随时将规则列表重置为内置预设
- **侧边栏面板** — 在 Explorer 侧边栏中查看、切换和删除规则
- **右键排除** — 在 Explorer 中右键点击文件或文件夹即可添加排除规则

## 使用方法

### 添加排除规则

- 在 Explorer 中右键点击文件或文件夹 → **Exclude (All In One)**
- 或：命令面板 → **Exclude All In One: Add Pattern**

### 管理规则

打开 Explorer 侧边栏中的 **Excluded Items** 面板：

| 操作 | 方式 |
|------|------|
| 切换规则启用/禁用 | 点击眼睛图标 |
| 删除规则 | 点击垃圾桶图标 |
| 全部启用 | 工具栏按钮 |
| 全部禁用 | 工具栏按钮 |
| 还原默认值 | 工具栏按钮 |
| 打开设置 | 工具栏按钮 |

### 设置项

| 设置 | 默认值 | 说明 |
|------|--------|------|
| `excludeAllInOne.syncToFilesExclude` | `true` | 同步到 `files.exclude`（影响 Explorer、快速打开、符号搜索） |
| `excludeAllInOne.syncToSearchExclude` | `true` | 同步到 `search.exclude`（影响全文搜索） |
| `excludeAllInOne.syncToWatcherExclude` | `true` | 同步到 `files.watcherExclude`（文件监听器性能优化） |

### 内置预设

`node_modules/`、`.git/`、`.svn/`、`.hg/`、`CVS/`、`dist/`、`build/`、`out/`、`.next/`、`.cache/`、`__pycache__/`、`.venv/`、`.tox/`、`*.log`、`.DS_Store`、`Thumbs.db`、`desktop.ini`、`.idea/`、`.vs/`、`*.swp`、`*.tmp`

## 致谢

本插件参考了 [explorer-exclude-vscode-extension](https://github.com/sfccdevops/explorer-exclude-vscode-extension)（sfccdevops，MIT 许可证）的交互设计，未使用其任何代码。

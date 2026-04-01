# Changelog

## [0.1.0] — 2026-04-01

Initial release.

### Features

- **Unified exclusion list** — maintain a single list of glob patterns (files, folders, or any glob expression)
- **Sync to multiple targets** — writes to `files.exclude`, `search.exclude`, and `files.watcherExclude` simultaneously
- **Independent toggles** — each sync target can be enabled or disabled independently
- **Excluded Items panel** — sidebar panel in Explorer to view, toggle, and remove rules
- **Right-click to exclude** — right-click any file or folder in Explorer to add an exclusion rule
- **Built-in preset** — language-agnostic defaults (VCS dirs, OS artifacts, editor temp files) applied on first use
- **Restore Defaults** — reset the exclusion list to the built-in preset at any time
- **Respect `.gitignore`** — optional settings to apply `explorer.excludeGitIgnore` and `search.useIgnoreFiles` at workspace level

### Why Deep Exclude?

Extensions like [explorer-exclude](https://github.com/sfccdevops/explorer-exclude-vscode-extension) only hide files from the Explorer. Files excluded there still appear in full-text search results (Ctrl+Shift+F). Deep Exclude syncs your exclusion list to `search.exclude` as well, so excluded files are truly hidden everywhere.

### Known Limitations

- **Go to Symbol in Workspace (Ctrl+T)** — results are controlled by language servers independently of `files.exclude`. Excluded files may still appear in symbol search. This is a VSCode architectural limitation.

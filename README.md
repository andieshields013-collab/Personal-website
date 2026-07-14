# Personal Website

A fresh personal website for writing about interests, projects, and notes.

## Editing posts

Posts live in `content/posts`. Each post is a Markdown file with a title, date, description, and tags at the top.

## Running the site

This site uses Node 24. The version is recorded in both `.nvmrc` and
`.node-version` so common Node version managers can select it automatically.

```bash
nvm use
npm install
npm run build
npm run start -- --port 3001
```

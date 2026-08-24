#!/usr/bin/env bash
set -euo pipefail

# Editable defaults
REPO_OWNER="${REPO_OWNER:-mobconnect}"
REPO="${REPO:-MAKEITHUP}"
BRANCH="${BRANCH:-fix/automated-fixes}"
BASE="${BASE:-main}"
DOCKER_KIND="${DOCKER_KIND:-frontend}" # set DOCKER_KIND=backend for node server Dockerfile

echo "Running automated fixes for ${REPO_OWNER}/${REPO}"
echo "Branch: ${BRANCH}, Base: ${BASE}, Docker: ${DOCKER_KIND}"

# Clone if needed
if [ ! -d "${REPO}" ]; then
  git clone "git@github.com:${REPO_OWNER}/${REPO}.git" || { echo "Clone failed — check repo name or access"; exit 1; }
fi
cd "${REPO}"

git fetch origin || true
# Create branch from base (if base exists remotely)
if git rev-parse --verify "origin/${BASE}" >/dev/null 2>&1; then
  git checkout -B "${BRANCH}" "origin/${BASE}"
else
  git checkout -B "${BRANCH}"
fi

# Add MIT LICENSE
cat > LICENSE <<'EOF'
MIT License

Copyright (c) 2026 mobconnect

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
EOF

# CNAME for Pages (optional; change if you want a different domain)
echo "justbeyou.com.au" > CNAME

# .gitignore
cat > .gitignore <<'EOF'
.env
.env.local
node_modules/
dist/
.DS_Store
coverage/
.build/
.vscode/
.env.*
Thumbs.db
*.log
fixtures/
EOF

# ESLint config
cat > .eslintrc.json <<'EOF'
{
  "env": { "browser": true, "es2021": true },
  "extends": ["eslint:recommended","plugin:@typescript-eslint/recommended","plugin:react/recommended","prettier"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": { "ecmaVersion": "latest", "sourceType": "module", "ecmaFeatures": { "jsx": true } },
  "plugins": ["@typescript-eslint","react"],
  "rules": {}
}
EOF

# Prettier config
cat > .prettierrc <<'EOF'
{
  "printWidth": 100,
  "singleQuote": true,
  "trailingComma": "es5"
}
EOF

# Fixtures
mkdir -p fixtures
cat > fixtures/sample_data.json <<'EOF'
{
  "users": [
    { "id": 1, "name": "Alice", "email": "alice@example.com" },
    { "id": 2, "name": "Bob", "email": "bob@example.com" }
  ],
  "files": [
    { "id": "f1", "owner": 1, "name": "document.pdf", "size": 234567 },
    { "id": "f2", "owner": 2, "name": "photo.jpg", "size": 123456 }
  ]
}
EOF

cat > fixtures/README.md <<'EOF'
# Fixtures

Placeholders and sample fixture data used for local development and tests.

- fixtures/sample_data.json — example users and files
- Use fixtures only in development; do NOT commit secrets.
EOF

# Dockerfile: choose frontend or backend
if [ "${DOCKER_KIND}" = "backend" ]; then
  cat > Dockerfile <<'EOF'
# Build stage
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Runtime
FROM node:18-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --only=production
EXPOSE 3000
CMD ["node","dist/server.cjs"]
EOF
else
  cat > Dockerfile <<'EOF'
# Build stage
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Serve
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
EOF
fi

# Create .github/workflows/ci.yml
mkdir -p .github/workflows
cat > .github/workflows/ci.yml <<'EOF'
name: CI
on:
  push:
    branches: [ ${BASE}, ${BRANCH} ]
  pull_request:
    branches: [ ${BASE} ]
jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18.x]
    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
      - name: Install dependencies
        run: npm ci
      - name: Run lint
        run: npm run lint --if-present
      - name: Build
        run: npm run build --if-present
      - name: Run tests
        run: npm test --if-present
EOF

# Add Pages deploy workflow (frontend)
cat > .github/workflows/pages-deploy.yml <<'EOF'
name: Deploy to GitHub Pages
on:
  push:
    branches: [ ${BRANCH}, ${BASE} ]
jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build --if-present
      - name: Configure Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v1
        with:
          path: ./dist
      - name: Deploy
        uses: actions/deploy-pages@v2
EOF

# Optionally add Docker publish workflow for backend (GHCR) if backend chosen
if [ "${DOCKER_KIND}" = "backend" ]; then
  cat > .github/workflows/docker-publish.yml <<'EOF'
name: Build and publish Docker image
on:
  push:
    branches: [ ${BASE}, ${BRANCH} ]
jobs:
  build-and-push:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v2
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GHCR_PAT }}
      - uses: docker/build-push-action@v4
        with:
          context: .
          push: true
          tags: ghcr.io/${REPO_OWNER}/${REPO}:latest
EOF
fi

# Update package.json if present
if [ -f package.json ]; then
  echo "Updating package.json: adding license/homepage/scripts (non-destructive)"
  npm pkg set license=MIT || true
  npm pkg set homepage="https://justbeyou.com.au" || true
  npm pkg set scripts.lint="eslint . --ext .js,.ts,.tsx" || true
  npm pkg set scripts.format='prettier --write "**/*.{js,ts,tsx,json,css,md}"' || true
  npm pkg set scripts.prepare="husky install" || true
  npm pkg set scripts.predeploy="npm run build" || true
  npm pkg set scripts.'deploy:gh'="gh-pages -d dist" || true

  # install dev tools (best-effort; will not stop on failure)
  npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-react @typescript-eslint/parser @typescript-eslint/eslint-plugin husky lint-staged gh-pages rimraf cross-env || true
fi

# Commit changes
git add LICENSE CNAME .gitignore .eslintrc.json .prettierrc fixtures Dockerfile .github package.json package-lock.json 2>/dev/null || true
git commit -m "chore: add LICENSE, fixtures, lint/config, CI, Dockerfile and publish workflow" || true

# Push branch
git push -u origin "${BRANCH}"

# Create PR via gh (requires GH CLI authenticated)
if command -v gh >/dev/null 2>&1; then
  gh pr create --base "${BASE}" --head "${REPO_OWNER}:${BRANCH}" --title "chore: automated fixes — CI / fixtures / publish" --body "Add license, fixtures, lint/format configs, CI and publishing workflows." || true
  echo "PR creation attempted via gh. Check your repo for the PR."
else
  echo "gh CLI not found; branch pushed. Create a PR manually from ${BRANCH} -> ${BASE}."
fi

echo "Done. If GH CLI created a PR, open it to review CI results."

# eris-boreas

> Template to kickstart creating a Node.js module using TypeScript and VSCode

Inspired by [node-module-boilerplate](https://github.com/sindresorhus/node-module-boilerplate)

## Features

- [Semantic Release](https://github.com/semantic-release/semantic-release)
- [Issue Templates](https://github.com/marnixah/eris-boreas/tree/main/.github/ISSUE_TEMPLATE)
- [GitHub Actions](https://github.com/marnixah/eris-boreas/tree/main/.github/workflows)
- [Codecov](https://about.codecov.io/)
- [VSCode Launch Configurations](https://github.com/marnixah/eris-boreas/blob/main/.vscode/launch.json)
- [TypeScript](https://www.typescriptlang.org/)
- [Husky](https://github.com/typicode/husky)
- [Lint Staged](https://github.com/okonet/lint-staged)
- [Commitizen](https://github.com/search?q=commitizen)
- [Jest](https://jestjs.io/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## Getting started

### Set up your repository

**Click the "Use this template" button.**

Alternatively, create a new directory and then run:

```bash
curl -fsSL https://github.com/marnixah/eris-boreas/archive/main.tar.gz | tar -xz --strip-components=1
```

Replace `FULL_NAME`, `GITHUB_USER`, and `REPO_NAME` in the script below with your own details to personalize your new package:

```bash
FULL_NAME="John Smith"
GITHUB_USER="johnsmith"
REPO_NAME="my-cool-package"
sed -i.mybak "s/marnixah/$GITHUB_USER/g; s/eris-boreas\|eris-boreas/$REPO_NAME/g; s/Marnix/$FULL_NAME/g" package.json package-lock.json README.md
rm *.mybak
```

### Add NPM Token

Add your npm token to your GitHub repository secrets as `NPM_TOKEN`.

### Add Codecov integration

Enable the Codecov GitHub App [here](https://github.com/apps/codecov).

**Remove everything from here and above**

---

# eris-boreas

[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]
[![Commitizen Friendly][commitizen-img]][commitizen-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

> My awesome module

## Install

```bash
npm install eris-boreas
```

## Usage

```ts
import { myPackage } from 'eris-boreas';

myPackage('hello');
//=> 'hello from my package'
```

## API

### myPackage(input, options?)

#### input

Type: `string`

Lorem ipsum.

#### options

Type: `object`

##### postfix

Type: `string`
Default: `rainbows`

Lorem ipsum.

[build-img]:https://github.com/marnixah/eris-boreas/actions/workflows/release.yml/badge.svg
[build-url]:https://github.com/marnixah/eris-boreas/actions/workflows/release.yml
[downloads-img]:https://img.shields.io/npm/dt/eris-boreas
[downloads-url]:https://www.npmtrends.com/eris-boreas
[npm-img]:https://img.shields.io/npm/v/eris-boreas
[npm-url]:https://www.npmjs.com/package/eris-boreas
[issues-img]:https://img.shields.io/github/issues/marnixah/eris-boreas
[issues-url]:https://github.com/marnixah/eris-boreas/issues
[codecov-img]:https://codecov.io/gh/marnixah/eris-boreas/branch/main/graph/badge.svg
[codecov-url]:https://codecov.io/gh/marnixah/eris-boreas
[semantic-release-img]:https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]:https://github.com/semantic-release/semantic-release
[commitizen-img]:https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]:http://commitizen.github.io/cz-cli/

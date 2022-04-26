# eris-boreas

[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]
[![Commitizen Friendly][commitizen-img]][commitizen-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

> This project is a base library to enable discord microservices using the
> [Smalltalk Conversational Protocol](https://gist.github.com/fredi-68/81a157d30059b543132e328aed91f64d)

## Install

```bash
npm install eris-boreas
```

## Usage

```ts
import ErisClient from 'eris-boreas';
import { Client } from 'discord.js';

class MyClient extends ErisClient {
  get name() {
    return 'MyClient';
  }
}

const discordClient = new Client();
const erisClient = new MyClient(discordClient);
erisClient.bot.login('my secret discord bot token');
```

For instructions on acquiring a token, see the [discord.js documentation](https://discordjs.guide/preparations/setting-up-a-bot-application.html).

[build-img]: https://github.com/marnixah/eris-boreas/actions/workflows/release.yml/badge.svg
[build-url]: https://github.com/marnixah/eris-boreas/actions/workflows/release.yml
[downloads-img]: https://img.shields.io/npm/dt/eris-boreas
[downloads-url]: https://www.npmtrends.com/eris-boreas
[npm-img]: https://img.shields.io/npm/v/eris-boreas
[npm-url]: https://www.npmjs.com/package/eris-boreas
[issues-img]: https://img.shields.io/github/issues/marnixah/eris-boreas
[issues-url]: https://github.com/marnixah/eris-boreas/issues
[codecov-img]: https://codecov.io/gh/marnixah/eris-boreas/branch/main/graph/badge.svg
[codecov-url]: https://codecov.io/gh/marnixah/eris-boreas
[semantic-release-img]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]: https://github.com/semantic-release/semantic-release
[commitizen-img]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]: http://commitizen.github.io/cz-cli/

# Library CLI

A CLI for creating, building, and testing JavaScript libraries.

## Installation

```
yarn add -D library-cli
```

## Usage

### `library build`

Builds your library using smart defaults. Overriding configuration may be possible in a future release.

- Builds a commonjs version using `main` from `package.json`.
- Builds an esm version using `module` from `package.json`.
- Automatically marks `peerDependencies` as `external`.
- Uses `@babel/preset-env` and `@babel/preset-react`.
- More to come!

### `library test`

Runs tests (including test coverage) using `jest` Tests must be placed inside a `__tests__` directory.

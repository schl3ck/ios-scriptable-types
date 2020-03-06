# As modules

This folder contains two folders:

## [`draft_modules`](./draft_modules/)

This folder contains local examples of an [ESLint sharable config](https://eslint.org/docs/developer-guide/shareable-configs) module and a module for [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped).


## [`scriptable`](./scriptable/)

This folder contains an example of the `iCloud Drive/Scriptable` folder, which has the two files that will be needed for distribution after publishing these two modules:

### `jsconfig.json`:
```json
{
  "compilerOptions": {
    "lib": ["ES6"]
  }
}
```

### `package.json`:
```json
{
  "name": "scriptable",
  "version": "1.0.0",
  "eslintConfig": {
    "extends": "@scriptable-ios"
  },
  "dependencies": {
    "@scriptable-ios/eslint-config": "latest",
    "@types/scriptable-ios": "latest",
    "eslint": "latest"
  }
}
```

In the `scriptable` folder, `package.json` has links to the local modules, so you can `cd` into `scriptable` and then `npm install` to experiment.

# Example

The [scriptable](./scriptable) folder contains an example of the `iCloud Drive/Scriptable` folder, which has the two files that will be needed for distribution after publishing these two modules:

### `jsconfig.json`:
```json
{
  "compilerOptions": {
    "lib": ["ES2018"]
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
  "devDependencies": {
    "@scriptable-ios/eslint-config": "latest",
    "@types/scriptable-ios": "latest",
    "eslint": "latest"
  }
}
```

In the `scriptable` folder, `package.json` has links to the local modules, so you can `cd` into `scriptable` and then `npm install` to experiment.

If you don't want a `node_modules` folder and these two files in your `iCloud Drive/Scriptable` folder, you can create somewhere else a project folder, create there the two files from above and make a symlink to the Scriptable folder. E.g.:

```
my-scriptable-projects
|
+ - src (symlink to >iCloud Drive/Scriptable< folder)
+ - node_modules
+ - package.json
+ - jsconfig.json
```

You can also modify this setup to work with TypeScript, so you can code in TypeScript and the compiled output lands via symlink in the `iCloud Drive/Scriptable` folder.

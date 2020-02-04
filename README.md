# ios-scriptable-types

I don't know how to publish this. I've thought about DefinitelyTyped, but then you need to have `npm` and a `node_modules` folder in the working directory. Or should I make a VisualStudio Code Extension? (But that would take some time)

If you have any idea, just open an issue.

This project downloads a Tern definition file from htpps://docs.scriptable.app, parses it and creates the TypeScript Declaration file. This can then be used to enable code completion in—for example—VS Code.

For now, just download `dist/scriptable.d.ts` and put it in the `Scriptable` folder in your iCloud Drive.
To disable the DOM types, simply add a file called `jsconfig.json` with:

```json
{
	"compilerOptions": {
		"lib": ["es6"]
	}
}
```

Then open up VS Code or any other IDE of your choice and it _should_ pick up the declaration file and provide code completion for you.

There is also a `globals.eslint.json` in the `dist` directory which contains all globals defined by Scriptable plus `await` because ESLint doesn't accept it in the top level scope. Just copy and paste them in your `.eslintrc` in the `globals` object.

# ios-scriptable-types

I don't know how to publish this. I've thought about DefinitlyTyped. But then you need to have npm and a node_modules folder in the working dorectory.
Or should I make a VisualStudio Code Extension? (But that would take some time)

If you have any idea, just open an issue.

For now, just download `dist/scriptable.d.ts` and put it in the `Scriptable` folder in your iCloud Drive.
To disable the DOM types, simply add a file called `jsconfig.json` with:

```json
{
	"compilerOptions": {
		"lib": ["es6"]
	}
}
```

There is also a `globals.eslint.json` in the `dist` directory which contains all globals defined by Scriptable plus `await` as ESLint doesn't accept it in the top level scope. Just copy and paste them in your `.eslintrc` in the `globals` object.

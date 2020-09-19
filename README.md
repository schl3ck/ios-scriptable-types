# ios-scriptable-types

This project downloads a Tern definition file from https://docs.scriptable.app, parses it and creates the TypeScript declaration file. This can then be used to enable code completion in — for example — VS Code.

I've published the generated types with DefinitelyTyped. Install them with

    npm i -D @types/scriptable-ios

The ESLint shareable config can be installed with

    npm i -D @scriptable-ios/eslint-config

You can find an example setup and additional information in [example](./example)

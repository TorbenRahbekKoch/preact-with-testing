# Preacting to the testing choir

It all started with me looking for a way to bootstrap a React-project, since 
[create-react-app is now dead](https://dev.to/ag2byte/create-react-app-is-officially-dead-h7o).

That article probably wasn't my first stop, but it pointed me in the direction of 
[Vite](https://vitejs.dev/), which partly can be seen as a replacement for Webpack, I guess, 
but also as a replacement for `create-react-app`. But while reading about Vite and
while reading the above article I noticed that Vite is able to bootstrap many types
of projects. Among these [Preact](https://preactjs.com/). The naming was close to React so
I naturally got curious. I needed to try this!

It is very, very easy to get started with Preact, using Vite, assuming you have 
[Node.js] installed:

```` bash
npm create vite@latest
````

Simply choose `Preact` when asked about framework. 

You even get to choose whether you want to use JavaScript
or TypeScript. 

If you already know React you also know Preact, the differences are
minor and are [all listed here](https://preactjs.com/guide/v10/differences-to-react).

## Testing

As easy as it was getting started with Preact, as hard it was to
get started with *testing* in Preact.

There are (too) many moving cogs in modern web development and not
all of those cogs are fitting well together, and quite a few of them
do lack some proper documentation.

To - hopefully - help other out, I have compiled a list of the needed
steps to successfully start testing a Preact application.

As always you'll need a slew of extra packages:

```` bash
npm install --save-dev vitest       
npm install --save-dec vite-tsconfig-paths 
npm install --save-dev @testing-library/preact
npm install --save-dev @testing-library/jest-dom
npm install --save-dev jsdom
````

It is probably possible to use other dom-emulators than
`jsdom`.

To run tests you (probably) need to add a test-runner to the `script`-section of
`package.json` (who got the not so brilliant idea
of putting something with scripts into *`package.json`* ??)

```` json
"scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest --watch"
  },
````

It is, of course, the `"test"`-line that runs the tests, if you want 
to run them ;)

````bash
npm run test

````

But don't get ahead of yourself! There's still (a bit) more work
to do!

In the root of the project you need to add `vitest.config.ts`-file. 
(if you are using TypeScript, otherwise it will probably be .js)

```` typescript
import tsconfigPaths from 'vite-tsconfig-paths';
import {
  configDefaults,
  defineConfig,
  mergeConfig,
  type UserConfig,
} from 'vitest/config';

import viteConfig from './vite.config';


const config = mergeConfig(
  viteConfig, // Extending from an existing Vite configuration (`vite.config.ts` file)
  defineConfig({
    test: {
      ...configDefaults, // Extending Vitest's default options      
      environment: 'jsdom'
    },
    plugins: [tsconfigPaths()],
  }) as UserConfig
);

export default config;
````

The `tsConfigPaths` plugin helps the test runner to use
the same configuration files as the TypeScript-compiler, so you
probably won't need it if you are not using TypeScript ;)

Let's just add a `app.test.tsx` file next to the existing 
`app.tsx`-file:

```` typescript
import { fireEvent, render, screen,waitFor } from '@testing-library/preact'
import { describe, expect, test  } from 'vitest'
import { App } from './app'

describe('Some test this is!', () => {
    test('Are we closing in on something?', () => {
        expect(1 + 2).toBe(3)
    }),
l
    test('Do we dare?', async () => {
        await render(<App></App>)

        const button = screen.queryByText("count is", {exact: false})

        await fireEvent.click(button!)

        await waitFor(() => {
            expect(button?.textContent).toContain("1")
        }, { interval: 1000})
    })
})
````

Now you can run your tests, with the above command!

The entire projects is available on [GitHub]
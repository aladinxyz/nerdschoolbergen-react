# Exercise 1 - Getting Started

## In this exercise you will learn to:

- Create a new React app using the scaffolding tool `create-react-app`.
- Learn about "hot reloading" aka how we get the browser to reload the changed React components we're working on as we change them.
- Incorporate styling (sass).
- Get linting in your editor.

## Required software and tools for this exercise

- Google Chrome.
- A modern text editor that understands JavaScript and React. For example Atom or Visual Studio Code.
- [NodeJS and npm](https://nodejs.org/en/) installed on your machine. You should have NodeJS greater than 8.0.0 (`node -v`) and npm greater than 5.0.0 (`npm -v`).

## 1.1 Creating a new React application

:book: Creating a new application from scratch can be a surprisingly long and tedious task these days. A typical React application uses [Webpack](https://webpack.js.org/) as the main build tool and pipeline. We're not going to set up Webpack ourselves in this workshop, but it'll be running things behind the scenes for us. Instead, we're going to use a scaffolding tool called `create-react-app` which will generate a project for us, and manage all configuration files for us in a different folder on your machine. This means you won't see the configuration files that belong to your app. In a real-world application of some size you'll probably want control over these configuration files - and Webpack. In that case you can either set everything up yourself from scratch or scaffold a project using `create-react-app` and _eject_, meaning it'll copy all configuration files to your codebase and give you full control, but you'll loose the possibility to use `create-react-app` for managing your project from then on. Today, we'll not use this option.

### create-react-app

> For reference and docs: [create-react-app on GitHub](https://github.com/facebookincubator/create-react-app)

:pencil2: Run the following command in a terminal `npm install -g create-react-app`. This will install `create-react-app` globally on your computer.  
:pencil2: Run `create-react-app nerdschool-app`. This will create the new React application "nerdschool-app" in the folder you're currently in. Specify a full path or make sure to navigate to where you want to create the app.  
:pencil2: Run `npm start` to start the app in your browser. A new browser windows should start showing the default page.  

![](../images/default-page.png)

### :book: Inspecting the generated files and folders

A simple folder structure was created:

```
\node_modules
\public
--\favicon.ico
--\index.html
--\manifest.json
\src
--\App.css
--\App.js
--\App.test.js
--\index.css
--\index.js
--\logo.svg
--\registerServiceWorker.js
package.json
package-lock.json
```

- `\public` this folder contains files needed for running your app, but not necessarily something you want to change or modify as part of your other source code files. (`manifest.json` is a metadata file related to running your app as a [progressive web app](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#progressive-web-app-metadata)).
- `\src\index.js` - This is the main entry point for your app. As you can see, it'll look for a `div` named "root" which'll be the top-level DOM node for your React app. You'll find this `div` in `\public\index.html`. Also note that this file _imports_ `App` and passes in to `ReactDOM.render(<App />)`.
- `\src\App.js` - This is currently the top-level React element in your app. Its content should be very straight-forward. Note that the html `class` attribute is called `className` in React. Also note that this component is a `class` that _extends_ the React `Component` base class.
- `\src\App.test.js` - These are the tests for `App.js`. In React apps it's common to put test files either next to the source file (in the same folder), or in a `__tests__` sub-folder next to the source file. Any file ending with `.test.js` or `.spec.js` will be identified as a test file by **Jest**, which is our current test runner and test framework.

### Cleaning up stuff we won't use

The downside to most code generators is that they create stuff we don't need or don't understand. In this case we get some stuff related to progressive web apps which we won't use.

:pencil2: Delete `src\registerServiceWorker.js`.  
:pencil2: Delete `public\manifest.json`.  
:pencil2: Open `src\index.js` and remove the lines `import registerServiceWorker from './registerServiceWorker';` and `registerServiceWorker();`.

## 1.2 Running tests and building

By inspecting `package.json` we can see 4 `scripts`: `start`, `build`, `test`, `eject`.

We already know what `start` does, and the others should not be surprising.

### Build

:pencil2: Run `npm run build`. After a few seconds, it says a bundle is compiled and ready. This means Webpack took all of our files and bundled and minimized them into one js and one css file. It also suggests a way to run the bundle: `serve -s build`. You probably don't have the `serve` package installed yet so let's do that next.   
:pencil2: Run `npm install -g serve`. This installs _serve_ globally on your computer.  
:pencil2: Run `serve -s build` and open [http://localhost:5000/](http://localhost:5000/). This serves your built production build.

For the rest of the workshop we'll use `npm start` to serve our source files as-is through webpack dev server. This makes it easier to debug and inspect our code in the browser dev tools and other development features. You can stop serving the bundle and make sure you're using port 3000 and not 5000: [http://localhost:3000/](http://localhost:3000/).

### Test

We already know we have one test in `src\App.test.js`, so we assume running `npm test` will find and run it.

:pencil2: Run `npm test`. It should produce 1 green test passing. The command also entered _watch mode_ which'll re-run relevant tests when source files changes. It can be useful to leave this open in another terminal window while working.

### Eject

**>>> Do not run :exclamation: :exclamation: <<<**

As discussed briefly earlier, this command hands over control of our configuration files and puts them in our repository. This is not necessarily a bad thing - in a proper project we probably want to do this at some point, but it's not necessary for this workshop.

## 1.3 Hot reloading

There's a feature in Webpack called _Hot Module Replacement_ (HMR) which, through dark and mysterious magic, enables plugins and frameworks to be notified when certain pieces of the application changes (when you save a file).

For our purposes this means that when we change a React component while `npm start` is running, the tooling will automatically swap out that single component with the newly compiled one you just saved (but not trigger a re-render of components not impacted) without having to touch the browser window. We call this _hot reloading_.

Let's try it out.

:pencil2: Make sure you have `npm start` running and a browser window open at [http://localhost:3000/](http://localhost:3000/). Put this window and your code editor side-by-side so you can see both at the same time.  
:pencil2: Open `src\App.js` and change the text on line 11 to `Welcome to Nerdschool`. Save the file.  
:book: Notice how the text in the webpage changed immediately without having to refresh the window.  

## 1.4 Chrome extensions

### React dev tools

> [Download here](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)

This is like any browser's _Elements_ tab, but for React elements.

![](../images/react-devtools.png)

**Useful things to note:**

:book: The right-hand panel (blue) lists a component's _props_. We haven't discussed this yet, but props are basically the values passed in to a component from it's parent component. This will be useful later.  
:book: The target icon (green) enables you to point your cursor on an element on the screen which'll expand down to, and select, that React component in the tree.  
:book: Note that this DOM-tree lists the React nodes as they are named in your source code (pink).

### Redux dev tools

> [Download here](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)

We'll discuss this in later exercises. Just install it now :)

### [Go to exercise 2 :arrow_right:](../exercise-2/README.md)

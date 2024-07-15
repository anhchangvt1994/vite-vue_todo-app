## First start

This project is a collection of two mini-projects include `SignIn / SignUp` and `Todo List`.

For more information about this project.

- You can read detail about advanced structure of Vite + Vue + TS project in this [repository](https://github.com/anhchangvt1994/vite-project--template-vue-ts).
- You can read detail about router, suspense and some common utilities in this [repository](https://github.com/anhchangvt1994/vite-project--template-vue-ts__vue-router).
- You can experience the architecture above, along with SEO capabilities and lighthouse score optimization, as well as many other utilities, all of which promise to bring you a wonderful experience. And of course, you can use it for your own real-world projects [repository](https://github.com/anhchangvt1994/vite-project-template-vue__seo-web-scraping).

## Table of contents

1. [Install](#install)
2. [Tech stacks](#tech-stacks)

<h2 id="install">Install</h2>

##### Expect Node 18.x or higher

**Clone source:**

```bash
git clone https://github.com/anhchangvt1994/vite-vue_todo-app.git
```

**Install:**

```bash
cd vite-vue_todo-app
```

If use npm

```bash
npm install
```

If use yarn 1.x

```bash
yarn install
```

**Install mockup-db:**

```bash
cd mockup-db
```

```bash
npm install
```

**Run preview:**

```bash
cd mockup-db
npm run start
```

```bash
npm run build
npm run preview
```

<h2 id="tech-stacks">Tech stacks used in this project</h2>

- **vue-router**: is used to manage the routing capabilities between pages.
- **vue suspense**: is used to display a loader for asynchronous operations that require loading information, helping to enhance the user experience. In this application, suspense will be primarily used in the process of loading the `/pages` that are set up for lazy loading in the vue-router definition and the `auto-login` process.
- **composable API**: is used to manage the state in the VueJS 3.x application. Specifically in this project, `composable API` is used to manage the `toast list` information.
- **pinia**: is used to manage the global state, making it easier to share state between components..
- **vue-query**: is used to manage the API request process, including the request, cache, and cache invalidation.
- **vee-validate**: is used to manage the interaction and handling of forms in the Vue application, making the form elements more consistent in terms of data handling and data types, which helps improve the performance of coding and form execution in the application.
- **yup**: is used to provide the definition for form validation, including valid value types, valid value formats, and error messages for each form element.
- **Vue teleport**: is used to build sub-root components adjacent to the root component. Vue teleport can support the construction of components that are separate from the root component in terms of display, which can make the display of sub-components easier as they are not affected by the CSS properties of the parent components.
- **tailwind (daisy-UI)**: are used to build the layout.

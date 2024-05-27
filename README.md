# Vue 3 Timer

This project is a simple timer application built with Vue 3 and TypeScript. The main goal of this project was to explore the new features and improvements in Vue 3, particularly in terms of TypeScript integration.

## Technical Decisions

### State Management

Instead of using Vuex for state management, I decided to use Vue's `reactive` function from the Composition API. This decision was made primarily because `reactive` provides better TypeScript support than Vuex.

With `reactive`, a reactive state object can be created where types can be defined for our state directly. This makes the state management code more type-safe and easier to reason about.

The `toRefs` function was also used to convert the reactive state object into a plain JavaScript object with reactive properties. This allows for easiuer passing of the state as props to child components and ensures that they can access and update the state correctly.

### TypeScript Integration

Vue 3 has significantly improved TypeScript integration compared to Vue 2. This project was an opportunity to explore these improvements and leverage the benefits of TypeScript in a Vue application.


## Project Setup

To set up the project, run:

```bash
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

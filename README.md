# Introduction
This is my first VueJs hands-on experience. A sample to demonstrate my learnability and turn around time of my productivity. 

In a short period, I managed to create an application to fulfil the requirements. But time won in the end when started to implement error handling and unit tests

## Process
### Thought process
My inspiration for this application was Netflix. 

First, I needed to figure out what technologies complement the requirement that the stack should have VueJS. This was easy as Vue has a [scaffolding](https://vuejs.org/guide/quick-start.html#creating-a-vue-application). They also guide you to have a proper IDE setup (VSCode).

The next step was to read the VueJS documentation to gain some knowledge which took some time. As a side effect, I decided to have basic storage as I did not want to spend too much time investigating.

Then the routing and basic components came into existence. The critical part was to come up with an algorithm to show the number of cocktails on a page. And it should be responsive.

Due to my familiarity with Material UI, I decided to use Vuetify in the application. Although I did add basic html and css at some places due to time constraints.

At last, for unit testing, I used Cypress as it came inbuilt as a powerful tool.

### Development process
The application was bootstrapped with 
```sh
npm init vue@latest
```
It would set up the application with all the configurations for Vue3, Vue Router, Typescript, Cypress, ESLint and Prettier.

Next thing was to set up the base services and storage files followed by components.

I dealt initially with Home Page and then the details page. At last, I incorporated the search functionality.

After the implementation, all left was a lot of cleaning up. Simultaneously this README was being written. 

In the end, added one of each a unit test and an e2e test.

## Cocktails App Assessment functionalities
1. Display all cocktails segregated by categories.
2. Search cocktails.
3. Display details of a cocktail.

## Project Setup
### Technologies 
[Vue 3](https://vuejs.org/guide/quick-start.html) + [Typescript](https://www.typescriptlang.org/) +  [Vite](https://vitejs.dev/) + [Vuetify](https://next.vuetifyjs.com/en/) +[Cypress](https://www.cypress.io/)

### Prerequisites
Install Node.js version 16.0 or higher

### Install dependencies
```sh
npm install # or `yarn`
```

### Run the application
```sh
npm run dev # or `yarn dev`
```
The application should be available at http://127.0.0.1:5173/, if the path does not work (mostly because the port is busy) then one can find the path in the logs.


### Type-Check, Compile and Minify for Production
```sh
npm run build # `yarn build`
```

## Testing
### Run Headed Component Tests with [Cypress Component Testing](https://on.cypress.io/component)
```sh
npm run test:unit # or `yarn test:unit`
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)
```sh
npm run build # or yarn build
npm run test:e2e # or yarn test:e2e
```

### Lint with [ESLint](https://eslint.org/)
```sh
npm run lint # or yarn lint
```

## Future Improvements
1. Add more e2e and unit tests. Increase coverage to at least 80%.
2. Improve error handling. And show a notification when an error occurs (infrastructure for notifications is present [vue3-notification](https://github.com/kyvg/vue3-notification).
3. Add a store for caching and prevent frequent API calls.
4. Create a UI theme.

Product App
============

[![CircleCI](https://circleci.com/gh/josephj/products-app.svg?style=svg&circle-token=bcdef15c903cd65ee0a0153d996f5b1d3e32ba71)](https://circleci.com/gh/josephj/products-app)

## Demo

* [GitHub Pages](https://josephj.github.io/products-app)

![](https://d.pr/i/JjVFwL+)

## Installation

```bash
yarn
CI=1 yarn test
yarn start
```

For checking the test coverage, please execute the following command.

```bash
npm test -- --coverage
```

---

## Requirement 1 - Redux for State Management

### Middleware

Using `redux-thunk` middleware for simplicity, and it's suitable for a small project.

For larger project, I tend to avoid to have the side effects in actions and reducer. Thus the `redux-observable` and `redux-saga` which have epic and saga to place side effects are more ideal.

### Store Structure

The root reducers are currently separated by feature. Under each feature, it should always be separated with `data` and `meta` (page state) reducers.

While it's getting complicate, I would like to place all the data into a `entities` reducer which is processed by `normalizr`. However, the current organsing by feature way will be kept since we sometimes still want to save reusable page state in `meta`.


```js
{
  routing: {}, // Mounted by connected-react-router
  entitles: { // For future-proof (Not implemented)
    products: {},
    users: {}
  },
  products: { // Current implementation
    data: [],
    meta: {
      isLoading: false,
      limit: 8
      page: 1,
    }
  }
}
```

### Action and Reducer

* Using `ducks-modular-redux` pattern. It's personal preference whether to separate reducer and actions. I am happy with both ways.
* Using `redux-actions` which helps me to write less boilerplate code and `switch-case` things.

```
retrieveProducts
retrieveProductsStart
retrieveProductsComplete
setLimit
setPage
```

I seldom write something like `retreiveProducts`, `retrieveProductStart`, and `retrieveProductsComplete` from scratch now. Keeping writing it manully will definitely blow up the code base since we will boilerplate similar API call, actions, reducers, even saga for different APIs. I have created a [resource utility](https://github.com/efcsydney/efcsydney-roster/tree/master/client/src/resource) to keep ourselves DRY. (Sorry, no README.md at this moment...)

```js
import { createApiActions } from 'resources';

const {
  createEvent,
  createEventComplete,
  createEventReset,
  modifyEvent,
  modifyEventComplete,
  modifyEventReset,
  destroyEvent,
  destroyEventComplete,
  destroyEventReset,
  retrieveEvent,
  retrieveEventComplete,
  retrieveEventReset
} = createApiActions('events');
```

Since these actions are consistent, we are able to create a smart saga and a smart reducer which fits to all different APIs. Also created a `withResource` HoC so that you don't need manually fetch the data in the component.

## Requirement 2 - React Router 4

Currently it's only a single page so that I use `<Redirect/>` to redirect the non-existing routes. Using `HashRouter` since I would like to deploy and make it works on Github Pages.

Providing a route for different pages `/products/pages/:page` is also what I want to implement.

## Requirement 3 - Good Component Structure

It really depends on reviewer's preference. I agree and follow the modular approach which is proposed in the "[Three Rules for Structuring (Redux) Applications](https://jaysoo.ca/2016/02/28/organizing-redux-application/#rule-1-organize-by-feature)" blog post.

```
src
├── App.js
├── App.test.js
├── apis
│   ├── index.js
│   └── products.js
├── components
│   ├── Grid.js
│   ├── PageLimit.js
│   ├── PageLimit.test.js
│   ├── Pager.js
│   ├── Pager.test.js
│   ├── index.js
│   ├── utils.js
│   └── README.md
├── configureStore.js
├── index.css
├── index.js
├── modules // Organising by features
│   └── products
│       ├── connectStore.js
│       ├── connectStore.test.js
│       ├── index.js
│       ├── Item.js
│       ├── Item.test.js
│       ├── ProductList.js
│       ├── ProductList.test.js
│       ├── redux.js
│       └── redux.test.js
├── reducer.js
├── setupTests.js
└── svgs
    ├── caret-down.svg
    ├── cloud-offline.svg
    ├── product-list-loader.svg
    └── spinner.svg
```

* `src/components` - Pure reusable UI components.
* `src/components/index.js` - The index for all public avaiable UI components.
* `apis` - API access methods.
* `apis/index.js` - The index for all public available API access methods.
* `apis/products.js` - The Products API methods.
* `modules` - Organised by feature approach. Currently it only has `products`.
* `modules/products/index.js` - Public API of the `products` module exposed in this file
* `modules/products/ProductList.js` - Container component. The default export is connected to store. The named export `ProductList` is just a pure component which is easier for testing.
* `modules/products/redux.js` - Follow the [Ducks modular pattern](https://github.com/erikras/ducks-modular-redux). Placing reducer and actions together.
* `modules/products/connectStore.js` - HoC which handles the `mapStateToProps`, `mapDispatchToProps` and `mergeProps`. The major benefit is that the component doesn't need to know the existence of redux.
* `svgs` - Icons and the content loader.

It's good to know that CRA provides a way to import svg as React Component directly.

## Requirement 4 - Should be responsive

Implemented 5 breakpoints in `src/components/utils.js` and used it in `src/components/Grid.js`.

## Requirement 5 - Good code quality

Also a subjective requirement. However, this one will be easier if I could integrate tools like CodeClimate or codebeat with your coding standard.

## Requirement 6 - ES6 +

Definitely! How can I live without ES6+ nowadays! 💪

## Requirement 7 - High Test coverage

Using `Jest` and `enzyme` for unit and integration tests. I also make use of the Wallaby.js so that I don't have to run `yarn test` all the way with me. 

![](https://d.pr/i/LSPr8o+)

I also integrate the CircleCI which helps me to run testing automatically for all my git pushes.

![](https://d.pr/i/ht60Eh+)

Testing is definitely my weakness. I understand the theory and the importance of writing tests. However, it's also difficult to make it as priority in a project-based startup company.

---

## Extra Works

I implemented a SVG preloader. It's a bonus I guess. 😆

![](https://github.com/josephj/products-app/blob/master/src/svgs/product-list-loader.svg)

## Thoughts

* The way you have the code test is quite unique. It's good for you to observe candidates such as how they approach problems, communication skill and how they organise tasks. From candidates perspective it might be a bit overwhelming since they need to spend more time to configure everything properly with redux, react-router, code coverage. Personally I would suggest to move some requirements into the in-person technical interview.
* Initial configuration is a bit inefficient. I have to solve the version dependencies issues for my favourite tools. And some major updates for the libraries which I need to figure out how to configure again. Thus, I created a boilerplate repo](https://github.com/josephj/josephj-cra-boilerplate) for myself.
* Shortcomings
  * styled-components also has some JavaScript logic. I've spent my time to figure out how to test it.
  * Failed to test the error for the `retrieveProducts`. Still try to figure out why.
  * I haven't figured out why my `react-hot-loader` stops to work. Not a big issue though.
* Serveral things I learned from this test.
  * CircleCI configuration
  * Configuring Wallaby.js properly with styled-components
  * Importing SVGs directly as React Component without using svgr
  * Go deeper with the `enzyme` APIs.
  * Realised how tricky it could be for making a flexible pagination component. The pagination component `react-js-pagination` I used in the beginning even use a `paginator` package to solve some challenges.

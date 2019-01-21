Product App
============

[![CircleCI](https://circleci.com/gh/josephj/products-app.svg?style=svg&circle-token=bcdef15c903cd65ee0a0153d996f5b1d3e32ba71)](https://circleci.com/gh/josephj/products-app)

## Demo

* [GitHub Pages](https://josephj.github.io/products-app)
* [CodeSandbox](https://codesandbox.io/s/github/josephj/products-app)

![](https://d.pr/i/JjVFwL+)

## Installation

```
yarn
CI=1 yarn test
yarn start
```

## Tasks

* ✅ Request a list of products from a JSON REST api
* ✅ Render results to page as per the UI (Find ProductListing.png in the repository)
* ✅ Add ability to paginate the collection (Items per page needs to be configurable)

## Requirements

* ✅ Redux for state management
  * Using `redux-thunk` middleware.
* ✅ React Router 4
  * Currently it's only a single page so that I use `<Redirect/>` to redirect the non-existing routes.
* ✅ Good component structure
  * It really depends on reviewer's preference. I agree and follow the modular approach which is proposed in the "[Three Rules for Structuring (Redux) Applications](https://jaysoo.ca/2016/02/28/organizing-redux-application/#rule-1-organize-by-feature)" blog post.
* ✅ Should be responsive
  * Implemented 5 breakpoints in `src/components/utils.js` so that all components can make use of it.
* ✅ Good code quality
  * Also a subjective requirement. However, this one is easier since we can integrate SaaS tools like CodeClimate or codebeat.
* ✅ ES6 +
  * Definitely! 💪
* ⛏ High Test coverage
  * Continue working on this one 😅

## Details

### File & Folder Structure

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
│   ├── Pager.js
│   ├── README.md
│   ├── index.js
│   └── utils.js
├── configureStore.js
├── index.css
├── index.js
├── modules
│   └── products
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

### Redux

I use Ducks pattern and `redux-acions`.

#### Actions

* `retrieveProducts`
* `retrieveProductsStart`
* `retrieveProductsComplete`
* `setLimit`
* `setPage`

#### Store

```js
{
  products: {
    data: [],
    meta: {
      isLoading: false,
      limit: 8
      page: 1,
    }
  }
}
```

### Testing

* Wallaby.js
* CircleCI

## Thoughts

(any shortcomings and concerns that you encountered during the process, though this is not a mandatory requirement, it helps us better understand your thought process.)






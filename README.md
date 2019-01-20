Product App
============

[![CircleCI](https://circleci.com/gh/josephj/products-app.svg?style=svg)](https://circleci.com/gh/josephj/products-app)

# Links

* [Demo](https://josephj.github.io/products-app)
* [CodeSandbox](https://codesandbox.io/s/github/josephj/products-app)

![](https://d.pr/i/JjVFwL+)

# Installation

```
yarn
yarn test
yarn start
```

# Tasks

* ✅ Request a list of products from a JSON REST api
* ✅ Render results to page as per the UI (Find ProductListing.png in the repository)
* ✅ Add ability to paginate the collection (Items per page needs to be configurable)

# Requirements

* ✅ Redux for state management
* ✅ React Router 4
* ✅ Good component structure
* ✅ Should be responsive
* ✅ Good code quality
* ✅ ES6 +
* ⛏ High Test coverage

# Details

## File & Folder Structure

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

## Redux

### Store

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

## Testing

* wallaby.js
* CircleCI
* TestCafe

# Thoughts

(any shortcomings and concerns that you encountered during the process, though this is not a mandatory requirement, it helps us better understand your thought process.)







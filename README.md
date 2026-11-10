# Ketli Store — Assignment 7

## Project Description
Ketli Store is a simple online shopping application developed using React and Vite.
Users can browse products, search by title, filter by category, view product details, and manage a shopping cart.
I chose a minimal design with purple and lavender colors.

## Technologies Used
- React and Vite
- React Router
- Context API and useReducer
- Zustand
- Custom Hooks
- LocalStorage
- DummyJSON API

## Main Features
- Product listing, searching, and filtering
- Product detail pages
- Add, remove, and update cart items
- Cart data persistence using LocalStorage
- Simulated login and protected routes
- Light and dark theme switching
- Error and loading state handling

## File Organization

```text
src/
├── api/
│   ├── productsApi.js
│   └── authApi.js
├── hooks/
│   ├── useFetch.js
│   └── useLocalStorage.js
├── context/
│   └── AuthContext.jsx
├── store/
│   └── cartStore.js
├── components/
│   ├── Layout.jsx
│   ├── NavBar.jsx
│   ├── ProductCard.jsx
│   └── ProtectedRoute.jsx
├── pages/
│   ├── Home.jsx
│   ├── ProductList.jsx
│   ├── ProductDetail.jsx
│   ├── Cart.jsx
│   ├── Login.jsx
│   └── NotFound.jsx
├── App.jsx
├── main.jsx
└── index.css
```

The API folder handles requests, and the hooks folder contains reusable stateful logic.
Authentication lives in context, the cart lives in the store, and pages are connected through the shared layout and routes.

## Reasoning Questions

### 1. State choices

The signed-in user lives in AuthContext with useReducer because several components need the same login state.
The cart lives in Zustand because quantities change frequently and components can subscribe to only the values they need.
Filter values live in the URL so a filtered view can be refreshed or shared, while the product list stays in the ProductList instance of useFetch because it is API data used by that page.
The theme lives in useLocalStorage in NavBar so the preference is saved between visits and applied to the whole application.

### 2. Context versus store

Authentication changes mainly on login and logout, so Context with reducer actions is enough for it.
The cart changes more often, and Zustand selectors let the navigation subscribe to the item count while the detail page selects only addItem.
Putting the cart in a single Context value could make consumers that only need an action re-render whenever quantities change.
Using Zustand for authentication could work, but this project uses Context to keep the small login state and its actions together and meet the assignment requirements.

### 3. Custom hooks

useFetch shares the loading logic, reducer transitions, error handling and request cleanup between ProductList and ProductDetail.
Each call has its own data, error and loading state; calling the same hook does not share a product or a request cache.
When the inputs change or a component unmounts, the hook aborts its request and avoids dispatching the cancelled result.
This follows the distinction between shared logic and separate state in the [React custom hooks documentation](https://react.dev/learn/reusing-logic-with-custom-hooks).

### 4. Route parameters

The id returned by useParams is a string, even when the URL contains a number such as /products/3.
ProductDetail passes that string to fetchProduct, which inserts it into the request URL, so no number conversion is needed there.
The id is also a dependency of the product-loading callback, which makes the hook load another product when the route parameter changes.
Cart comparisons use product.id from the API response rather than comparing it directly with the route string, avoiding a string-versus-number equality problem.

### 5. Protected routes

ProtectedRoute is a user-experience feature, not real security, because it only checks state in the browser and redirects the visitor.
The demo credentials and client code can be inspected, and someone could change browser state or call an API directly.
Real security needs server-side authentication and authorization on every protected request, using a securely managed session or verified token.

### 6. Deep links

On a plain static file server without a fallback, reloading /products/3 would usually return a server 404 because there is no file at that path.
The Vite development server works because its default SPA mode serves index.html for application routes, allowing BrowserRouter to render the matching page.
A production host needs a similar rewrite to index.html for application routes while still serving real asset files normally.
This behavior is described in the [Vite appType documentation](https://vite.dev/config/shared-options.html#apptype).

## Self-Study Notes

### Updating one query parameter

The [React Router useSearchParams documentation](https://reactrouter.com/api/hooks/useSearchParams) explains how to read URL search parameters and navigate by setting them.
In ProductList, updateFilter copies the current parameters with new URLSearchParams(searchParams), then sets or deletes only the changed key.
Passing the copy to setSearchParams keeps the other filter, so changing category does not remove the search text.

### Reading and saving the cart safely

The [Storage getItem documentation](https://developer.mozilla.org/en-US/docs/Web/API/Storage/getItem) explains that a missing key returns null.
In cartStore, loadCart returns an empty array for a missing value, catches invalid JSON and checks that the parsed value is an array before using it.
This handles missing or unparseable data, but does not fully validate every stored item's fields.
The [Zustand create documentation](https://zustand.docs.pmnd.rs/reference/apis/create) describes the attached subscribe API; the store uses it to save items outside React whenever the store changes.

### Applying a saved theme

The [MDN data attributes guide](https://developer.mozilla.org/en-US/docs/Web/HTML/How_to/Use_data_attributes) explains how dataset values can be used with CSS attribute selectors.
NavBar reads the saved preference through useLocalStorage and sets document.documentElement.dataset.theme in an effect.
The selectors in index.css, such as :root[data-theme="dark"], change the application's background and text colors, and the toggle saves the next preference.

## Demo Account

- Username: `230408003@st.biruni.edu.tr`
- Password: `demo123456`

Authentication is simulated with a short delay and resets when the page reloads; the cart and theme remain saved.

## Challenges and Learning
During this project, I faced several challenges:

- **ESLint Errors:** I encountered parsing errors and React Fast Refresh warnings while developing components.
- **React Hooks:** I had difficulties managing useEffect dependencies in my custom useFetch hook.
- **Git and GitHub:** I experienced problems with staging files, creating commits, and pushing changes.
- **Authentication:** Connecting Context API, useReducer, and protected routes required additional debugging.
- **State Management:** Integrating Zustand with the shopping cart and LocalStorage was challenging.
- **Dark Mode:** I had to fix inconsistent background colors and duplicated navigation titles.
- **Component Integration:** Connecting the product list, product details, and shopping cart required careful testing.

Due to my intensive exam schedule, I had to complete the project in a limited time. Despite these challenges, I tried to solve the errors step by step and learned more about React, debugging, and project organization.

## Testing
I tested the main application features and successfully ran:
```bash
npm run lint
npm run build
```

## How to Run
```bash
npm install
npm run dev
```

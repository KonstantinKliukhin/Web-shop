
# Web shop
This is a technical task made at the request of the employer.

### The project is made with React(class components according to the task), redux, sass, opus, react-helmet, classnames and interweave. 
Here I tried to adhere to the principle of aggregation in components structure.
Here I used opus to get data from the server, because within this project, apollo looks too heavy and inconvenient, given that only class components are allowed.

## It contains the folowing folders:

- **assets**. It contains general styles and images used in project
- **data**. It contains all general variables in project. Now there isn't much data there, but as the project expands, this folder can grow significantly.
- **utils**. It contains functions that are reused in the project.
- **services**. It contains:
    - graphql queries
    - settings for opus client(opus client is client from opus library that helps with fetching data from grafql server)
    - function for working with browser storage
- **components**. It contains all components that aren't pages. Each component can contain its style, some tools, wich is necessary only in this component, and its layout.
- **pages**. It contains all existing pages in the project. The structure of each page is same to component structure.
- **types**. It contains general prop-types for components.
- **store**. It contains redux store settings.
- **middleware**. It contains store middlewares.
- **selectors**. It contains all selectors which is used in components.
- **slices**. It contains all slices with their actions. 

## Pages description

- **Products page**. This page render ProductsList component.
- **CartPage**. This page render Cart component.
- **Page404**. This page render error heading and ErrorMessage.
- **SingleItemPage**. This page gets active product data from store, pass its images to ProductMedia, pass its data to ItemDescription and render 'Add to cart button' depends on price and inStock product data. There are SingleItemLayout and transformToDescriptionJSX for interweave in this folder.

## Components description

- **App**. It contains all routes with their components(pages), there used suspense and lazyloads for pages.
- **Cart**. This component gets store information about users cart, then it passes the product data to the cartlist component, places the general data about the cart (such as the number of products, the total cost, etc.) and renders depending on the type of cart(mini or main). There is CartLayout in cart folder.
- **CartList**. This is UI component that gets list of cart products and places each product data in cartItem.
- **CartItem**. This component gets product data, decides whether the slider will be shown, passes function that changes cart item count and pass another product data to itemDescription.
- **ItemDescription**. This component is used in CartItem and SingleItemPage. It takes data about product, render it and pass product attributes data in list of itemAttribute.
- **ItemAtributes**. This component takes data about product attribute and render it depending on the type of attribute and disable rules got from props.
- **NavBar**. This component gets categories data from store and render Links(from react-router-dom) with this categories. Also this component contains NavActions.
- **NavActions**. This component gets currencies data from store and place it with changeActiveCurrency function in DropDownList, also it contains DropDownMenu to which it passes Cart. There is js styles for DropDownList and DropDownMenu in this folder.
- **ProductsList**. This component gets products data dependencing on active category from store and place it in list of ProductCard.
- **ProductCard**. This component gets data from props, decides whether a product can be added to the cart and render product data. Also it gets function for adding product in Cart.
- **ErrorBoundary**. This is common ErrorBoundary component.
- **ErrorMessage**. It is a simple component that render only error image.
- **Spinner**. It is a simple component that render only spinner animated svg.
- **HOC**. It is folder with HOCs. There is one HOC now which sets content depends on path, categories and active category.
- **DropDownList**. This is UI component, that render data from props, changes its activeState and decides whether the list open.
- **DropDownMenu**. This component manage its open-state and shows component from props if it is in open-state.
- **ProductMedia**. This component places all children to the left of the large active element. All children are placed in a slider which height depends on the given height of the large element.
- **slider**. It is a simple UI component-slider.

## Middleware
- **getApi**. This middleware checks if the action is a query and in this case creates pending action , then it sends a request and then creates fulfilled action or error action. It allows to achieve a syntax similar to createAsyncThunk from redux tollkit.

## Selectors
- **priceSelector**. There is two selectors for getting correct currency from products price or any another price.

## utils
- **debounce**. It is a very simple debounce function that takes callback and timeout and then return debounced callback.
- **setContent**. This is very useful function that returns component depends on loading state(s). 

## How to run

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


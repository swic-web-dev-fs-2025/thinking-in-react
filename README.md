# 🤔 The Thinking 🧑🏾‍🌾 Farmer's Market

An interactive React application demonstrating component-based thinking through a filterable product catalog. This project serves as an enhanced version of React's [Thinking in React](https://react.dev/learn/thinking-in-react) tutorial, designed to help you learn modern React development patterns through hands-on exploration.

## What You'll Find Here

This application lets you explore a product catalog with several interactive features. You can search for products by name in real-time, watching the list update as you type. The catalog supports multiple sorting strategies so you can organize products by category, alphabetically by name, or by price in either direction. A price slider lets you filter out items above your budget, and a checkbox toggle shows only items currently in stock. When your filters produce no results, the interface provides specific feedback about which conditions are blocking results—for example, "No products matching 'dragonfruit' and in stock" or "No products under $2"—helping you understand exactly what to adjust. The products organize themselves into three categories—Fruits 🍎, Vegetables 🥬, and Herbs 🌿—with headers that help you scan the list quickly. The interface adapts to both your phone and your laptop, with smooth animations that make interactions feel polished and responsive.

## Technology Choices

This project uses React 19 with hooks, which means you'll see `useState` for managing component state and a custom hook that packages up filter logic for reuse. Vite serves as both the development server and build tool, giving you instant feedback when you save a file. All the styling comes from Tailwind CSS utility classes, which might look unusual at first if you're used to writing CSS files, but this approach keeps styles close to the components they affect. Motion for React adds the smooth transitions and animations you'll notice when interacting with the interface. The project includes ESLint configuration with accessibility linting through `eslint-plugin-jsx-a11y`, which catches common mistakes like missing labels on form inputs.

## Core Patterns You'll Learn

### How Components Nest and Communicate

The component hierarchy demonstrates how to break down a user interface into manageable pieces. At the top, `FilterableProductTable` acts as the coordinator, managing all the filter state and deciding which components need what information. Below that, `SearchBar` handles all the user input controls—the search box, the dropdown menu, the slider, and the checkbox. These are all "controlled components," meaning React state drives their values rather than letting the browser's DOM manage them. The `ProductTable` component takes on the complex work of filtering and sorting the data, then rendering it as rows. Inside the table, you'll find `ProductCategoryRow` components that create visual breaks between categories, and `ProductRow` components that display each individual product with its price and stock status.

This hierarchy follows a principle called "single responsibility"—each component has one clear job. When you need to change how products display, you know to look at `ProductRow`. When you need to adjust filtering logic, you head to `ProductTable`. This organization makes your code easier to understand and modify as requirements change.

### Managing State the React Way

State management in React follows a specific pattern that might feel restrictive at first but pays dividends in larger applications. All the filter state lives in `FilterableProductTable` because that's the highest component that needs to coordinate between the search bar (which displays and changes the filters) and the product table (which applies them to the data). This pattern is called "lifting state up," and it solves a fundamental problem: how do two sibling components share information?

The custom `useFilters` hook packages up all the filter-related state and the functions that modify it into one reusable unit. If you built another filterable list later, you could extract this hook and use it again with minimal changes. This is one of React's most powerful patterns—encapsulating stateful logic so it can move between projects.

Every form input in the search bar is a controlled component. When you type in the search box, the `onChange` event captures your keystrokes and calls `setFilterText`, which updates the state, which causes a re-render, which updates what the input displays. This seems circular at first—why not just let the input manage its own value? The answer is that React's unidirectional data flow makes it much easier to understand what's happening at any moment. You always know where the "source of truth" lives: in the state, not scattered across multiple DOM elements.

### Transforming Data with Functional Methods

The filtering and sorting logic chains together `.filter()` and `.sort()` calls in a way that reads almost like English. First, filter down to products matching the search text, stock status, and price range. Then sort them according to the user's chosen strategy. This approach avoids mutating the original data (which would cause bugs that are hard to track down) and instead creates a new filtered and sorted array that React can render.

The most interesting technique here is the use of `flatMap()` to insert category headers. When you sort by category, you want a header before each new category appears. The `flatMap()` method lets you transform one array element into zero, one, or multiple output elements. For each product, the code checks whether it's the first product or whether its category differs from the previous product's category. If so, it returns an array containing both a category header and the product row. If not, it returns an array containing just the product row. The `flatMap()` method then flattens all those arrays into a single array of components ready to render.

### Conditional Rendering with Smart Feedback

The empty state demonstrates conditional rendering that provides actionable user feedback. Rather than showing a generic "No results" message, the code builds a descriptive message from the active filters. It collects conditions into an array using short-circuit evaluation—`filterText && 'matching "text"'` evaluates to the string if filterText is truthy, or `false` if not. The `.filter(Boolean)` call removes any falsy values, leaving only the active conditions. The message then formats these conditions naturally: single conditions stand alone ("No products matching 'apple'"), while multiple conditions join with commas and "and" ("No products matching 'apple', in stock and under $3"). This pattern shows users exactly which filters to adjust rather than making them guess.

## Getting Started

To run this project on your machine, first install all the dependencies by running `npm install` in your terminal. Once that finishes, start the development server with `npm run dev`. Open your browser and navigate to [http://localhost:5173](http://localhost:5173) to see the application. The development server supports hot module replacement, which is a fancy way of saying that when you save a file, your changes appear instantly in the browser without losing the application's current state. You can keep your filters active, make a code change, save the file, and watch your change appear without having to re-apply those filters.

## Testing

This project includes basic unit tests using Vitest for core utility functions. Run tests with `npm test` or `npm run test:watch` for watch mode during development.

**What's tested:** Pure functions like `parsePrice` and `generateEmptyProductMessage` demonstrate fundamental testing patterns—clear inputs, predictable outputs, no side effects. These tests cover edge cases like empty filters, single conditions, and multiple combined conditions.

**What's not tested:** Component rendering, user interactions, and the filtering/sorting logic embedded in `ProductTable` are intentionally omitted. Production applications would include comprehensive component tests using React Testing Library and end-to-end tests with tools like Playwright. This focused approach keeps the testing introduction approachable while demonstrating the core pattern: extract pure functions, test them thoroughly.

## Learning Path

This project follows the "Thinking in React" methodology that React's documentation recommends for building user interfaces. The process starts with a mockup and product data structure—imagine a designer hands you a sketch and a spreadsheet. Your first job is to break that UI into a component hierarchy based on the single responsibility principle. Each component should do one thing well. Once you've identified your components, you build a static version using only props to understand how the pieces fit together. At this stage, nothing is interactive yet—you're just proving that the structure makes sense.

Next comes the harder part: identifying the minimal state representation. Not everything needs to be in state. If you can calculate something from props or other state, it shouldn't be its own state variable. After you know what state you need, you determine where it should live by finding the common parent component that needs to coordinate between the components using that state. This is where "lifting state up" comes into play. Finally, you add inverse data flow so child components can communicate changes back to parent components through callback functions passed as props.

This project extends beyond the basic tutorial by adding advanced filtering capabilities including price range filtering and multiple sort options. It demonstrates custom hooks as a pattern for organizing and reusing stateful logic. The use of functional array methods like `flatMap()` shows modern JavaScript approaches to data transformation. The dynamic empty state feedback demonstrates how to provide actionable user guidance through conditional rendering and string composition. The styling and user experience patterns demonstrate professional-grade interface design that you can reference in your own projects.

## What You Won't Find Here

To keep your focus on React fundamentals, this demonstration intentionally omits several concepts that would appear in production applications. Type validation uses JSDoc comments rather than TypeScript, keeping the JavaScript approachable while you're still building your foundation. Error boundaries that catch rendering errors and display fallback UI aren't included because they require class components and add complexity beyond the core lesson. Comprehensive testing with unit tests, component tests, and integration tests would be essential in production but falls outside the scope of demonstrating component composition and state management.

Input validation that guards against undefined or malformed props isn't implemented—the code trusts that the data source remains consistent. Performance optimizations like memoization with `useMemo` and `useCallback`, or virtualization for handling thousands of list items, aren't necessary for this dataset size. The responsive design covers common breakpoints but doesn't address every edge case that a production application would need to handle.

These omissions are intentional teaching choices. Adding these layers would obscure the fundamental patterns you need to internalize first. Once you understand component composition, props flow, state management, and functional data transformation, you can layer on these production concerns in future projects.

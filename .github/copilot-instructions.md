# Copilot Instructions - Thinking in React

This is a React educational project demonstrating the "Thinking in React" methodology with a searchable product table. Built with modern React patterns, Vite, and Tailwind CSS.

## Project Architecture

- **Tailwind CSS 4**: Utility-first styling via `@tailwindcss/vite` plugin
- **Data Layer**: Simple product data exported from `src/db.js`

## Key Files & Structure

- `src/app.jsx`: Main app component (currently minimal)
- `src/db.js`: Static product data array with `{category, price, stocked, name}` structure
- `src/main.jsx`: React root rendering with StrictMode
- `src/index.css`: Single import for Tailwind CSS base styles
- `vite.config.js`: Vite setup with React and Tailwind plugins

## Development Patterns

### Component Structure

- Use functional components with hooks (React 19 patterns)
- Follow "Thinking in React" methodology: break UI into component hierarchy
- Expected components: FilterableProductTable, SearchBar, ProductTable, ProductCategoryRow, ProductRow
- Colocate the components when feasible. There is no need for spreading 'one off' components into separate files.

### Data Handling

- Product data structure: `{category: string, price: string, stocked: boolean, name: string}`
- Import data from `src/db.js` as default export
- Handle filtering by text search and stock status

### Styling Approach

- Use Tailwind CSS utility classes
- No custom CSS beyond the Tailwind import
- Focus on clean, accessible UI components

## Implementation Notes

- This is an educational project focused on React component design patterns
- Keep components simple and focused on demonstrating React concepts
- State management should use useState for search/filter functionality
- Follow the original React docs example but with modern hooks-based approach
- Ensure accessibility in form controls and table structure

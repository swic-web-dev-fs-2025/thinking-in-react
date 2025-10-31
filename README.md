# 🤔 The Thinking 🧑🏾‍🌾 Farmer's Market

An interactive React app demonstrating component-based thinking through a filterable product catalog. Built as an enhanced version of React's [Thinking in React](https://react.dev/learn/thinking-in-react) tutorial.

## Features

- **Search** - Filter products by name in real-time
- **Sort** - By category, name (A-Z), or price (high/low)
- **Price filter** - Slider to set maximum price
- **Stock filter** - Toggle to show only in-stock items
- **Category grouping** - Products organized by Fruits 🍎, Vegetables 🥬, and Herbs 🌿
- **Responsive design** - Works on mobile and desktop
- **Smooth animations** - Powered by Motion for React

## Tech Stack

- React 18 with hooks (`useState`, custom hooks)
- Vite for development and build
- Tailwind CSS for styling
- Motion for React for animations

## Key Concepts Demonstrated

### Component Hierarchy

- `FilterableProductTable` - Root component managing filter state
- `SearchBar` - Controlled form inputs
- `ProductTable` - Data filtering, sorting, and rendering
- `ProductCategoryRow` - Category headers
- `ProductRow` - Individual product display

### State Management

- Filter state lifted to parent component
- Custom `useFilters` hook for reusable filter logic
- Controlled components for all form inputs

### Data Transformation

- Functional `.filter()` and `.sort()` chaining
- `flatMap()` for inserting category headers
- Multi-level sorting (category → name)

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view.

## Learning Path

This project follows the "Thinking in React" methodology:

1. Start with a mockup and product data
2. Break UI into component hierarchy
3. Build static version with props
4. Identify minimal state representation
5. Determine where state should live
6. Add inverse data flow (child → parent communication)

Then extends it with:

- Advanced filtering (price, sorting, stock)
- Custom hooks for state management
- Functional array methods (`flatMap`)
- Professional styling and UX patterns

# 🐶 Shelter Dog Finder

This is a React application built with Vite and pnpm that helps users search for shelter dogs based on their location and preferences. Users can enter a city, state, and search radius to find adoptable dogs nearby. The app also provides filtering options (by breed, etc.), allows users to favorite dogs, and features a **Generate Match** button to help users find their perfect dog.

## 🚀 Features

- **Search Shelter Dogs**: Input city, state, and radius to discover available dogs.
- **Filter & Sort**: Filter by breed and other attributes to refine search results.
- **Favorites List**: Save dogs to a favorites list for easy access.
- **Generate Match**: Get a suggested dog match based on selected preferences.

## 🛠️ Setup & Installation

### Prerequisites

- **Node.js** (LTS recommended)
- **Pnpm** (Package manager)
- **Vite** (Bundler - already configured)

### Installation Steps

1. **Clone the repository**

```sh
git clone https://github.com/your-username/shelter-dog-finder.git
cd shelter-dog-finder
```

2. **Install dependencies**

```sh
pnpm install
```

3. **Start the development server**

```sh
pnpm dev
```

4. Open in your browser
   Vite will provide a local development URL (typically http://localhost:5173).

## 📁 Project Structure

```bash
📂 shelter-dog-finder
├── 📁 src
│   ├── 📁 components   # Reusable UI components
│   ├── 📁 context      # Global state management
│   ├── 📁 data         # Static or mock data files
│   ├── 📁 hooks        # Custom hooks
│   ├── 📁 pages        # Page-level components
│   ├── 📁 services     # API calls and external data fetching
│   ├── 📁 types        # TypeScript type definitions
│   ├── 📁 utils        # Helper functions and utilities
│   ├── App.tsx        # Root component
│   ├── main.tsx       # Entry point
│
├── 📄 package.json     # Dependencies and scripts
├── 📄 vite.config.ts   # Vite configuration
├── 📄 README.md        # Project documentation
```

## 🎯 Future Improvements

- User authentication to save favorite dogs persistently.
- Improved UI/UX with animations and better responsiveness.
- More advanced matching algorithm for dog recommendations.

## 📜 License

This project is licensed under the MIT License.

Enjoy finding your perfect shelter dog! 🐕💖

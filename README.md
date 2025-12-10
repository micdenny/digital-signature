# Digital Signature

Project to POC a digital signature over a web app that can be opened on pad and smartphone.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) using the TypeScript template.

## Development

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

### Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/micdenny/digital-signature.git
   cd digital-signature
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The app will open in your browser at [http://localhost:3000](http://localhost:3000).

The page will automatically reload when you make changes to the code. You will also see any lint errors in the console.

### Running Tests

Launch the test runner in interactive watch mode:
```bash
npm test
```

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Code Quality

The project includes ESLint configuration for React and TypeScript. Linting is automatically performed during the build process.

## Build

### Production Build

Build the app for production:
```bash
npm run build
```

This creates an optimized production build in the `build` folder. The build is minified and the filenames include content hashes for caching.

Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Technology Stack

- **React** 19.2.1 - UI library
- **TypeScript** 4.9.5 - Type-safe JavaScript
- **React Scripts** 5.0.1 - Build tooling and configuration
- **Testing Library** - Testing utilities for React components

## Project Structure

```
digital-signature/
├── public/          # Static files
│   ├── index.html   # HTML template
│   └── ...
├── src/             # Source files
│   ├── App.tsx      # Main application component
│   ├── index.tsx    # Application entry point
│   └── ...
├── package.json     # Project dependencies and scripts
└── tsconfig.json    # TypeScript configuration
```

## Learn More

- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React documentation](https://reactjs.org/)
- [TypeScript documentation](https://www.typescriptlang.org/)

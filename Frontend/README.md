# @cpTech/root-config

This repository serves as the root configuration for a **Single-SPA** application. It orchestrates multiple micro-frontends and provides the foundational setup for the micro-frontend architecture.

## Prerequisites

Ensure the following are installed on your machine:
- Node.js (>= 14.x.x)
- npm (>= 6.x.x)
- PowerShell (for Windows users, required to run certain scripts)

## Folder Structure

The project structure is as follows:
```
root-config/
reactNavbar/
reactHomepage/
reactAboutPage/
reactServicePage/
reactLoginPage/
reactdashboard/
reactFooter/
reactSidebar/
```

### Development

- **Start the Root Config**
  ```bash
  npm start
  ```
  Starts the root configuration server locally on port 9000 with `webpack-dev-server`.

- **Start All Applications**
  ```bash
  npm run start:all
  ```
  Runs all micro-frontends in standalone mode concurrently.

### Installation

- **Install Dependencies for All Applications**
  ```bash
  npm run install-all
  ```
  Runs the `install-all.ps1` script to install dependencies for all micro-frontends and the root-config.

### Testing

- **Run Tests**
  ```bash
  npm run test
  ```
  Runs the test suite using Jest.

### Build

- **Build the Project**
  ```bash
  npm run build
  ```
  Builds the project for production by running all build-related tasks concurrently.

- **Build with Webpack**
  ```bash
  npm run build:webpack
  ```
  Executes the Webpack build process in production mode.

## Running the Application

1. Clone the repository.
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the root-config directory.
   ```bash
   cd root-config
   ```

3. Install dependencies.
   ```bash
   npm install
   ```

4. Start the application.
   ```bash
   npm start
   ```
3. Install dependencies for all micro-frontends.
   ```bash
   npm run install-all
   ```

5. To run all micro-frontends in standalone mode:
   ```bash
   npm run start:all
   ```

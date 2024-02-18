# Robinhood Software Engineer Examination

Welcome to the examination for the Software Engineer role at Robinhood. This repository contains the source code and tests for the examination.

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/tomhannarong/Robinhood.git

   ```

2. Install dependencies:

   ```bash
   npm install
   ```

To install and run this project locally, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Install the necessary dependencies by running:
4. Start the application by running:
5. Access the application through your web browser at `http://localhost:3000`.

## Provided Users

```
| Username  | Password      |
|-----------|---------------|
| sivensyM  | QntaH3bw250h  |
| piezyGLe  | 1hOP5WG2UAsn  |
```

### Usage

1. Start the server:

   ```bash
   npm run dev
   ```

To use this application, follow these steps:

1. Navigate to the [Login Screen](http://localhost:3000/auth/login) URL.
2. Log in with your credentials.
3. After successful authentication, you will be redirected to the [Main Screen](http://localhost:3000/dashboard) URL.
4. Explore the features and functionalities available on the main dashboard.

### Folder Structure

```bash
project-root/
│
├── app/            # Source code directory
│   ├── __tests__/  # Jest test files
│   ├── auth/
│   │     ├── login/
│   │     │     ├── page.tsx
│   ├── components/
│   ├── constants/
│   ├── dashboard/
│   │     ├── page.tsx
│   ├── hocs/
│   ├── hooks/
│   ├── services/
│   │   ├── mockData/
│   ├── types/
│   └── ...
├── e2e/            # Playwright test files
│   └── ...
├── public/
```

### Running Tests

Instructions for running the tests using Jest and Playwright.

#### Run Unit Tests

```bash
npm run test
```

#### Run Unit Test Coverage

```bash
npm run test:coverage
```

#### Run End-to-End Tests

```bash
npm run test:e2e
```

#### Run End-to-End Tests with UI

```bash
npm run test:e2e:ui
```

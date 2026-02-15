# SonarQube React Demo

A React + TypeScript demo project with Vitest testing and SonarQube integration for static code analysis.

## Tech Stack

- **React 18** with TypeScript
- **Vite** - Build tool and dev server
- **Vitest** - Unit testing framework
- **Testing Library** - React component testing
- **SonarQube** - Static code analysis

## Project Structure

```
src/
├── components/
│   ├── Counter.tsx
│   ├── LoginForm.tsx
│   └── TodoList.tsx
├── utils/
│   ├── calculator.ts
│   ├── formatters.ts
│   └── validators.ts
├── __tests__/
│   ├── Counter.test.tsx
│   ├── LoginForm.test.tsx
│   ├── TodoList.test.tsx
│   ├── calculator.test.ts
│   ├── formatters.test.ts
│   └── validators.test.ts
├── App.tsx
├── main.tsx
└── setupTests.ts
```

## Prerequisites

- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)
- **Docker** (for running SonarQube server)
- **Java 17+** (only if running SonarQube without Docker)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### 3. Build for Production

```bash
npm run build
```

### 4. Preview Production Build

```bash
npm run preview
```

## Testing

### Run Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

Coverage reports are generated in the `coverage/` directory in `text`, `lcov`, and `clover` formats.

## SonarQube Setup and Analysis

### Step 1: Start the SonarQube Server

Using Docker:

```bash
docker run -d --name sonarqube -p 9000:9000 sonarqube:community
```

Wait 1-2 minutes for the server to start, then open http://localhost:9000.

- Default credentials: `admin` / `admin`
- You will be prompted to change the password on first login

**Without Docker:** Download [SonarQube Community Edition](https://www.sonarsource.com/products/sonarqube/downloads/), extract it, and run:

- **Windows:** `bin\windows-x86-64\StartSonar.bat`
- **Mac/Linux:** `bin/linux-x86-64/sonar.sh start`

Requires Java 17+ installed.

### Step 2: Create a Project in SonarQube

1. Log in at http://localhost:9000
2. Click **Create a local project**
3. Set **Project display name** and **Project key** to `sonarqube-react-demo`
4. Set **Main branch name** to `main`
5. Click **Next**, choose **Use the global setting**, then **Create Project**
6. Under **Analysis Method**, choose **Locally**
7. Generate a token and copy it

> If you can't find the create button, navigate directly to http://localhost:9000/projects/create

### Step 3: Generate Coverage Report

```bash
npm run test:coverage
```

This creates the `coverage/lcov.info` file that SonarQube uses for coverage data.

### Step 4: Run the SonarQube Scanner

```bash
npx sonar-scanner --define sonar.token=YOUR_TOKEN_HERE
```

**Command line equivalent (without sonar-project.properties):**

```bash
npx sonar-scanner \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.projectKey=sonarqube-react-demo \
  -Dsonar.projectName="SonarQube React Demo" \
  -Dsonar.projectVersion=1.0.0 \
  -Dsonar.sources=src \
  -Dsonar.tests=src/__tests__ \
  -Dsonar.test.inclusions="src/__tests__/**/*.test.ts,src/__tests__/**/*.test.tsx" \
  -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
  -Dsonar.sourceEncoding=UTF-8 \
  -Dsonar.exclusions="**/node_modules/**,**/coverage/**,**/dist/**,src/main.tsx,src/vite-env.d.ts,src/setupTests.ts" \
  -Dsonar.token=YOUR_TOKEN_HERE
```

### Step 5: View Results

Open http://localhost:9000/dashboard?id=sonarqube-react-demo to see:

- **Bugs** - Potential bugs in the code
- **Vulnerabilities** - Security vulnerabilities
- **Code Smells** - Maintainability issues
- **Coverage** - Test coverage percentage
- **Duplications** - Duplicated code blocks
- **Security Hotspots** - Code that needs security review

## Available Scripts

| Script          | Command                 | Description                         |
| --------------- | ----------------------- | ----------------------------------- |
| `dev`           | `npm run dev`           | Start Vite dev server               |
| `build`         | `npm run build`         | Type-check and build for production |
| `preview`       | `npm run preview`       | Preview production build            |
| `test`          | `npm test`              | Run tests once                      |
| `test:watch`    | `npm run test:watch`    | Run tests in watch mode             |
| `test:coverage` | `npm run test:coverage` | Run tests with coverage report      |
| `sonar`         | `npm run sonar`         | Run SonarQube scanner               |

# Few Tips

sonar-project.properties is automatically read by the scanner. So the workflow is:

npm run test:coverage — generates coverage/lcov.info
npx sonar-scanner --define sonar.token=YOUR_TOKEN — runs the scan, automatically reads sonar-project.properties for all other config (project key, sources, coverage path, etc.)
You're correct that plain npm test won't generate coverage. The sonar.javascript.lcov.reportPaths=coverage/lcov.info on line 15 of your properties file expects that file to exist, so test:coverage must run first.

Yes, sonar.args is typically a pipeline variable where you can pass additional -D properties to the scanner. You can add the coverage path there like:

sonar.args=-Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
The exact syntax depends on your CI setup. For example, in a GitHub Actions workflow using the SonarQube action, it would look something like:

- name: SonarQube Scan
  uses: sonarsource/sonarqube-scan-action@master
  with:
  args: >
  -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info

Output

`npm run test`

> sonarqube-react-demo@1.0.0 test
> vitest run && vitest run --coverage

RUN v4.0.18 C:/Users/srina/sonarqube-react-demo

✓ src/**tests**/validators.test.ts (12 tests) 8ms
✓ src/**tests**/calculator.test.ts (14 tests) 7ms
✓ src/**tests**/formatters.test.ts (12 tests) 99ms
✓ src/**tests**/Counter.test.tsx (8 tests) 440ms
✓ src/**tests**/TodoList.test.tsx (8 tests) 1445ms
✓ adds a todo item 358ms
✓ src/**tests**/LoginForm.test.tsx (6 tests) 2852ms
✓ shows error for invalid email 504ms
✓ shows error for weak password 500ms
✓ calls onSubmit with valid credentials 569ms
✓ does not call onSubmit with invalid form data 308ms
✓ clears errors on valid resubmission 867ms

Test Files 6 passed (6)
Tests 60 passed (60)
Start at 11:31:42
Duration 27.24s (transform 940ms, setup 22.21s, import 9.64s, tests 4.85s, environment 100.95s)

RUN v4.0.18 C:/Users/srina/sonarqube-react-demo
Coverage enabled with v8

✓ src/**tests**/formatters.test.ts (12 tests) 28ms
✓ src/**tests**/validators.test.ts (12 tests) 9ms
✓ src/**tests**/calculator.test.ts (14 tests) 9ms
✓ src/**tests**/Counter.test.tsx (8 tests) 556ms
✓ src/**tests**/TodoList.test.tsx (8 tests) 1610ms
✓ adds a todo item 373ms
✓ src/**tests**/LoginForm.test.tsx (6 tests) 2886ms
✓ shows error for invalid email 494ms
✓ shows error for weak password 462ms
✓ calls onSubmit with valid credentials 602ms
✓ does not call onSubmit with invalid form data 332ms
✓ clears errors on valid resubmission 886ms

Test Files 6 passed (6)
Tests 60 passed (60)
Start at 11:32:11
Duration 4.93s (transform 238ms, setup 1.14s, import 1.09s, tests 5.10s, environment 5.99s)

% Coverage report from v8
----------------|---------|----------|---------|---------|-------------------
File | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------------|---------|----------|---------|---------|-------------------
All files | 96.66 | 97.67 | 95 | 96.34 |  
 src | 0 | 100 | 0 | 0 |  
 App.tsx | 0 | 100 | 0 | 0 | 6-10  
 src/components | 100 | 95 | 100 | 100 |  
 Counter.tsx | 100 | 100 | 100 | 100 |  
 LoginForm.tsx | 100 | 100 | 100 | 100 |  
 TodoList.tsx | 100 | 87.5 | 100 | 100 | 27  
 src/utils | 100 | 100 | 100 | 100 |  
 calculator.ts | 100 | 100 | 100 | 100 |  
 formatters.ts | 100 | 100 | 100 | 100 |  
 validators.ts | 100 | 100 | 100 | 100 |  
----------------|---------|----------|---------|---------|-------------------

# Inclusions and Exclusions in two places

vite.config.ts — tells Vitest what to measure when generating the coverage report (which files to include/exclude, output format, output directory)
sonar-project.properties — tells SonarQube what to analyze and where to find reports

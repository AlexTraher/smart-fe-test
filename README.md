# Smart FE Test
Front end coding test for [Smart Pension](https://www.smartpension.co.uk/)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can also run a production build of the app by running

```bash
npm run build
npm start
```

## Testing
This app has 100% test coverage (with a few ignores!), that is gated by Jest. This is run by default when running 

```bash
npm run test
```

You can also run the tests with a node debugger by running

```bash
npm run test:debug
```

## Linting & Code Formatting
You can run linting with 
```bash
npm run lint
```

Prettier is also installed:
```bash
npm run prettier
```

## With More time
I'd have liked to have written some Cypress tests to validate the functionality closer to a user. I also think some of the test mocks could be shared. 

I also think some more sophisticated error states wouldn't go amiss.
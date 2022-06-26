# peaqScan

peaqScan is a blockchain explorer. It is used to visualize blockchain data from the Agung network. It can also be used for any other substrate-based network like Polkadot, etc.

# Architecture

peaqScan was bootstrapped with Create React App (CRA) to leverage the component-based architecture and reaction to app state with hooks. The freedom to structure the application rather than be restricted to a particular pattern was also a consideration.

# Technologies
The following technologies have been used in different parts of the application:
●	Application - React (Hooks and functional components)
●	Global state management - Redux, Redux Toolkit
●	Routing - React Router
●	Jest and React Testing Library for testing
●	Testing - Jest, React Testing Library
●	Styles - Global CSS definitions
●	Data pipeline - PolkadotJS API, Subsquid




## Local installation

To run the project locally:

- clone project repo
- `cd` into project folder
- install dependencies `npm install`
- start project `npm start`

Project should be running on http://localhost:3000 or the next available subsequent port number.

## Production build

To build static files for production

- `npm run build`

The static files can be located in `/build` folder.


# UI Development

### Technologies
- webpack - builds assets and places them in configured locations
- babel - provides transpilation plugins to normalize for ES6, SCSS
- React - javascript markup rendering
- Redux (eventually) - complex data store management
- Split.js - in-window pane-control

### Getting started

1. `cd` into `~/node`
1. `npm install`
1. `npm run webpack` this will compile the assets and start the webpack dev server
1. visit port designated in webpack server output

### Scripts

Scripts are defined in the `package.json` and provide project-specific functionality.
    - `npm run test` - runs our tests!
    - `npm run webpack` - this will compile the assets and start the webpack dev
    - `npm run build` - runs the `prod` build
    - `npm run start` - starts the node server



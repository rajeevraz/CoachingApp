## New Branch Workflow:

### 1. Create new branch for each new feature you work on
    a. Checkout Master branch with "git checkout master"
    b. Create new branch from master with "git checkout -b <new-branch>"
    c. Add changes
    d. Commit `git commit -m "message"`
    e. Push `git push`
    
### 2. Creating Pull Requests
To learn, check out the [How to Create Pull Requests](https://help.github.com/en/desktop/contributing-to-projects/creating-a-pull-request).

## Available Scripts

### `First Run for Development?`
### `RUN`
    1. npm run install
    2. npm run prod
    3. npm run livedev

In the project directory, you can run:

### `npm run livedev`

Dev server will run which will watch if any file changes and updates instantly.

### `npm run prod`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `npm run deploy`
1. Make sure you are logged in via firebase-tools cli into CQREF Account
2. run deploy in the command prompt.

### `npm test`
Launches the test runner in the interactive watch mode.<br>
Pending to integrate with cypress.

## Learn More

You can learn more about webpack at [Webpack](https://webpack.js.org/).
To learn React, check out the [React documentation](https://reactjs.org/).

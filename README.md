# node-streamelements
An unofficial wrapper for the StreamElements API.

**[Official StreamElements API Documentation](https://dev.streamelements.com)**

## Install
Install the `node-streamelements` package from the NPM repository, using `--save` to update your `package.json`:

```bash
npm install node-streamelements --save
```

## API Reference
Some calls require few, specific options and are required method arguments. More complex calls, such as `create` or `update` operations require more detailed options. Reference the official documentation for type requirements and object structure.

## Usage
Import the package, create a new instance using your Account ID and JWT Token (found in your account profile), and call methods which return promises.

```javascript
const StreamElements = require('node-streamelements');

const myInstance = new StreamElements({
  token: 'YourJWTToken',
  accountId: 'YourAccountID'
});

// Get current song in queue.
myInstance
  .getCurrentSong()
  .then((response) => {
    console.log(`Current song is ${response.title}.`);
  })
  .catch((error) => {
    console.log(error);
  });
```

## Using Unimplemented Endpoints
In the event the API sees a non-major version bump which introduces new functionality, you may call `makeRequest()` directly until a new `node-streamelements` package version is available.

### Updating Third-party Channels
Even though your current instance may be tied to a specific channel, you may optionally override the channel being requested upon by passing its ID into methods. For example:

```javascript
myInstance
  .getCurrentSong('CHANNELID')
  .then((response) => {
    console.log(`Current song is ${response.title}.`);
  })
  .catch((error) => {
    console.log(error);
  });
```

**NOTE:** In order for this to work, you must be given Manager permissions for the target channel.

## Contributing
To contribute to the package, please follow the forking model:

1. Fork the repository to your own account.
1. Create a branch off `master`.
1. Apply your changes and commit to your branch.
1. Open a pull request against the central `develop` branch.

Your pull request will be reviewed by Maintainers, feedback will be provided if necessary, and then merged. Please, do not bump the package version in your pull request.

## Disclaimer
This package was created to help reduce the amount of code manually written for each project wishing to work with the StreamElements API. In no way is this project officially endorsed, maintained, or approved by StreamElements.
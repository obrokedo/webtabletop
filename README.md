<<<<<<< HEAD
## Learning Resources
### NodeJs
https://github.com/nodejs/docker-node/blob/master/README.md#how-to-use-this-image

https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md

### Socket.io
https://socket.io/get-started/chat/
=======
# WebTableTop
A web application for playing tabletop games through a browser. WebTableTop relies on an authorative server to guarentee client state synchronization and provides hosts the ability to specify the amount of "trust" each client should have.

## Architecture
TODO
- **socket.io** - Persistent connection between webclient and application server.
- **react** or **svelte**
- **nodejs** - Application server implementing socket.io to communicate game state with the browser and using express to serve static resources. Stateless (storage via postgresql or reddis)
- **npm** - Dependency management
- **postgresql** - Long term game state storage
- **reddis** - Potentially shortterm (cachelike) game state storage
- **webrtc** - Voice and video plugin

## Running the server
For local development a node server can be build and started in docker using the commands given below. This will allow the app to be accessed on the local network via a browser.

### Prerequistes
docker
docker-compose
web browser


### Building the application server
After cloning this repository navigate to the `node` directory. The `package.json` describes which plugins will be installed for the node server as well as the `app.js` entrypoint. Prior to starting the server, Docker will also compile static assets and place them into the container in the `/dist` directory.

**To build the required images:**

  `docker-compose build`

**Note:** Any time that you make changes to the `Dockerfile` or `package.json` (as opposed to static resources or the application itself) this command will need to be run again to pick up the changes.

### Starting the application server
After the Docker images have been created you may start the container with the options configured in the `docker-compose.yml` file.

  `docker-compose up`

This will mount your current directory to a location inside the docker container and make it's contents available to the container. File changes made to staticly served resources should be made available on page reload. Changes to the `app.js` or other server components will require that the docker container be restarted.

  `docker-compose restart`

### Accessing the server
When the docker containers have finished startup processes your application server should now be available on the local network on port 8081. To determine the IP of that you should navigate to run:

  `docker-machine ip`

### Stopping the application server
Once you are done with the application server you can shut it down using the following command.

  `docker-compose down`

## Learning Resources
### NodeJs
https://github.com/nodejs/docker-node/blob/master/README.md#how-to-use-this-image

https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md

### Socket.io
https://socket.io/get-started/chat/

### Docker
https://docs.docker.com/
>>>>>>> origin/master

# Clone and Change Instructions

After cloning the repository and installing dependencies, follow the steps below to configure the server:

### Update `vite.config.js`

1. Open the `vite.config.js` file.
2. Find the `server` configuration and replace the `host` value with your local IP address:

```js
server: {
    host: "YOUR_LOCAL_IP_ADDRESS", /// Replace with your IP address
    port: "3000",
}


// install some packages
1. redux install
2. npm i jwt-decode
3. npm i socket.io-client
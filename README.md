# Bunkmate
This is the repository for the Bunkmate Web application.
```
cd my-app && npm install
cd server && npm install
```
Then use `npm start` to start the development servers.

Set the following environment secrets (.env) in the client:
```
VITE_GOOGLE_MAPS_API_KEY = <your google maps api key>
REACT_APP_STREAM_API_KEY = <your stream api key>
```
Set the following environment secrets (.env) in the server:
```
STREAM_API_KEY = <your stream api key>
STREAM_PRIVATE_API_KEY = <your private stream api key>
CONNECTION_URL = <your MongoDB connection URI>
PORT= <port to run application>
```

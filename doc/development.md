# Running a local web server

The [http-server](https://www.npmjs.com/package/http-server) NPM package offers
a simple way to serve web pages locally. To install this package first run 
(with superuser privileges as needed):

> npm install http-server -g

Then to start the server, run the following command in the project root:

> http-server src/

By default, the server is then available at [localhost:8080](http://127.0.0.1:8080)

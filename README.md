kent.com.ua (client)
====================

Basic usage how-to:

```
git clone git@github.com:piezo/kent.com.ua.git
cd kent.com.ua
npm install
node app.js
```

browse `localhost:8080`

Client testing (current version)
--------------------------------

Run the server as shown below and use one of follow urls

```
http://localhost:8080/#!/login
http://localhost:8080/#!/upload
http://localhost:8080/#!/remind
http://localhost:8080/#!/thanks
http://localhost:8080/#!/rules
http://localhost:8080/#!/feedback
```

Also try to use Forward/Back browser buttons

Build assets
------------

If any .less file was changed, use `grunt` to generate `assets/css` files.
How-to:

Uninstall old grunt if exists
`npm uninstall -g grunt`
Then install CLI version
`npm install -g grunt-cli`
Then go to current project folder, and update dependencies
`npm install` (in the project folder!)


TODO
----

* Link forms with routes (frontend <> backend)
* Request cluster services for data/actions
* Internal deploying support
* Complete authorization logic
* Beer and sleep ; )

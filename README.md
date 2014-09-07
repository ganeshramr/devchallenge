


## Prerequisites
Make sure you have installed all these prerequisites on your development machine.
* Node.js - [Download & Install Node.js](http://www.nodejs.org/download/) and the npm package manager, if you encounter any problems, you can also use this [Github Gist](https://gist.github.com/isaacs/579814) to install Node.js.

* Bower - You're going to use the [Bower Package Manager](http://bower.io/) to manage your front-end packages, in order to install it make sure you've installed Node.js and npm, then install bower globally using npm:

```
$ npm install -g bower
```

* Grunt - You're going to use the [Grunt Task Runner](http://gruntjs.com/) to automate your development process, in order to install it make sure you've installed Node.js and npm, then install grunt globally using npm:

```
$ sudo npm install -g grunt-cli
```


To install Node.js dependencies you're going to use npm again, in the application folder run this in the command-line:

```
$ npm install
```

To install Node.js dependencies you're going to use npm again, in the application folder run this in the command-line:

```
$ bower install
```



## Running Your Application
After the install process is over, you'll be able to run your application using Grunt, just run grunt default task:

```
$ grunt or $ node server.js
```

Your application should run on the 3000 port so in your browser just go to [http://localhost:3000](http://localhost:3000)
                            
That's it! your application should be running by now.

Key Design Notes

FOLDER ORGANIZATION : When it comes to marriying two MVC technologies (Angular and Express) organizaing the folders by itself is a challenge. There is no defacto standard , but i particularly liked what MEAN.js did, taking a modular approach. The modules in 'public' (angular) are all independent having their own routs,views,controlles etc. Clear seperation of concenrs.

DATA PROVIDER: Angular reaches out to Node server in the background for data.The interaction with the spotify API is done thorough a node wrapper  spotify-web-api-node which uses restler and is a nice promise based interface. The usage of Node is to show case my skill there and also it gives additional control over what goes out to the UI



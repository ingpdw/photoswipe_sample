
### install
* npm install

* bower install

#### node_modules/angular -> Modify package.json
```
"main": "index.js",
```

#### node_modules/angular -> Add index.js
```
require('./angular');
module.exports = angular;
```

### run
* npm install gulp -g
* gulp dev
* gulp

* connections to http://localhost:5000


### Issue
* Support for IE8 version used angular1.2.28

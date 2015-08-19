
### install
* npm install

#### node_modules/angular의 package.json수정
```
"main": "index.js",
```

#### node_modules/angular에 index.js추가
```
require('./angular');
module.exports = angular;
```

### run
* npm install gulp -g
* gulp

* localhost:5000에서 확인

### libs
* angular + browserify
* package.json참조

### 앱 시작 파일
* app/scripts/main.js

### 이슈
* IE8지원을 위해 angular1.2.28버전 사용

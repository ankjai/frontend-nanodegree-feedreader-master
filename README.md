## Jasmine Testing Project


#### Running project

###### Open html in browser
Open index.html (present at project level) file directly in the browser.

###### Using Python SimpleHTTPServer
The simplest way is to use `SimpleHTTPServer` if you already have Python installed.

Python comes already installed on most Mac OS X and Linux computers. In a terminal window, change to the directory that has your HTML files and run the following command:
```
python -m SimpleHTTPServer
```
After it starts, you can navigate to http://0.0.0.0:8000/index.html


#### The Feed Reader App
This is a web based application that reads RSS feeds.

![](https://cloud.githubusercontent.com/assets/6732675/12854800/8287eb52-cbf0-11e5-9d20-e79521c8fa29.gif)


#### Jasmine Testing Framework

###### Test Execution
Tests are executed when user navigate to http://0.0.0.0:8000/index.html. The tests are run before the app is loaded for user to use.

###### Test Results
The results are at the bottom of the page

![](https://cloud.githubusercontent.com/assets/6732675/12854929/5b5e18e8-cbf1-11e5-8b77-1acf82f45c8a.png)

In case of test failures, the report at the bottom of app page will list out failures

![](https://cloud.githubusercontent.com/assets/6732675/12855061/2c1e3abc-cbf2-11e5-99cd-abfdd7d99dd2.gif)

###### Test Coverage
The test cases covered are defined in `frontend-nanodegree-feedreader-master/jasmine/spec/feedreader.js`

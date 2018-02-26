SSAS Enketo
=========================

This module is built around [enketo-core](https://github.com/enketo/enketo-core) to facilitate offline and online data collection.

### Features:

+ Designed to work both in the browser and on mobile devices (Android and iOS). 
+ Uses PouchDB to store sessions and attachments for offline support.
+ Session management. Support for multiple survey sessions.
+ Easily localizable. Has multi-language support.
+ Jump to screen to navigate around the survey.
+ Image optimization for large photos.


### How to Use

This module is used by simply loading the necessary html file in the Browser or in a WebView.
Take a look at the configuration table and pass your parameters in your query string.

#### 1) survey.html

This is where the survey is displayed. It will start with a loading screen until the survey is loaded (either from disk or from a URL). Then it will prompt the user to create a session or continue from a previous session. You need to pass in necessary configuration for this file to work properly.


| Name       | Required | Description                                                                                             |
|------------|----------|---------------------------------------------------------------------------------------------------------|
| lang       | Yes      | Determines UI and Survey language. Pass in "en" if not sure.                                            |
| json       | Yes      | Path to your survey json file (previously transformed from xml using enketo-transformer)                |
| online     | No       | This will skip the session window and the survey will be sent to this path immediately upon submitting. |
| edit       | No       | Use with online mode only. You need to pass the path to the json file for the submission.               |
| return     | No       | Upon submission, this url will be loaded. Only available in "online" mode.                              |
| base       | No       | This will be prepended to all of the parameters taking paths (json, online, edit and return).           |
| novalidate | No       | When this parameter is found, validation will be turned off for that session.                           |	


#### 2) submissions.html

This page will display all the submissions stored offline and let the user upload them to the server either one by one or all of them at one go.

 Name       | Required | Description                                                                                             |
|------------|----------|---------------------------------------------------------------------------------------------------------|
| lang       | Yes      | Determines UI and Survey language. Pass in "en" if not sure.                                            |
| server       | Yes      | The path for the OpenRosa server's submission endpoint |
| base       | No       | This will be prepended to all of the parameters taking paths (server).           |
SSAS Enketo
=========================

This module is built around [enketo-core](https://github.com/enketo/enketo-core) to facilitate offline and online data collection.

# Features

+ Designed to work both in the browser and on mobile devices (Android and iOS). 
+ Uses PouchDB to store sessions and attachments for offline support.
+ Session management. Support for multiple survey sessions.
+ Easily localizable. Has multi-language support.
+ Jump to screen to navigate around the survey.
+ Image optimization for large photos.


# How to Use

This module is used by simply loading the necessary html file in the Browser or in a WebView.
Take a look at the configuration table and pass your parameters in your query string.

## 1) survey.html

This is where the survey is displayed. It will start with a loading screen until the survey is loaded (either from disk or from a URL). Then it will prompt the user to create a session or continue from a previous session. You need to pass in necessary configuration for this file to work properly.


| Name       | Required | Description                                                                                             |
|------------|----------|---------------------------------------------------------------------------------------------------------|
| lang       | Yes      | Determines UI and Survey language. Pass in "en" if not sure.                                            |
| survey     | Yes      | Path to your survey json file (previously transformed from xml using enketo-transformer)                |
| mode       | Yes      | Options: online, offline (default). See survey modes section for further explanation.                  |
| submit     | No       | Required with online mode. Should be the url to receiving OpenRosa server's submission endpoint.        |
| edit       | No       | Use with online mode only. You need to pass the path to the json file for the submission.               |
| return     | No       | Upon submission, this url will be loaded.                                                               |
| base       | No       | This will be prepended to all of the parameters taking paths (survey, submit, edit and return).         |
| novalidate | No       | When this parameter is found, validation will be turned off for that session.                           |
| db         | No       | Sets the name of the database used to store sessions. Defaults to "sessions" when not set.              |
| token      | No       | Sets the authorization token for the current session. Only needed in browser sessions.                  |
| bg         | No       | Sets the background photo to be shown while the survey is being loaded.                                 |

## 2) submissions.html

This page will display all the submissions stored offline and let the user upload them to the server either one by one or all of them at one go.

 Name       | Required | Description                                                                                             |
|------------|----------|---------------------------------------------------------------------------------------------------------|
| lang       | Yes      | Determines UI and Survey language. Pass in "en" if not sure.                                            |
| submit     | Yes      | The path for the OpenRosa server's submission endpoint                                                |
| base       | No       | This will be prepended to all of the parameters taking paths (server).                                  |
| db         | No       | Sets the name of the database used to store sessions. Defaults to "sessions" when not set.              |
| token      | No       | Sets the authorization token for the current session. Always pass this if the server requires authentication.  |	
| bg         | No       | Sets the photo to be shown in the background while this screen is being displayed                       |


# Survey Modes

When displaying the questionnaire, you can choose from three survey modes

## online

* No locally stored sessions. When interrupted, all data may be lost.
* At the end of the survey, the data is submitted to the server.
* If there's no internet connection, survey may not be completed.

## offline

* Sessions are stored on the device.
* Sessions will not be submitted to the server at the end of the survey.
* Sessions must be sent to the server separately (via `submissions.html`)
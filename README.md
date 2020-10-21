# News Feed v2Global

News Feed v2Global adapts a previous project - News Feed (https://github.com/Simon994/news-feed) - to consume data from GNews (https://gnews.io/), as opposed to data from News API (https://newsapi.org/), which was used for News Feed.
Users can browse and search for news, and store preferences to build their own personalised news feed.

History: The original version of News Feed was a collaborative effort built over 3 days (see the repo link above for more information). Because of restrictions placed on the API key by News API, it was not possible to deploy a fully working version of News Feed (although, using a free API key from News API, requests can be made via the browser while testing from localhost). To tackle this problem and deploy a live version of the app with similar functionality, I adapted News Feed's code to make News Feed v2Global.  

In this version, News API endpoints and query parameters used in the original News Feed app have been changed to use GNews endpoints and parameters instead. Additionally, the original News Feed app uses a News API endpoint that returns all news sources (e.g. ABC-News, BBC News etc) available. This endpoint was used as part of News Feed to allow the user to search for news from specific sources (and add these sources to their home feed). As GNews has no equivalent endpoint for sources, I have further adapted the code in News Feed v2Global to allow the user to search news by keyword and country (as opposed to keyword and/or source). The rest of the apps functionality is identical to that of News Feed.

## Live version
https://the-news-feed-v2-global.netlify.app


## Installation
* Clone or download the repo
* Install dependencies by running `yarn`
* Obtain a free API key from GNews (https://gnews.io/), and include this key in a .env file (in the root directory of the project) as: REACT_APP_MY_API_KEY=API_Key
* Start the development server by running `yarn start` 

## Technologies Used
* React.js
* JavaScript (ES6)
* SASS
* Bulma
* Git/GitHub
* Axios





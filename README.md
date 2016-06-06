# pubhub-2
So cordova doesnt like using PHP, so we have to access the database from another URL.

So when setting up I used this: https://cordova.apache.org/#getstarted
Then I setup a site locally called http://test.dev, this is where the query runs and returns the data to the cordova app

Once youve setup Cordova and your test.dev (or whatever you want to call it), just change lines 105 & 109 on /pubhub/www/js/index.js

Also the databse is in the repo!!!!!!

Now hopefully things should work.




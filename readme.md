# Nuccobrain

A bespoke static site, built using a suite of gulp tasks.

## Developing locally

1. Install necessary dependencies with `npm install`
2. Compile code, watch for changes and start a dev server with `npm run dev`
3. Commit changes to the `staging` branch of this repo.

## Deploying

Changes to the staging branch will automatically be built and deployed to a Netlify staging site: http://nuccobrain-staging.netlify.com.

Changes to the master branch will be built and deployed to https://nuccobrain.com on request—not automatically.

Serverless function code gets built to the `/functions` folder instead—see below.


## Serverless functions

This project uses Netlify serverless cloud functions to proxy API requests to third party services like Eventbrite.

Doing it this way lets us:

* Keep API keys secret from the client
* Get around the browser same-origin policy
* Present smaller, simpler responses to the client

Function source code is in `/src/functions` and the built code is in `/functions`.

Unlike for the front-end code, the built function code _is_ checked into the repo and normal start/build commands don't affect it.

The functions can be rebuilt by running `netlify-lambda build src/functions`.

The built function code is committed to the repo.

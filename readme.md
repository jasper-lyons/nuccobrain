# Nuccobrain

A bespoke static site, built using a suite of gulp tasks.

Note, this repository is for Nucco Brain's main website pages, which are a static site. Nucco Brain's blog pages are Wordpress based, and hosted on their web servers.

## Developing locally

1. Install necessary dependencies with `npm install`
2. Compile code, watch for changes and start a dev server with `npm run dev`
3. Commit changes to the `staging` branch of this repo.

## Deploying

Changes to the Master branch will automatically be built and deployed to a Netlify staging site: http://nuccobrain-staging.netlify.com.
- For locally generating a production site, use `npm run build`.
- The production files can be found in the /web folder, and can be pushed onto UK2 hosting via FTP

Serverless function code gets built to the `/functions` folder instead — see below.

_Staging is generally not in use, and will be re-instated if we move static site fully onto Netlify and account for SEO + DNS considerations_

## Serverless functions

This project uses Netlify serverless cloud functions to proxy API requests to third party services like Eventbrite and Behance.

Doing it this way lets us:

* Keep API keys secret from the client
* Get around the browser same-origin policy
* Present smaller, simpler responses to the client

Function source code is in `/src/functions` and the built code ends up in `/functions`.

Like the front-end code, the built function code _is not_ checked into the repo and the normal build command will built the function code too.

The functions can be rebuilt separately by running `netlify-lambda build src/functions`.

### Important note

Functions only live on the Netlify staging site at the moment, because the production server is not hosted on Netlify.

This means that both the production and staging sites make requests to a function at a staging URL. This isn't ideal but it is stable.

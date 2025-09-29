#  <img src="https://playwright.dev/img/playwright-logo.svg" width="30" height="30"> PLAYWRIGHT TS PRACTICE

## Prerequisites

Having installed:

- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" 
       alt="Node.js" width="25" height="25"/> [Node.js](https://nodejs.org/)  
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" 
       alt="Docker" width="25" height="25"/> [Docker](https://www.docker.com/get-started/) *(optional, only if you want to validate the [test pipeline locally](#test-pipeline-locally))*  

## Local Setup

Run:
- npm ci
- npx playwright install --with-deps
- npm run make-env
- check package.json for more commands

## Test Pipeline Locally

- brew install act #install for testing pipeline locally
- act -j test -s ACT=true
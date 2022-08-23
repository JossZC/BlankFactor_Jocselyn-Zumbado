# BlankFactor Jocselyn Zumbado Chartier.

This repo contains automation tests for BlankFactor. This code is in Cypress/js and it has all the necessary steps to be executed.
The code is commented to make it easier to understand the tests.

## Steps
1. Navigate to “http://blankfactor.com”
2. Open the “Blog” section
3. Scroll down to “Why Fintech in Latin America Is Having a Boom” and click the post by Sofia Gonzalez
4. Make a validation (to verify the script is on the correct page by verifying the URL and some of the text on the page)
5. Subscribe to the newsletter using the subscribe form.
6. Go back to the blog section and print a list of all post titles with related links.

### Prerequisites
To use npm, you need to install Node.js 12 or 14 and higher


## Installation
Clone this repo and navegate into it.
* git clone https://github.com/JossZC/BlankFactor_Jocselyn.git
* cd BlankFactor_Jocselyn.git

You need to run the following command to install dependencies.
* npm install

## Usage
Open the Cypress panel with:
* npx cypress open

or you can run just the exact file:
* npx cypress run --spec cypress\integration\blankfactor.spec.js  --browser chrome

Importante note: 
* If it is you first nom execution, you will need to open the Cypress panel it twice.


## Author
Jocselyn Zumbado Chartier

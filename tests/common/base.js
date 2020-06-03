"use strict";

const { openBrowser, closeBrowser, goto } = require('taiko');
const headless = process.env.headless_chrome.toLowerCase() == 'true' ? true : false;

beforeSuite(async () => { 
    await openBrowser({ headless: headless });
    await goto('http://automationpractice.com/index.php?controller=authentication&back=my-account');
});

afterSuite(async () => await closeBrowser());
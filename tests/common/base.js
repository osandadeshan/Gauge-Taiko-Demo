"use strict";

const { openBrowser, closeBrowser} = require('taiko');
const headless = process.env.headless_chrome.toLowerCase() == 'true' ? true : false;


beforeSuite(async () => openBrowser({ headless: headless }));

afterSuite(async () => closeBrowser());
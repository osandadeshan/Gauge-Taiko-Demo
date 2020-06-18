const { openBrowser, closeBrowser, goto } = require('taiko');
const headless = process.env.headless_chrome.toLowerCase() == 'true' ? true : false;

beforeSuite(async () => { 
    await openBrowser({ headless: headless });
    await goto(process.env.base_url);
});

afterSuite(async () => await closeBrowser());
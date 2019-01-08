/* globals gauge*/
"use strict";
const { goto, write, press } = require('taiko');


step("Goto Google's search page", async () => goto('http://google.com'));

step("Search for <query>", async (query) => {
    await write(query);
    await press('Enter');
})
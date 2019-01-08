"use strict";

const { goto, write, into, click, inputField, $, button } = require('taiko');


step("Goto Login page", async () => goto('http://newtours.demoaut.com/'));

step("Login with username as <username> and password as <password>", async (username, password) => {
    await write(username, inputField({'name':'userName'}));
    await write(password, inputField({'name':'password'}));
    await click($("//input[@value='Login']"));
})
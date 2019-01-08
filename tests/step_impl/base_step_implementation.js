"use strict";

const { text, contains } = require('taiko');
const assert = require("assert");


step("Page contains <content>", async (content) => {
    assert.ok(await text(contains(content)).exists());
});
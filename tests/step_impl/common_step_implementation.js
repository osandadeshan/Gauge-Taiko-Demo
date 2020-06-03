"use strict";

const { text, contains, title } = require('taiko');
const assert = require("assert");

step("Page title is <pageTitle>", async (pageTitle) => {
    assert.equal(await title(), pageTitle);
});

step("Page contains <content>", async (content) => {
    assert.ok(await text(contains(content)).exists());
});
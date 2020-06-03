const homePage = require("../page/home_page")
const assert = require("assert")

step("Profile name is <profileName>", async (profileName) => {
    await assert.equal(await homePage.getProfileName(), profileName);
})
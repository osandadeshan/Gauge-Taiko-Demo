"use strict";

const loginPage = require("../page/login_page")

step("Login with username as <username> and password as <password>", async (username, password) => {
    await loginPage.login(username, password);
})
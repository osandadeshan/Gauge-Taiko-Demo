const { write, click, inputField, $ } = require('taiko');

class LoginPage {

    async login (username, password) {
        await write(username, inputField({'id':'email'}));
        await write(password, inputField({'id':'passwd'}));
        await click($("//p[@class='submit']//span"));
    }

}

module.exports = new LoginPage();
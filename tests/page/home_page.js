const { textField, text, $ } = require('taiko');

class HomePage {

    async getProfileName () {
        return await ($(`//a[@class='account']/span`)).text();
    }

}

module.exports = new HomePage();
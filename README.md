<h1 align="center">Taiko</h1>
<p align="center">A node.js library to automate chrome/chromium browser</p>

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) [![alpha software]( https://img.shields.io/badge/status-alpha-lightgrey.svg)](https://github.com/getgauge/taiko/issues) [![npm version](https://badge.fury.io/js/taiko.svg?style=flat-square)](https://badge.fury.io/js/taiko) [![dependencies Status](https://david-dm.org/getgauge/taiko/status.svg)](https://david-dm.org/getgauge/taiko) [![devDependencies Status](https://david-dm.org/getgauge/taiko/dev-status.svg)](https://david-dm.org/getgauge/taiko?type=dev) [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/getgauge/taiko/issues)

![Taiko REPL](https://user-images.githubusercontent.com/54427/43075023-f4d18878-8e9c-11e8-91b2-227a3d02e0f6.gif)

# What’s Taiko?

Taiko is a free and open source browser automation tool built by the team behind [Gauge](https://gauge.org/) from [ThoughtWorks](https://www.thoughtworks.com/). Taiko is a node library with a clear and concise API to automate the chrome browser. Tests written in Taiko are highly readable and maintainable. 

With Taiko it’s easy to

* Get Started
* Record/Write/Run tests

Taiko’s smart selectors make tests reliable by adapting to changes in the structure of your web application. With Taiko there’s no need for id/css/xpath selectors or adding explicit waits (for XHR requests) in test scripts.

## Features

Taiko is built ground up to test modern web applications. Here’s a list of a few unique features that sets it apart from other browser automation tools. 

* Easy Installation
* Interactive Recorder
* Smart Selectors
* Handle XHR and dynamic content
* Request/Response stubbing and mocking

# Getting Started

## Easy Installation

Taiko works on Windows, MacOS and Linux. You only need to have [Node.js](https://nodejs.org/en/) installed in your system to start writing Taiko scripts in JavaScript. After you’ve installed Node.js open a terminal application (or powershell in the case of Windows) and install Taiko using [npm](https://www.npmjs.com/) with the command

    $ npm install -g taiko

This installs Taiko and the latest version of Chromium browser. We are all set to do some testing!

## Interactive Recorder

Taiko comes with a Recorder that’s a REPL for writing test scripts. You can use Taiko’s JavaScript API to control the browser from the REPL. To launch the REPL type taiko in your favorite terminal application

    $ taiko
    Version: 0.2.0 (Chromium:69.0.3476.0)
    Type .api for help and .exit to quit
    > 

This launches the Taiko prompt. You can now use Taiko’s API as commands in this prompt. For example, launch a Chromium browser instance using

    > openBrowser()

You can now automate this Chrome browser instance with commands, for example, make the browser search google for something.

    > goto(“google.com”)
    > write(“taiko test automation”)
    > click(“Google Search”)

These commands make the browser go to google’s home page, type the text “taiko test automation” and click on the “Google Search” button. You can see the browser performing these actions as you type and press enter for each command.

Taiko’s REPL keeps a history of all successful commands. Once you finish a flow of execution, you can generate a test script using the special command .code 

    > .code
    const { openBrowser, goto, write, click } = require('taiko');

    (async () => {
        try {
            await openBrowser();
            await goto("google.com");
            await write("taiko test automation");
            await click("Google Search");
        } catch (e) {
                console.error(e);
        } finally {
                closeBrowser();
        }
    })();

Taiko generates readable and maintainable JavaScript code. Copy and modify this code or
save it directly to a file using

    > .code googlesearch.js

You can choose to continue automating or finish the recording using 

    > .exit

To run a Taiko script pass the file as an argument to taiko

    $ taiko googlesearch.js
    ✔ Browser opened
    ✔ Navigated to url "http://google.com"
    ✔ Wrote taiko test automation into the focused element.
    ✔ Clicked element containing text "Google Search"
    ✔ Browser closed

By default Taiko runs the script in headless mode, that means it does not launch a browser window. This makes it easy to run Taiko in containers (ex. Docker). To view the browser when the script executes use 

    $ taiko googlesearch.js --observe

Taiko’s REPL also documents all the API’s. To view all available API’s use the special command `.api`

    $ taiko
    Version: 0.2.0 (Chromium:69.0.3476.0)
    Type .api for help and .exit to quit
    > .api
    Browser actions
        openBrowser, closeBrowser, client, switchTo, setViewPort, openTab, closeTab
    ...

To see more details of an API along with examples use

    >.api openBrowser

    Launches a browser with a tab. The browser will be closed when the parent node.js process is closed.

    Example:
        openBrowser()
        openBrowser({ headless: false })
        openBrowser({args:['--window-size=1440,900']})


## Smart Selectors

Taiko’s API treats the browser as a black box. With Taiko we can write scripts by looking at a web page and without inspecting it’s source code For example on `google.com` the command

    > click(“Google Search”)

clicks on any element with the text `Google Search` (a button on the page at https://google.com). Taiko’s API mimics user interactions with the browser. For example if you want to write into an element that’s currently in focus use 

    > write(“something”)

Or if you want to write into a specific text field 

    > write(“something”, into(textField({placeholder: “Username”})))

With Taiko’s API we can avoid using ids/css/xpath selectors to create reliable tests that don’t break with changes in the web page’s structure.

You can also use Taiko’s proximity selectors to visually locate elements. For example

    > click(checkbox(near(“Username”)))

Will click the checkbox that is nearest to any element with the text `Username`. 

Taiko’s also supports XPath and CSS selectors

    > click($(“#button_id”)) // Using CSS selectors
    > click($(“//input[name=`button_name`]”)) // Xpath selectors

## Handle XHR and dynamic content

Taiko’s API listens to actions that trigger XHR request or fetch dynamic content and automatically waits for them to complete before moving on to the next action. Taiko implicitly waits for elements to load on the page before performing executing the command. Scripts written in Taiko are free of explicit local or global waits and the flakiness. 

## Request/Response stubbing and mocking

Setting up test infrastructure and test data is hard. Taiko makes this easy with the intercept API. For example, block requests on a page  (like Google Analytics or any other resource)

    > intercept("https://www.google-analytics.com/analytics.js");

Or redirect an XHR request on the page to a test instance

    > intercept(“https://fetchdata.com”, “http://fetchtestdata.com”)

Or stub an XHR request to return custom data

    > intercept(“https://fetchdata.com”, {“test”: data})
 
Or even modify data sent by XHR requests

    > intercept(“https://fetchdata.com”, (request) => {request.continue({“custom”: “data”})})

This simplifies our test setups as we don’t have to set up mock servers, or replace url’s in tests to point to test instances.

## Integrating with Gauge

We recommend using Taiko with [Gauge](https://gauge.org/). Gauge is a framework for writing readable and reusable acceptance tests. With features like markdown specifications, data driven execution, parallel execution and reporting Gauge makes test maintenance easy. Gauge is easy to install and well integrated with Taiko. With Gauge and Taiko we can write reliable acceptance tests.

Install Gauge using npm and initialize an initialize and sample Taiko project using

    $ npm install @getgauge/cli
    $ gauge init js

Learn more about [Gauge](https://docs.gauge.org)!

## Documentation

* [API](http://taiko.gauge.org)

## Inspired by

* [Helium](https://heliumhq.com/)
* [Puppeteer](https://github.com/GoogleChrome/puppeteer)

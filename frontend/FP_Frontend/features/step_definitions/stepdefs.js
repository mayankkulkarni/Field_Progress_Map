const { Given, When, Then, AfterAll } = require('cucumber');
const { Builder, By, Capabilities, Key } = require('selenium-webdriver');
const { expect } = require('chai');

require("chromedriver");

// driver setup
const capabilities = Capabilities.chrome();
capabilities.set('chromeOptions', { "w3c": false });
const driver = new Builder().withCapabilities(capabilities).build();

Given('I am on the Field Progress Webapp webpage', async function () {
    await driver.get('http://localhost:3000');
});

When('I click the "Toggle Input" button', async function() {
    const element = await driver.findElement(By.id("toggle-input-btn"));
    element.click();
});

Then('the map should cover the entire page', {timeout: 60 * 1000}, async function() {
    const element = await driver.findElement(By.id("deckgl-overlay")).getAttribute("style");
    expect(element.includes("left: 0%")).to.equal(true);
});

Then('the map should not cover the entire page', {timeout: 60 * 1000}, async function() {
    const element = await driver.findElement(By.id("deckgl-overlay")).getAttribute("style");
    expect(element.includes("left: 20%")).to.equal(true);
});

When('I fill out volunteer {string} with availability {string}', {timeout: 60 * 1000}, async function(name, avail) {
    const elements = await driver.findElements(By.className("card"));
    const inputs = await elements[elements.length - 1].findElements(By.className("form-control"));
    
    var nameEl = inputs[0];
    var availEl = inputs[1];

    nameEl.sendKeys(name);
    availEl.sendKeys(avail);
});

When('I select {string} from the precinct dropdown', {timeout: 60 * 1000}, async function(precinct) {
    const dropdown = await driver.findElement(By.id("formGridState"));
    const selection = await driver.findElement(By.id("formGridState")).sendKeys(precinct);
});

Then('I should see {string} selected in the precinct dropdown', {timeout: 60 * 1000}, async function(precinct) {
    const dropdown = await driver.findElement(By.id("formGridState"));
    dropdown.getAttribute('value').then(function(selected) {
        expect(selected).to.equal(precinct);
    });
});

When('I add a new volunteer card', {timeout: 60 * 1000}, async function() {
    const addVolunteerButton = await driver.findElement(By.id("add-volunteer-button-id"));
    addVolunteerButton.click();
});

When('I slide the scatterplot slider to the {string} by {int}', {timeout: 60 * 1000}, async function(direction, amount) {
    const slider = await driver.findElement(By.id("radiusScale"));
    for (var it = 0; it < amount; it++) {
        if (direction.toLowerCase() === "right") {
            slider.sendKeys(Key.RIGHT);
        } else if (direction.toLowerCase() === "left") {
            slider.sendKeys(Key.LEFT);
        }
    }
});

Then('the scatterplot radius should be {string}', {timeout: 60 * 1000}, async function(newValue) {
    const settings = await driver.findElements(By.className("control"));
    expect(settings.values[0] == newValue);
});

Then('I should see a card for {string} with availability {string}', {timeout: 60 * 1000}, async function(name, avail) {
    const elements = await driver.findElements(By.className("card"));
    var matched = false

    for (var it = 0; it < elements.length; it++) {
        inputs = await elements[it].findElements(By.className("form-control"));
        
        var vName = await inputs[0].getAttribute("value");
        var vAvail = await inputs[1].getAttribute("value");

        if (vName == name && vAvail == avail) {
            matched = true;
            break;
        }
    }

    expect(matched).to.equal(true);
});

Then('the webpage title should be {string}', {timeout: 60 * 1000}, async function(title) {
    const pageTitle = await driver.getTitle();
    expect(pageTitle).to.equal(title);
});

Given('I see a card with placeholder name {string} and placeholder availability {string}', {timeout: 60 * 1000}, async function(name, avail) {
    const elements = await driver.findElements(By.className("card"));
    const inputs = await elements[elements.length - 1].findElements(By.className("form-control"));

    var namePlaceholder = await inputs[0].getAttribute("placeholder");
    var availPlaceholder = await inputs[1].getAttribute("placeholder");


    expect(namePlaceholder).to.equal(name);
    expect(availPlaceholder).to.equal(avail);
});

Then('I cut turf', {timeout: 60 * 1000}, async function() {
    const element = await driver.findElement(By.id("cut-turf-button-id"));
    element.click();
});

Then('I should be prompted to fill in valid names', {timeout: 60 * 1000}, async function() {
    const element = await driver.switchTo().alert().getText();
    await driver.switchTo().alert().accept();
    expect(element).to.equal('Please ensure all cards have valid volunteer names.');
});

Then('I should be prompted to fill in valid availabilities', {timeout: 60 * 1000}, async function() {
    const element = await driver.switchTo().alert().getText();
    await driver.switchTo().alert().accept();
    expect(element).to.equal('Please ensure all cards have valid volunteer availabilities.');
});

AfterAll('end', async function(){
    await driver.quit();
});

const { Builder, By, until } = require('selenium-webdriver');

test('Check', async () => {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('http://localhost:5173/#/');

        let inputElement = await driver.findElement(By.id('login'));

        await inputElement.sendKeys('1');

        let button = await driver.wait(until.elementLocated(By.id('confirm_login')), 10000);

        await button.click();

        await driver.sleep(3000);

        console.log('Текст успешно введен в элемент input');
    } finally {
        await driver.quit();
    }
});
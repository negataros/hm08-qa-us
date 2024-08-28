const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {
    it('Set the address', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await expect(await helper.getElementByText(from, to)).toBeExisting();
    })

    it('Select supportive plan', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportivePlan();
        const supportivePlanButton = await $(page.supportivePlanButton);
        await expect(supportivePlanButton).toBeExisting();
        
    })

    it('should save the phone', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    })
   it('Add a credit card', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.addingPaymentMethod('123400004321', '12');
        const linkButton = await $(page.linkButton);
        await expect(linkButton).toBeExisting();
   })

    it('Write message to driver', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.fillMessageField('Grab a coke');
        const messageField = await $(page.messageField);
        await expect(messageField).toBeExisting();
   })

   it('Order a blanket and handkerchiefs', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportivePlan();
        await page.orderingBlanketAndHandkerchiefs();
        const blanketButton = await $(page.blanketButton);
        await expect(blanketButton).toBeExisting();
   })
  it('Order two ice creams', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportivePlan();
        await page.orderIceCream();
        const iceCreamButton = await $(page.iceCreamButton);
        await expect(iceCreamButton).toBeExisting();
})

    it('Car search modal appears', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        const orderButton = await $(page.orderButton);
        await orderButton.waitForDisplayed({ timeout: 20000 });
        console.log('Order button displayed');
        await orderButton.click();
        const carSearchModal = await $(page.carSearchModal);
        await carSearchModal.waitForDisplayed({ timeout: 20000 });
        await expect(carSearchModal).toBeExisting();
    })

});

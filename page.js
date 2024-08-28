const { getPhoneNumber } = require("./helper");

module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    cardNumber: '#number',
    cardCode: '.card-second-row #code',
    messageField: "//input[@id='comment']",
    // Buttons
    supportivePlanButton: "//div[@class='tariff-picker shown']//div[5]",
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    addCardButton: '//div[starts-with(text(), "Add card")]',
    linkButton: '//*[@id="root"]/div/div[2]/div[2]/div[2]/form/div[3]/button[1]',
    blanketButton: "//div[@class='workflow']//div[1]//div[1]//div[2]//div[1]//span[1]",
    blanketSelector: "//body/div[@id='root']/div[@class='app']/div[@class='workflow']/div[@class='workflow-subcontainer']/div[@class='tariff-picker shown']/div[@class='form']/div[@class='reqs open']/div[@class='reqs-body']/div[1]/div[1]",
    iceCreamButton: "//div[@class='r-group']//div[1]//div[1]//div[2]//div[1]//div[3]",
    searchCarButton: 'button=Search Car',
    paymentMethodButton: "//div[@class='pp-button filled']",
    orderButton: "//button[@class='smart-button']",
    // Modals
    phoneNumberModal: '.modal',
    paymentMethodModal: "//div[@class='payment-picker open']//div[@class='section active']",
    addCardModal: "//div[@class='payment-picker open']//div[@class='section active']",
    carSearchModal: '.order-body',
    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        const requests = await browser.getRequests();
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },
    selectSupportivePlan: async function() {
        const carSearchModal = await $(this.carSearchModal);
        await carSearchModal.waitForDisplayed();
        const supportivePlanButton = await $(this.supportivePlanButton);
        await supportivePlanButton.waitForDisplayed({ timeout: 20000 });
        await supportivePlanButton.click();
    },
    addingPaymentMethod: async function(creditCardNumber, creditCardCode) {
        const paymentMethodButton = await $(this.paymentMethodButton);
        await paymentMethodButton.waitForDisplayed();
        await paymentMethodButton.click();
        const paymentMethodModal = await $(this.paymentMethodModal);
        await paymentMethodModal.waitForDisplayed();
        const addCardButton = await $(this.addCardButton);
        await addCardButton.waitForDisplayed();
        await addCardButton.click();
        const cardNumber = await $(this.cardNumber); 
        await cardNumber.setValue(creditCardNumber);
        const cardCode = await $(this.cardCode);
        await cardCode.setValue(creditCardCode);
        const linkButton = await $(this.linkButton);
        await browser.keys('Tab');
        await linkButton.waitForEnabled();
        
    },
    fillMessageField: async function(message) {
        const messageField = await $(this.messageField);
        await messageField.setValue(message);
    },
    orderingBlanketAndHandkerchiefs: async function() {
        const blanketSelector = await $(this.blanketSelector);
        await blanketSelector.click();
        const blanketButton = await $(this.blanketButton);
        await blanketButton.click();
    },
    orderIceCream: async function () {
        const iceCreamButton = await $(this.iceCreamButton);
        await iceCreamButton.click();
        await iceCreamButton.click();
    }
};
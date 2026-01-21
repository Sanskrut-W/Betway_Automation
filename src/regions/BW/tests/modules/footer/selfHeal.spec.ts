// import { test } from '../../../fixtures/MasterFixtureFile';
// import { loadLocatorsFromExcel } from '../../../../../global/utils/file-utils/excelReader';
// import { SelfHealingLocator } from '../../../../../global/utils/locators/healing';
// import { batchUpdateLocatorsInWorkbook } from '../../../../../global/utils/locators/excel';
// import { getLocatorMetadata, updateLocatorMetadata } from '../../../../../global/utils/locators/metadata';

// // Config
// const APP_URL = 'https://new.betway.co.za/sport';
// const USER_MOBILE = '713533467';
// const USER_PASSWORD = '12345';
// const LOCATOR_URL = "https://github.com/athrvzoz/LocatorFile/raw/refs/heads/main/locatorsDemo.xlsx";
// const SHEET_NAME = "SampleDemoSheet";

// test('AI Healing Demo - Replace changed locators in batch at end', async ({ loginPage }) => {
//     test.setTimeout(120000);
//     const page = loginPage.page;
    
//     const configs = loadLocatorsFromExcel(LOCATOR_URL, SHEET_NAME);
//     if (configs['passwordInput']) {
//         updateLocatorMetadata('passwordInput', configs['passwordInput']);
//     }
//     if (configs['mobileInput']) {
//         updateLocatorMetadata('mobileInput', configs['mobileInput']);
//     }
//     if (configs['loginButton']) {
//         updateLocatorMetadata('loginButton', configs['loginButton']);
//     }
//     const excelPasswordConfig = configs['passwordInput'];
//     const excelMobileConfig = configs['mobileInput'];
//     const excelLoginButtonConfig = configs['loginButton'];
    
//     if (!excelPasswordConfig || !excelMobileConfig || !excelLoginButtonConfig) {
//         throw new Error('Required locators not found in Excel');
//     }
    
//     await page.goto(APP_URL);
//     await page.waitForTimeout(2000);
    
//     const healer = new SelfHealingLocator(page);
    
//     // Mobile input
//     const mobileMetadata = getLocatorMetadata('mobileInput');
//     const mobileInput = await healer.findByExcelConfig(excelMobileConfig, mobileMetadata.description, mobileMetadata.context, 3000);
//     await mobileInput.fill(USER_MOBILE);

//     // Password input
//     const passwordMetadata = getLocatorMetadata('passwordInput');
//     const passwordField = await healer.findByExcelConfig(excelPasswordConfig, passwordMetadata.description, passwordMetadata.context, 3000);
//     await passwordField.fill(USER_PASSWORD);
    
//     //click login button
//     const loginButtonMetadata = getLocatorMetadata('loginButton');
//     const loginButton = await healer.findByExcelConfig(excelLoginButtonConfig, loginButtonMetadata.description, loginButtonMetadata.context+"first found element ie n=0", 3000);
//     await loginButton.click();

//     // Batch update Excel if any locators were healed
// const healed = healer.getHealedLocators();
// if (healed.length > 0) {
//     console.log(`🧩 Found ${healed.length} healed locators. Updating Excel in GitHub...`);
//     await batchUpdateLocatorsInWorkbook(LOCATOR_URL, SHEET_NAME, healed);
// }
// });
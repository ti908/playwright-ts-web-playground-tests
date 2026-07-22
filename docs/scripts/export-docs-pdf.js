const path = require('path');
const { chromium } = require('@playwright/test');

const docsDir = path.resolve(__dirname, '..');

const documents = [
  {
    input: 'Test_Plan_RetryPlaywright.html',
    output: 'Test_Plan_RetryPlaywright.pdf',
  },
  {
    input: 'Login_Feature_BDD_Scenarios.html',
    output: 'Login_Feature_BDD_Scenarios.pdf',
  },
  {
    input: 'API_Test_Scenarios_RetryPlaywright.html',
    output: 'API_Test_Scenarios_RetryPlaywright.pdf',
  },
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  for (const document of documents) {
    const inputPath = path.join(docsDir, document.input);
    const outputPath = path.join(docsDir, document.output);

    await page.goto(`file://${inputPath}`, { waitUntil: 'load' });
    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: '<div></div>',
      footerTemplate: `
        <div style="font-family: Arial, sans-serif; font-size: 8px; color: #66788a; width: 100%; padding: 0 18mm;">
          <span>${document.output}</span>
          <span style="float: right;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
        </div>`,
      margin: {
        top: '18mm',
        right: '18mm',
        bottom: '18mm',
        left: '18mm',
      },
    });
  }

  await browser.close();
})();

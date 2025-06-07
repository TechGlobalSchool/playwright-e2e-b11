import { Locator, Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  readonly testingDropdown: Locator;
  readonly testingDropdownFrontendOption: Locator;
  readonly testingDropdownBackendOption: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.testingDropdown = this.page.locator('#dropdown-testing');
    this.testingDropdownFrontendOption = this.page.locator('#frontend-option');
    this.testingDropdownBackendOption = this.page.locator('#backend-option');
  }

  async selectFrontendOption() {
    await this.testingDropdown.hover();
    await this.testingDropdownFrontendOption.click();
  }

  async selectBackendOption() {
    await this.testingDropdown.hover();
    await this.testingDropdownBackendOption.click();
  }

  // Reusable commands
  async wait(seconds: number) {
    await this.page.waitForTimeout(seconds * 1000);
  }

  async waitForHeading() {
    await Promise.any([
      this.page.waitForSelector('h1'),
      this.page.waitForSelector('h2'),
      this.page.waitForSelector('h3')
    ])  
  }

  async waitForPageLoad(seconds = 5) {
    await this.page.waitForLoadState('load', { timeout: seconds }); 
  }

  async waitForPageDOMContent(seconds = 5) {
    await this.page.waitForLoadState('domcontentloaded', { timeout: seconds }); 
  }
}
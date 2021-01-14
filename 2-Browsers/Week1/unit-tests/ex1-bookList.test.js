const {
  prepare,
  validateHTML,
  deleteFiles,
} = require("../../../test-automation/puppeteer-helpers");

describe("Generated HTML", () => {
  beforeAll(async () => {
    await prepare(page);
  });

  afterAll(() => {
    deleteFiles();
  });

  test("should be syntactically valid", validateHTML);

  test("should contain a <ul> with 3 <li> elements", async () => {
    const result = await page.evaluate(() => {
      const nodeList = document.querySelectorAll("div[id=bookList] > ul > li");
      return nodeList ? nodeList.length : 0;
    });
    expect(result).toBe(3);
  });

  test("should include an <li> with title and author for each book", async () => {
    const result = await page.evaluate(() => {
      const nodeList = document.querySelectorAll("div[id=bookList] > ul > li");
      return nodeList
        ? Array.from(nodeList)
            .map((node) => node.textContent)
            .join(", ")
        : "";
    });
    expect(result).toMatch(/The Design of Everyday Things/);
    expect(result).toMatch(/Don Norman/);
    expect(result).toMatch(/The Most Human Human/);
    expect(result).toMatch(/Brian Christian/);
    expect(result).toMatch(/The Pragmatic Programmer/);
    expect(result).toMatch(/Andrew Hunt/);
  });

  test("should include an <img> element for each book", async () => {
    const result = await page.evaluate(() => {
      const nodeList = document.querySelectorAll(
        "div[id=bookList] > ul > li img"
      );
      return nodeList ? nodeList.length : 0;
    });
    expect(result).toBe(3);
  });
});

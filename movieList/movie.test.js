const { Builder, Capabilities, By } = require("selenium-webdriver");
require("chromedriver");

let driver = new Builder().withCapabilities(Capabilities.chrome()).build();

beforeEach(async () => {
  await driver.get("http://127.0.0.1:5500/movieList/index.html");
});

afterAll(async () => {
  await driver.sleep(1000);
  await driver.quit();
});

it("should add new movie to list", async () => {
  const addMovieInput = await driver.findElement(By.xpath("//input"));

  addMovieInput.sendKeys("Back to the future");

  const addMovieButton = await driver.findElement(By.xpath("//button"));

  addMovieButton.click();

  await driver.sleep(1000);

  const movie = await driver.findElement(By.xpath("//li"));
});

it("should remove new movie from list", async () => {
  const addMovieInput = await driver.findElement(By.xpath("//input"));

  addMovieInput.sendKeys("Back to the future");

  const addMovieButton = await driver.findElement(By.xpath("//button"));

  addMovieButton.click();

  await driver.sleep(1000);

  const movie = await driver.findElement(By.xpath("//li"));

  const removeMovieInput = await driver.findElement(
    By.xpath("//button[text() = 'x']")
  );

  removeMovieInput.click();

  await driver.sleep(100);

  const deletedText = await driver.findElement(
    By.xpath("//aside[text() = 'Back to the future deleted!']")
  );

  expect(deletedText.isDisplayed()).toBeTruthy();
});

it("should cross off movie if watched", async () => {
  const addMovieInput = await driver.findElement(By.xpath("//input"));

  addMovieInput.sendKeys("Back to the future");

  const addMovieButton = await driver.findElement(By.xpath("//button"));

  addMovieButton.click();

  await driver.sleep(1000);

  const movie = await driver.findElement(By.xpath("//li"));

  const crossOffMovie = await driver.findElement(
    By.xpath("//span[text() = 'Back to the future']")
  );

  crossOffMovie.click();

  await driver.sleep(100);

  const crossedOff = await driver.findElement(
    By.xpath("//span[@class='checked']")
  );

  expect(crossedOff.toBeTruthy);
});

it("should uncheck the movie if it's checked", async () => {
  const addMovieInput = await driver.findElement(By.xpath("//input"));

  addMovieInput.sendKeys("Back to the future");

  const addMovieButton = await driver.findElement(By.xpath("//button"));

  addMovieButton.click();

  await driver.sleep(1000);

  const movie = await driver.findElement(By.xpath("//li"));

  const crossOffMovie = await driver.findElement(
    By.xpath("//span[text() = 'Back to the future']")
  );

  crossOffMovie.click();

  await driver.sleep(100);

  const crossedOff = await driver.findElement(
    By.xpath("//span[@class='checked']")
  );

  expect(crossedOff.toBeTruthy);

  const unCrossMovie = await driver.findElement(
    By.xpath("//span[text() = 'Back to the future']")
  );

  unCrossMovie.click();

  await driver.sleep(100);

  const unChecked = await driver.findElement(
    By.xpath("//aside[text() = 'Back to the future added back!']")
  );

  expect(unChecked.toBeTruthy);
});

import { test, expect } from "@playwright/test";

test("dashboard screen render is correctly", async ({ page }) => {
  const username = "user1";
  const password = "123";
  const urlAuth = "http://localhost:3000/auth/login";
  await page.goto(urlAuth);
  await page.getByTestId("username").click();
  await page.getByTestId("username").fill(username);
  await page.getByTestId("username").press("Tab");
  await page.getByTestId("password").fill(password);
  await page.getByTestId("password").press("Enter");

  await expect(page.getByRole("button", { name: "Todo" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Doing" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Done" })).toBeVisible();

  await page.getByRole("button", { name: "Todo" }).click();
  await expect(page.getByRole("heading", { name: "TODO" })).toBeVisible();

  await page.getByRole("button", { name: "Doing" }).click();
  await expect(page.getByRole("heading", { name: "DOING" })).toBeVisible();

  await page.getByRole("button", { name: "Done" }).click();
  await expect(page.getByRole("heading", { name: "DONE" })).toBeVisible();
});

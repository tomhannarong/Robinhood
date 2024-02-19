import { test, expect } from "@playwright/test";

test("dashboard screen render is correctly", async ({ page }) => {
  const username = "sivensyM";
  const password = "QntaH3bw250h";
  const urlAuth = "http://localhost:3000/auth/login";
  await page.goto(urlAuth);
  await page.getByTestId("username").click();
  await page.getByTestId("username").fill(username);
  await page.getByTestId("username").press("Tab");
  await page.getByTestId("password").fill(password);
  await page.getByTestId("password").press("Enter");

  await expect(page.getByRole("button", { name: "To-do" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Doing" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Done" })).toBeVisible();

  await page.getByRole("button", { name: "To-do" }).click();
  await page.getByRole("button", { name: "Doing" }).click();
  await page.getByRole("button", { name: "Done" }).click();
});

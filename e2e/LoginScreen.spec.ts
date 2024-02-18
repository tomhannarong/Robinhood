import { test, expect } from "@playwright/test";

test("login screen render is correctly", async ({ page }) => {
  const urlAuth = "http://localhost:3000/auth/login";
  await page.goto(urlAuth);
  await expect(
    page.getByRole("heading", { name: "Task Management Login" })
  ).toBeVisible();
  await expect(page.getByText("Username")).toBeVisible();
  await expect(page.getByText("Password")).toBeVisible();
  await expect(page.getByTestId("submit")).toContainText("Login");
});

import { test, expect } from "@playwright/test";
async function fill(page: import("@playwright/test").Page) {
  await page.getByLabel("Your name", { exact: true }).fill("Portfolio Test");
  await page.getByLabel("Email address", { exact: true }).fill("test@example.com");
  await page.getByLabel("What’s it about?").fill("A website inquiry");
  await page.getByLabel("Your message", { exact: true }).fill("This is a local automated test of the contact form.");
}
test("contact is legible in both themes and honestly reports missing delivery configuration", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("working on?");
  for (const theme of ["Use dark mode", "Use light mode"]) {
    await page.getByRole("button", { name: theme }).click();
    await expect(page.getByRole("link", { name: /trysinkaye@gmail.com/ }).first()).toBeVisible();
    await expect(page.getByLabel("Your message", { exact: true })).toBeVisible();
  }
  await fill(page);
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByRole("status")).toContainText("has not been sent");
  await expect(page.getByLabel("Your message", { exact: true })).not.toBeEmpty();
});
test("loading, success, failure, and network-error states preserve the right form behavior", async ({ page }) => {
  await page.goto("/contact");
  let mode = "success";
  await page.route("**/api/contact", async route => {
    await new Promise(resolve => setTimeout(resolve, 300));
    if (mode === "network") return route.abort();
    await route.fulfill({ status: mode === "success" ? 200 : 502, contentType: "application/json", body: JSON.stringify({ ok: mode === "success", message: mode === "success" ? "Your message has been accepted for delivery." : "The email service could not confirm delivery." }) });
  });
  await fill(page);
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByRole("button", { name: "Sending…" })).toBeDisabled();
  await expect(page.getByRole("status")).toContainText("accepted for delivery");
  await expect(page.getByLabel("Your name", { exact: true })).toBeEmpty();
  mode = "error";
  await fill(page);
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByRole("status")).toContainText("could not confirm");
  await expect(page.getByLabel("Your name", { exact: true })).toHaveValue("Portfolio Test");
  mode = "network";
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByRole("status")).toContainText("couldn’t confirm");
});
test("invalid fields expose accessible errors from the server", async ({ page }) => {
  await page.goto("/contact");
  await fill(page);
  await page.getByLabel("Your name", { exact: true }).fill("  ");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByLabel("Your name", { exact: true })).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByText("Please enter at least 2 characters.")).toBeVisible();
  await expect(page.getByLabel("Your name", { exact: true })).toBeFocused();
});


import { test, expect } from "@playwright/test";

test.describe("Projects Filtering", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/projects");
  });

  test("should display all projects initially", async ({ page }) => {
    const projectCards = page.locator('[data-testid="project-card"]');
    await expect(projectCards).toHaveCount(4); // 4 sample projects
  });

  test("search filters projects by title", async ({ page }) => {
    const searchInput = page.getByLabel("Search projects");
    await searchInput.fill("portfolio");

    await expect(page.locator('[data-testid="project-card"]')).toHaveCount(1);
    await expect(page.getByText("Portfolio Platform")).toBeVisible();
  });

  test("search filters projects by description", async ({ page }) => {
    const searchInput = page.getByLabel("Search projects");
    await searchInput.fill("weather");

    await expect(page.locator('[data-testid="project-card"]')).toHaveCount(1);
    await expect(page.getByText("Weather Dashboard")).toBeVisible();
  });

  test("search filters projects by technology", async ({ page }) => {
    const searchInput = page.getByLabel("Search projects");
    await searchInput.fill("react");

    await expect(page.locator('[data-testid="project-card"]')).toHaveCount(2);
  });

  test("technology filter works", async ({ page }) => {
    const techFilter = page.getByRole("button", { name: /nextjs/i });
    await techFilter.click();

    await expect(page.locator('[data-testid="project-card"]')).toHaveCount(2);
    await expect(techFilter).toHaveAttribute("aria-pressed", "true");

    await techFilter.click();
    await expect(page.locator('[data-testid="project-card"]')).toHaveCount(4);
    await expect(techFilter).toHaveAttribute("aria-pressed", "false");
  });

  test("featured filter works", async ({ page }) => {
    const featuredFilter = page.getByRole("button", { name: "Featured only" });
    await featuredFilter.click();

    await expect(page.locator('[data-testid="project-card"]')).toHaveCount(1);
    await expect(featuredFilter).toHaveAttribute("aria-pressed", "true");

    await featuredFilter.click();
    await expect(page.locator('[data-testid="project-card"]')).toHaveCount(4);
    await expect(featuredFilter).toHaveAttribute("aria-pressed", "false");
  });

  test("URL updates with search query", async ({ page }) => {
    const searchInput = page.getByLabel("Search projects");
    await searchInput.fill("react");

    await expect(page).toHaveURL(/q=react/);
  });

  test("URL updates with technology filter", async ({ page }) => {
    const techFilter = page.getByRole("button", { name: /nextjs/i });
    await techFilter.click();

    await expect(page).toHaveURL(/tech=nextjs/);
  });

  test("URL updates with featured filter", async ({ page }) => {
    const featuredFilter = page.getByRole("button", { name: "Featured only" });
    await featuredFilter.click();

    await expect(page).toHaveURL(/featured=true/);
  });

  test("refresh preserves filter state", async ({ page }) => {
    const searchInput = page.getByLabel("Search projects");
    await searchInput.fill("react");

    await page.reload();
    await expect(page).toHaveURL(/q=react/);
    await expect(page.locator('[data-testid="project-card"]')).toHaveCount(2);
  });

  test("back button preserves filter state", async ({ page }) => {
    const searchInput = page.getByLabel("Search projects");
    await searchInput.fill("react");

    await page.goto("/about");
    await page.goBack();
    await expect(page).toHaveURL(/q=react/);
    await expect(page.locator('[data-testid="project-card"]')).toHaveCount(2);
  });

  test("empty state appears when no projects match", async ({ page }) => {
    const searchInput = page.getByLabel("Search projects");
    await searchInput.fill("nonexistent");

    await expect(page.getByText("No projects match your current filters")).toBeVisible();
    await expect(page.getByRole("button", { name: "Clear filters" })).toBeVisible();
  });

  test("clear filters button resets all filters", async ({ page }) => {
    const searchInput = page.getByLabel("Search projects");
    await searchInput.fill("react");

    const techFilter = page.getByRole("button", { name: /nextjs/i });
    await techFilter.click();

    await page.getByText("No projects match your current filters").waitFor();
    await page.getByRole("button", { name: "Clear filters" }).click();

    await expect(page.locator('[data-testid="project-card"]')).toHaveCount(4);
    await expect(page).toHaveURL("/projects");
  });

  test("keyboard navigation works for search", async ({ page }) => {
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab"); // Focus search input
    await page.keyboard.type("react");

    await expect(page.locator('[data-testid="project-card"]')).toHaveCount(2);
  });

  test("keyboard navigation works for technology filters", async ({ page }) => {
    const techFilter = page.getByRole("button", { name: /nextjs/i });
    await techFilter.focus();
    await page.keyboard.press("Enter");

    await expect(techFilter).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator('[data-testid="project-card"]')).toHaveCount(2);
  });

  test("keyboard navigation works for featured filter", async ({ page }) => {
    const featuredFilter = page.getByRole("button", { name: "Featured only" });
    await featuredFilter.focus();
    await page.keyboard.press("Enter");

    await expect(featuredFilter).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator('[data-testid="project-card"]')).toHaveCount(1);
  });

  test("no console errors during filtering", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    const searchInput = page.getByLabel("Search projects");
    await searchInput.fill("react");

    const techFilter = page.getByRole("button", { name: /nextjs/i });
    await techFilter.click();

    const featuredFilter = page.getByRole("button", { name: "Featured only" });
    await featuredFilter.click();

    expect(errors).toHaveLength(0);
  });
});

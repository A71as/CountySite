import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Accessibility Tests", () => {
  test("Homepage accessibility scan", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Run axe scan
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "best-practice"])
      .analyze();

    // Log violations for debugging
    if (accessibilityScanResults.violations.length > 0) {
      console.log("Accessibility violations found:");
      accessibilityScanResults.violations.forEach((violation) => {
        console.log(`- ${violation.id}: ${violation.description}`);
        console.log(`  Impact: ${violation.impact}`);
        console.log(`  Nodes affected: ${violation.nodes.length}`);
      });
    }

    // Verify no critical or serious violations
    const criticalViolations = accessibilityScanResults.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious"
    );

    expect(criticalViolations).toHaveLength(0);

    // Log warnings for review (moderate and minor)
    const warnings = accessibilityScanResults.violations.filter(
      (v) => v.impact === "moderate" || v.impact === "minor"
    );

    if (warnings.length > 0) {
      console.log(`\n${warnings.length} accessibility warnings to review:`);
      warnings.forEach((warning) => {
        console.log(`- ${warning.id}: ${warning.description} (${warning.impact})`);
      });
    }

    // Ensure we have some results
    expect(accessibilityScanResults.violations.length).toBeGreaterThanOrEqual(0);
  });

  test("Privacy page accessibility scan", async ({ page }) => {
    await page.goto("/privacy");
    await page.waitForLoadState("networkidle");

    // Run axe scan
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "best-practice"])
      .analyze();

    // Log violations for debugging
    if (accessibilityScanResults.violations.length > 0) {
      console.log("Accessibility violations on privacy page:");
      accessibilityScanResults.violations.forEach((violation) => {
        console.log(`- ${violation.id}: ${violation.description}`);
        console.log(`  Impact: ${violation.impact}`);
      });
    }

    // Verify no critical or serious violations
    const criticalViolations = accessibilityScanResults.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious"
    );

    expect(criticalViolations).toHaveLength(0);
  });

  test("Color contrast compliance", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Run axe scan with color contrast rules
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();

    // Filter for color contrast violations
    const contrastViolations = accessibilityScanResults.violations.filter(
      (v) =>
        v.id === "color-contrast" ||
        v.description.toLowerCase().includes("contrast")
    );

    if (contrastViolations.length > 0) {
      console.log("Color contrast violations found:");
      contrastViolations.forEach((violation) => {
        console.log(`- ${violation.description}`);
        violation.nodes.forEach((node) => {
          console.log(`  Element: ${node.html}`);
        });
      });
    }

    // Check specific sections mentioned
    // Hero section
    const heroSection = page.locator("#home, section:has-text('Fighting for')").first();
    if (await heroSection.count() > 0) {
      const heroContrast = await new AxeBuilder({ page })
        .include("#home, section:has-text('Fighting for')")
        .withTags(["color-contrast"])
        .analyze();

      const heroViolations = heroContrast.violations.filter(
        (v) => v.id === "color-contrast"
      );
      expect(heroViolations).toHaveLength(0);
    }

    // Issues section (white text on blue background)
    const issuesSection = page.locator("#issues").first();
    if (await issuesSection.count() > 0) {
      const issuesContrast = await new AxeBuilder({ page })
        .include("#issues")
        .withTags(["color-contrast"])
        .analyze();

      const issuesViolations = issuesContrast.violations.filter(
        (v) => v.id === "color-contrast"
      );
      expect(issuesViolations).toHaveLength(0);
    }
  });

  test("Keyboard navigation", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Get all focusable elements
    const focusableSelectors = [
      "a[href]",
      "button:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "[tabindex]:not([tabindex='-1'])",
    ].join(", ");

    const focusableElements = await page.locator(focusableSelectors).all();

    expect(focusableElements.length).toBeGreaterThan(0);

    // Test tabbing through elements
    await page.keyboard.press("Tab");

    // Check if focus indicator is visible
    const focusedElement = await page.evaluate(() => {
      const active = document.activeElement;
      if (!active) return null;

      const styles = window.getComputedStyle(active);
      const outline = styles.outline || styles.outlineWidth;
      const boxShadow = styles.boxShadow;

      return {
        tag: active.tagName,
        hasOutline: outline !== "none" && outline !== "0px",
        hasBoxShadow: boxShadow !== "none",
        hasFocusVisible: active.matches(":focus-visible"),
      };
    });

    expect(focusedElement).toBeTruthy();
    expect(
      focusedElement?.hasOutline ||
        focusedElement?.hasBoxShadow ||
        focusedElement?.hasFocusVisible
    ).toBeTruthy();

    // Test that all interactive elements are reachable
    let tabCount = 0;
    const maxTabs = 50; // Safety limit

    while (tabCount < maxTabs) {
      await page.keyboard.press("Tab");
      tabCount++;

      const currentFocus = await page.evaluate(() => document.activeElement?.tagName);
      if (!currentFocus || currentFocus === "BODY") {
        break;
      }
    }

    // Verify we were able to tab through multiple elements
    expect(tabCount).toBeGreaterThan(1);
  });

  test("Form labels and ARIA attributes", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Find all form inputs
    const inputs = await page.locator("input, textarea, select").all();

    for (const input of inputs) {
      const inputId = await input.getAttribute("id");
      const ariaLabel = await input.getAttribute("aria-label");
      const ariaLabelledBy = await input.getAttribute("aria-labelledby");
      const placeholder = await input.getAttribute("placeholder");

      // Check if input has a label
      let hasLabel = false;

      if (inputId) {
        // Check for associated label element
        const label = await page.locator(`label[for="${inputId}"]`).count();
        hasLabel = label > 0;
      }

      // Input should have either:
      // 1. An associated label (via for/id)
      // 2. An aria-label
      // 3. An aria-labelledby
      // 4. A placeholder (less ideal but acceptable for some cases)
      const hasAccessibleName =
        hasLabel || !!ariaLabel || !!ariaLabelledBy || !!placeholder;

      expect(hasAccessibleName).toBeTruthy();

      // Check for error message association
      const hasError = await input.getAttribute("aria-invalid");
      if (hasError === "true") {
        const ariaDescribedBy = await input.getAttribute("aria-describedby");
        expect(ariaDescribedBy).toBeTruthy();

        // Verify the error message element exists
        if (ariaDescribedBy) {
          const errorElement = await page.locator(`#${ariaDescribedBy}`).count();
          expect(errorElement).toBeGreaterThan(0);
        }
      }
    }

    // Run axe scan specifically for form-related issues
    const formAccessibilityScan = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();

    const formViolations = formAccessibilityScan.violations.filter(
      (v) =>
        v.id === "label" ||
        v.id === "aria-label" ||
        v.description.toLowerCase().includes("label") ||
        v.description.toLowerCase().includes("form")
    );

    // Log form-specific violations
    if (formViolations.length > 0) {
      console.log("Form accessibility violations:");
      formViolations.forEach((violation) => {
        console.log(`- ${violation.id}: ${violation.description}`);
      });
    }

    // No critical form violations
    const criticalFormViolations = formViolations.filter(
      (v) => v.impact === "critical" || v.impact === "serious"
    );
    expect(criticalFormViolations).toHaveLength(0);
  });

  test("ARIA attributes and semantic HTML", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Run axe scan for ARIA and semantic HTML issues
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();

    // Check for ARIA-related violations
    const ariaViolations = accessibilityScanResults.violations.filter(
      (v) =>
        v.id.includes("aria") ||
        v.description.toLowerCase().includes("aria") ||
        v.description.toLowerCase().includes("semantic")
    );

    if (ariaViolations.length > 0) {
      console.log("ARIA and semantic HTML violations:");
      ariaViolations.forEach((violation) => {
        console.log(`- ${violation.id}: ${violation.description}`);
      });
    }

    // No critical ARIA violations
    const criticalAriaViolations = ariaViolations.filter(
      (v) => v.impact === "critical" || v.impact === "serious"
    );
    expect(criticalAriaViolations).toHaveLength(0);
  });
});

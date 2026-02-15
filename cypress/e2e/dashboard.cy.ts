describe("Climate Financial Risk Analytics", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders the header, filters, and chart on load", () => {
    cy.contains("Climate Financial Risk Analytics").should("be.visible");

    cy.contains("label", "Financial Metric")
      .parent()
      .find(".cursor-pointer")
      .first()
      .should("contain.text", "EBIT");

    cy.contains("label", "Timeframe")
      .parent()
      .find(".cursor-pointer")
      .first()
      .should("contain.text", "Long-term (2025-2034)");

    cy.get(".recharts-responsive-container").should("exist");
    cy.get(".recharts-line").should("have.length", 6);
  });

  it("updates the chart when a different financial metric is selected", () => {
    cy.contains("label", "Financial Metric")
      .parent()
      .find(".cursor-pointer")
      .first()
      .click();

    cy.contains("li", "DCF").click();

    cy.contains("label", "Financial Metric")
      .parent()
      .find(".cursor-pointer")
      .first()
      .should("contain.text", "DCF");

    cy.get(".recharts-responsive-container").should("exist");
    cy.get(".recharts-line").should("have.length", 6);
  });

  it("updates the chart when a different timeframe is selected", () => {
    cy.contains("label", "Timeframe")
      .parent()
      .find(".cursor-pointer")
      .first()
      .click();

    cy.contains("li", "Short-term (2025-2027)").click();

    cy.contains("label", "Timeframe")
      .parent()
      .find(".cursor-pointer")
      .first()
      .should("contain.text", "Short-term (2025-2027)");

    cy.get(".recharts-responsive-container").should("exist");
    cy.get(".recharts-brush").should("exist");
  });
});

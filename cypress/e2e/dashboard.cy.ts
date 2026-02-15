describe("Climate Risk Dashboard", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders the header, filters, and chart on load", () => {
    cy.contains("Climate Risk Analytics").should("be.visible");

    cy.get("#line-item").should("have.value", "EBIT");
    cy.get("#timeframe").should("have.value", "long");

    cy.get(".recharts-responsive-container").should("exist");
    cy.get(".recharts-line").should("have.length", 6);
  });

  it("updates the chart when a different financial metric is selected", () => {
    cy.get("#line-item").select("DCF");
    cy.get("#line-item").should("have.value", "DCF");

    cy.get(".recharts-responsive-container").should("exist");
    cy.get(".recharts-line").should("have.length", 6);
  });

  it("updates the chart when a different timeframe is selected", () => {
    cy.get("#timeframe").select("short");
    cy.get("#timeframe").should("have.value", "short");

    // Short-term should render fewer data points via the brush
    cy.get(".recharts-responsive-container").should("exist");
    cy.get(".recharts-brush").should("exist");
  });
});

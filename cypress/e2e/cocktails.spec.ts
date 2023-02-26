// https://docs.cypress.io/api/introduction/api.html

describe("Render root page", () => {
  it("visits the app root url", () => {
    cy.fixture("categories").then((json) => {
      cy.intercept(
        "GET",
        "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list",
        json
      ).as("getCategories");
    });

    cy.fixture("cocktail").then((json) => {
      cy.intercept(
        "GET",
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary+Drink",
        json
      ).as("getCocktailsByCategory");
    });

    cy.visit("/");

    cy.contains("div", "There are no cocktails.").should("not.exist");
    cy.contains("h2", "Ordinary Drink").should("exist");
    cy.contains("Margarita").should("exist");
  });
});

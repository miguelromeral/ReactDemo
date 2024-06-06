describe("App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it('should display the navbar', () => {
    cy.get('#spLogoApp').contains("React APP");
  });
});
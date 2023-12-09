describe('drag-n-drop ingredient to constructor', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it("should drag ingredients to constructor", () => {
    cy.get("[data-cy=ingredients]")
        .contains("Краторная")
        .trigger("dragstart");
    cy.get("[data-cy=constructor]").trigger("drop");
  })

})
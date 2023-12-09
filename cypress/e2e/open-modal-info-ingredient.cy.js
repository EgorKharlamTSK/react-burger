describe('open modal with ingredient info after click', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it("should open modal with ingredient info", () => {
        cy.get("[data-cy=ingredientClick]").first().click();
        cy.contains("Детали ингридиента")
    })

    it("should open modal with data ingredient info", () => {
        cy.get("[data-cy=ingredientClick]").first().click();
        cy.contains("Калории,ккал")
    })

})
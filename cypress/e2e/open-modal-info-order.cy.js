describe('open modal with ingredient info after click', () => {
    beforeEach(() => {
        cy.visit('/')

        window.localStorage.setItem(
            "accessToken",
            JSON.stringify("test-accessToken")
        );

        window.localStorage.setItem(
            "refreshToken",
            JSON.stringify("test-refreshToken")
        );

        cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
        cy.intercept("POST", "api/orders", { fixture: "order.json" }).as("postOrder");

    })

    it("should drag ingredients to constructor", () => {
        cy.get("[data-cy=ingredients]")
            .contains("Краторная")
            .trigger("dragstart");
        cy.get("[data-cy=constructor]").trigger("drop");
        cy.get("[data-cy=ingredients]")
            .contains("Соус Spicy-X")
            .trigger("dragstart");
        cy.get("[data-cy=constructor]").trigger("drop");
        cy.get("[data-cy=ingredients]")
            .contains("Биокотлета из марсианской Магнолии")
            .trigger("dragstart")
        cy.get("[data-cy=constructor]").trigger("drop");
        cy.get("[data-cy=btnOrder]").contains("Оформить заказ").click()

        cy.contains("123").should("exist")
    })
})
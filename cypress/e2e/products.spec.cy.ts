describe('Product page', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/products')
    cy.intercept({
      method: "POST",
      url: Cypress.env("REACT_APP_BASE_API_URL") + "/products",
    }).as("addProductAPI");
    cy.intercept({
      method: "DELETE",
      url: Cypress.env("REACT_APP_BASE_API_URL") + "/products/**",
    }).as("deleteProductAPI");
    cy.intercept({
      method: "GET",
      url: Cypress.env("REACT_APP_BASE_API_URL") + "/products",
    }).as("getListProductAPI");
    cy.wait(1000)
  })

  it('add product', () => {
    cy.get("h6").contains("Add product").should("be.visible")
    cy.get("input[name='name']").should("be.visible")
    cy.get("input[name='price']").should("be.visible")
    cy.get("button").contains("Add").should("be.visible")
    const testName = "test product " + (Date.now()/1000)
    cy.get("input[name='name']").type(testName)
    cy.get("input[name='price']").type("10000")
    cy.get("button").contains("Add").click()
    cy.wait("@addProductAPI").then(({ response }) => {
      expect(response?.statusCode).to.eq(201);
      cy.wait("@getListProductAPI").then(() => {
        cy.wait(1000)
        cy.get("tr").last().within(() => {
          cy.get("td").first().should("contain.text", testName)
        })
      })
    });
  })

  it('delete product', () => {
    let productNameToDelete
    cy.get("tr").last().within(() => {
      cy.get("td").first().invoke("text").then(text => productNameToDelete = text)
      cy.get("button").contains("Delete").click()
    })
    cy.wait("@deleteProductAPI").then(({ response }) => {
      expect(response?.statusCode).to.eq(200);
      cy.wait("@getListProductAPI").then(() => {
        cy.get("tr").last().within(() => {
          cy.get("td").first().should("not.contain.text", productNameToDelete)
        })
      })
    });
  })

})
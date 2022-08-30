describe('Home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })
  it('render', () => {
    cy.get("nav ul").should("be.visible").within(() => {
      cy.get("li a").should("have.length", 2)
    })
    cy.get("div").contains("Hello from Cypress").should("be.visible")
  })
  it('change page', () => {
    const linkToProductsPage = cy.get("a").contains("Products")
    linkToProductsPage.should("be.visible")
    linkToProductsPage.click()
    cy.url().should("include", "/products")
  })
})
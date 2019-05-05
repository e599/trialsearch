describe("The Landing Page", () => {
  it("should be able to visit the website", () => {
    cy.visit("/")
  })

  it("should not redirect if the user tries to search with no input", () => {
    cy.visit("/")
    cy.get("input")
      .first()
      .type("{enter}")

    cy.url().should(location => {
      expect(location.pathname).to.equal(undefined)
    })
  })

  it("should redirect if the user enters a search term", () => {
    cy.visit("/")
    cy.get("input")
      .type("cancer")
      .type("{enter}")

    cy.location().should(location => {
      expect(location.pathname).to.equal("/search")
      expect(location.search).to.equal("?search_term=cancer")
    })
  })
})

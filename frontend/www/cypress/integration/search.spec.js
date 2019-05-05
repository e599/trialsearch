const URL = "/search?search_term=cancer"

describe("Search Page", () => {
  beforeEach(() => {
    cy.viewport("macbook-13")
    cy.server()
    cy.route("**/search/**").as("searchRequest")

    cy.visit(URL)
  })

  it("should load show skeleton tiles while the search results are loading", () => {
    cy.get('[data-cy="search-results"]')
      .children()
      .should("have.length", 3)
  })

  it("should show search results once the data has finished loading", () => {
    cy.wait("@searchRequest")
      .its("status")
      .should("equal", 200)

    cy.get('[data-cy="search-results"]')
      .children()
      .should("have.length", 26)
  })

  it("should update the search when filters change", () => {
    cy.wait("@searchRequest")
      .its("status")
      .should("equal", 200)

    cy.get('[data-cy="filters-button"]').click()

    cy.get('[data-cy="search-filters-panel"]')
      .get(".ant-select")
      .first()
      .click()

    cy.get(".ant-select-dropdown-menu-item")
      .first()
      .click()

    cy.get('[data-cy="filters-button"]').click()

    cy.wait("@searchRequest")
      .its("status")
      .should("equal", 200)
  })

  it("should be able to perform searches on the map", () => {
    cy.url().then(prevUrl => {
      cy.wait("@searchRequest")
      cy.viewport("macbook-15")

      cy.get('[data-cy="map-search-button"]').click()

      cy.wait("@searchRequest")
        .its("status")
        .should("equal", 200)

      cy.url().should("not.equal", prevUrl)
    })
  })

  it("should fetch more search results when the user scrolls to the bottom", () => {
    cy.wait("@searchRequest")

    cy.get("#sentinel1").scrollIntoView()

    cy.wait("@searchRequest")
      .its("status")
      .should("equal", 200)

    cy.get('[data-cy="search-results"]')
      .children()
      .should("have.length", 51)
  })

  it("after an infinite scroll fetch, setting the filters will reset the number of search results", () => {
    cy.wait("@searchRequest")

    cy.get("#sentinel1").scrollIntoView()

    cy.wait("@searchRequest")
      .its("status")
      .should("equal", 200)

    cy.get('[data-cy="filters-button"]').click()

    cy.get('[data-cy="search-filters-panel"]')
      .get(".ant-select")
      .first()
      .click()

    cy.get(".ant-select-dropdown-menu-item")
      .first()
      .click()

    cy.get('[data-cy="filters-button"]').click()

    cy.wait("@searchRequest")
      .its("status")
      .should("equal", 200)

    cy.get('[data-cy="search-results"]')
      .children()
      .should("have.length", 26)
  })
})

const URL = "/search?search_term=cancer"

describe("Details Page", () => {
  beforeEach(() => {
    cy.server()
    cy.route("**/v1/search/**").as("searchRequest")
    cy.route("**/v1/trial/**").as("detailRequest")

    cy.visit(URL)

    cy.wait("@searchRequest")
  })

  it("selects a detail view", () => {
    cy.get('[data-cy="search-results"')
      .children()
      .first()
      .click()

    cy.get('[data-cy="detail-view"]').should("exist")
  })

  it("closes a detail view", () => {
    cy.get('[data-cy="search-results"')
      .children()
      .first()
      .click()

    cy.get('[data-cy="detail-view"]')
      .children(".anticon-close")
      .click()

    cy.get('[data-cy="detail-view"]').should("not.exist")
  })

  it("should display extra information", () => {
    cy.get('[data-cy="search-results"')
      .children()
      .first()
      .click()

    cy.wait("@detailRequest")
    cy.get('[data-cy="detail-view"]')
      .should("contain", "Intervention:")
      .should("contain", "Status:")
      .should("contain", "Mesh Terms")
  })

  it("Perform a node traversal", async () => {
    cy.get('[data-cy="search-results"')
      .children()
      .first()
      .click()

    cy.wait("@detailRequest")

    cy.get('[data-cy="detail-view"]')
      .find(".ant-collapse-header")
      .first()
      .click()

    cy.get('[data-cy="detail-view"]')
      .find(".ant-tag")
      .first()
      .click()

    cy.wait("@searchRequest")

    cy.get('[data-cy="detail-view"]').should("not.exist")
    cy.get("nav").should("contain", "With Similar")
  })
})

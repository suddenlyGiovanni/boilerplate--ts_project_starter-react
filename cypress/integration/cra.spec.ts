describe('CRA', () => {
  it('shows learn link', () => {
    const learReactLink = 'Learn React'

    cy.visit('http://localhost:3000')

    cy.getByText(learReactLink)
      .should('be.visible')
      .and('have.text', learReactLink)
  })
})

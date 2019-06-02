describe('CRA', () => {
  it('shows learn link', () => {
    cy.visit('http://localhost:3000')
    cy.getByText('Learn React')
      .should('be.visible')
      .and('have.text', 'Learn React')
  })
})

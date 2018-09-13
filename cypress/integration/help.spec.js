describe('Help Tour', () => {

  it('is disabled by default', () => {
      cy.visit('/survey.html?survey=test.json&mode=online')
          .get('#helpModal').should('not.exist')
  })

  it('is activated with query param', () => {

  })

})
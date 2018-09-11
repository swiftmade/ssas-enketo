context('Survey session', () => {


  beforeEach(function() {
    indexedDB.deleteDatabase('_pouch_sessions')
  })

  it('is not activated in online mode', () => {
    cy.visit('/survey.html?survey=test.json&mode=online')
      .wait(500)
      .get('.modal-container').should('not.visible')
      .get('.save-progress').should('not.visible');
  })

  it('can be created in offline mode', () => {
    cy.visit('/survey.html?survey=test.json&mode=offline')
      .wait(500)
      .get('.modal-container').should('visible')
      .get('.modal-body input').type('Test session')
      .get('.modal-body button').contains('Start').click()
      .wait(500)
      .get('.save-progress').should('visible');
  })


})

describe('Survey session', () => {

  before(function() {
    cy.on('window:confirm', () => {
      return true
    })
    indexedDB.deleteDatabase('_pouch_sessions')
  })
  
  it('is not activated in online mode', () => {
    cy.visit('/survey.html?survey=test.json&mode=online')
      .get('#surveyModal').should('not.exist')
      .get('.save-progress').should('not.visible');
  })

  it('can be started using a query param', () => {
    // On next refresh, session should not be visible.
    cy.visit('/survey.html?survey=test.json&mode=offline&session=test')
      .get('#surveyModal').should('not.exist')
      // Make sure the save button is visible
      .get('#surveyModal').should('not.be.visible')
      .get('.save-progress').should('visible');
  })

  it('can be created in offline mode', () => {
    indexedDB.deleteDatabase('_pouch_sessions')
    cy.visit('/survey.html?survey=test.json&mode=offline')
      .get('#surveyModal').should('be.visible')
      // Type in the session name and create it
      .get('.modal-body input').type('Test session')
      .get('.modal-body button').contains('Start').click()
      // Make sure the save button is visible
      .get('#surveyModal').should('not.be.visible')
      .get('.save-progress').should('visible');
  })

  it('can be deleted by user', () => {
    // Session is persisted. Try deleting it.
    cy.visit('/survey.html?survey=test.json&mode=offline')
      // Session modal
      .get('#surveyModal').should('be.visible')
      .get('.session-name').contains('Test session').should('be.visible')
      .get('.action--delete_session').click()
      .get('.session-name').should('not.exist')
  })

})

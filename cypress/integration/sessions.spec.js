describe('Survey session', () => {

  before(function() {
    indexedDB.deleteDatabase('_pouch_sessions')
  })

  it('is not activated in online mode', () => {
    cy.visit('/survey.html?survey=test.json&mode=online')
      .wait(200)
      .get('#surveyModal').should('not.exist')
      .get('.save-progress').should('not.visible');
  })

  it('can be created in offline mode', () => {
    cy.visit('/survey.html?survey=test.json&mode=offline')
      .wait(200)
      .get('#surveyModal').should('be.visible')
      // Type in the session name and create it
      .get('.modal-body input').type('Test session')
      .get('.modal-body button').contains('Start').click()
      .wait(200)
      // Make sure the save button is visible
      .get('#surveyModal').should('not.be.visible')
      .get('.save-progress').should('visible');
  })

  it('can be deleted by user', () => {

    cy.on('window:confirm', () => {
      return true
    })
    // Session is persisted. Try deleting it.
    cy.visit('/survey.html?survey=test.json&mode=offline')
      .wait(200)
      // Session modal
      .get('#surveyModal').should('be.visible')
      .get('.session-name').contains('Test session').should('be.visible')
      .get('.action--delete_session').click()
      .get('.session-name').should('not.exist')
  })

  it('can be saved by clicking the save icon', () => {
    // On next refresh, session should not be visible.
    cy.reload()
      .wait(200)
      // Session modal
      .get('#surveyModal').should('be.visible')
      .get('.session-name').should('not.exist')
      .get('.modal-body input').type('Test session')
      .get('.modal-body button').contains('Start').click()
      .wait(200)
      .get('#surveyModal').should('not.be.visible')
      .get('.save-progress').click()
      .get('.toast.toast-success').should('be.visible')
  })


})

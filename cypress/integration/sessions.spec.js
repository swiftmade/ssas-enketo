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
      .get('#surveyModal').should('not.exist')
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

  it('will not overwrite existing sessions while creating in offline mode', () => {
    
    const getTime = () => {
      const date = new Date()
      return `${date.getHours()}:${date.getMinutes()}`
    }
    
    indexedDB.deleteDatabase('_pouch_sessions')
    cy.visit('/survey.html?survey=test.json&mode=offline')
      .get('#surveyModal').should('be.visible')
      // Type in the session name and create it
      .get('.modal-body input').type('Test session')
      .get('.modal-body button').contains('Start').click()
      // Make sure the save button is visible
      .get('#surveyModal').should('not.exist')
      .get('.save-progress').should('visible')
      .reload()
      // Type exactly the same session name
      .get('.modal-body input').type('Test session')
      .get('.modal-body button').contains('Start').click()
      .get('#surveyModal').should('not.exist')
      .reload()
      .get('.session-name').contains('Test session').should('be.visible')
      .get('.session-name').contains(`Test session ${getTime()}`).should('be.visible');
  })

  it('can be saved', () => {

    indexedDB.deleteDatabase('_pouch_sessions')
    
    cy.visit('/survey.html?survey=test.json&mode=offline&session=test')
      .get('input[name="/data/TEST1"]').should('have.value', '').type('Hello World!')
      .get('.save-progress').click()
      .reload()
      .get('input[name="/data/TEST1"]').should('have.value', 'Hello World!')

  })

  it('disappears once submitted, and appears in submissions', () => {

    // Make sure submissions page is empty
    cy.visit('/submissions.html')
      .get('[ng-cloak="true"]').should('not.exist')
      .get('#packet-rows').children().should('have.length', 0)

    // Start the survey and submit it.
    cy.visit('/survey.html?survey=test.json&mode=offline')
      .get('#surveyModal').should('be.visible')
      .get('.session-name').contains('test').click()
      .get('.submit-form').click()
      .location('pathname').should('eq', '/index.html')
    
    // Make sure when the survey page is reloaded, the session is not there
    cy.visit('/survey.html?survey=test.json&mode=offline')
      .get('#surveyModal').should('be.visible')
      .get('.session-name').should('not.visible')
    
    // And the submitted session should now appear in submissions page
    cy
      .visit('/submissions.html')
      .get('#packet-rows').children().should('have.length', 1)
  })

})

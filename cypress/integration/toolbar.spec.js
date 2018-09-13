describe('Toolbar', () => {

    beforeEach(() => {
        indexedDB.deleteDatabase('_pouch_sessions')
        // On next refresh, session should not be visible.
        cy.visit('/survey.html?survey=test.json&mode=offline')
            .wait(200)
            // Session modal
            .get('#surveyModal').should('be.visible')
            .get('.session-name').should('not.exist')
            .get('.modal-body input').type('Test session')
            .get('.modal-body button').contains('Start').click()
            .get('#surveyModal').should('not.be.visible')
    })

    it('has save button', () => {
        cy.get('.save-progress').click()
            .get('.toast.toast-success').should('be.visible')
    })

    it('has validate button', () => {
        cy.get('.validate-form').click()
            .get('.toast.toast-error').should('be.visible')
    })

    it('has jump to button', () => {
        cy
            .get('#jump-to').click()
            .get('#jump-to-block').should('be.visible')
    })
})
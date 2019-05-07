describe('Toolbar', () => {

    beforeEach(() => {
        indexedDB.deleteDatabase('_pouch_sessions')
    })

    const openAndStartSession = (params = 'survey=test.json&mode=offline') => {
        return cy.visit('/survey.dev.html?' + params)
            .wait(200)
            // Session modal
            .get('#surveyModal').should('be.visible')
            .get('.session-name').should('not.exist')
            .get('.modal-body input').type('Test session')
            .get('.modal-body button').contains('Start').click()
            .get('#surveyModal').should('not.be.visible')
    }

    it('has save', () => {
        openAndStartSession()
            .get('.save-progress').click()
            .get('.toast.toast-success').should('be.visible')
    })

    it('has validate', () => {
        openAndStartSession()
            .get('.validate-form').click()
            .get('.toast.toast-error').should('be.visible')
    })

    it('has jump to', () => {
        openAndStartSession()
            .get('#jump-to').click()
            .get('#jump-to-block').should('be.visible')
            .get('#jump-to-close').should('be.visible')
            .get('#jump-to-close').click()
            .get('#jump-to-block').should('not.be.visible')
    })

    it('can hide jump to', () => {
        openAndStartSession('survey=test.json&mode=offline&jumpto=off')
            .get('#jump-to').should('not.be.visible')
    })

    it('has quit button', () => {
        openAndStartSession('survey=test.json&mode=offline&jumpto=off')
            .get('#close-button').click()
            .location('pathname').should('eq', '/index.html')
    })
})

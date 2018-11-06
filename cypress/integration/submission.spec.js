describe('Submissions', () => {
    
    before(function () {
        indexedDB.deleteDatabase('_pouch_sessions')
    })
    
    it('submits directly from survey page to server in online mode', () => {
        cy.server()
        cy.route({
            method: 'POST',
            url: '/openrosa/submissions',
            response: [],
        }).as('postSubmission')

        cy.visit('/survey.dev.html?survey=test.json&mode=online&submit=openrosa/submissions&return=index.html')
            .get('input[name="/data/TEST1"]').type('Hello World!')
            .get('.submit-form').click()
        
        cy.wait('@postSubmission')
            .its('request.headers')
            .should('have.any.keys', 'X-OpenRosa-Version')
            .should('have.any.keys', 'X-OpenRosa-Instance-Id')
            .should('have.any.keys', 'X-OpenRosa-Deprecated-Id')

        cy.location('pathname').should('eq', '/index.html')
    })

    it('cancels exit if online submission fails', () => {
        cy.server()
        cy.route({
            method: 'POST',
            url: '/openrosa/submissions',
            response: [],
            status: 500,
        }).as('postSubmission')

        cy.visit('/survey.dev.html?survey=test.json&mode=online&submit=openrosa/submissions')
            .get('input[name="/data/TEST1"]').type('Hello World!')
            .get('.submit-form').click()

        cy.location('pathname').should('not.eq', '/index.html')
    })

    it('submits from submissions page in offline mode', () => {

        cy.server()
        cy.route({
            method: 'POST',
            url: '/openrosa/submissions',
            response: [],
            status: 200,
        }).as('postSubmission')

        cy.visit('/survey.dev.html?survey=test.json&mode=offline&session=test&submit=openrosa/submissions')
            .get('input[name="/data/TEST1"]').type('Hello World!')
            .get('.submit-form').click()

        cy.location('pathname').should('eq', '/index.html')

        cy.visit('/submissions.dev.html?submit=openrosa/submissions')
            .get('#packet-rows').children().should('have.length', 1)
            .get('.upload-packet').click()

        cy.wait('@postSubmission')
            .its('request.headers')
            .should('have.any.keys', 'X-OpenRosa-Version')
            .should('have.any.keys', 'X-OpenRosa-Instance-Id')
            .should('have.any.keys', 'X-OpenRosa-Deprecated-Id')

        cy.get('#packet-rows').children().should('have.length', 0)
    })

})
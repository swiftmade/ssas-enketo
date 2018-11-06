describe('Submissions', () => {
    
    it('submits directly to server in online mode', () => {
        cy.server()
        cy.route({
            method: 'POST',
            url: '/openrosa/submissions',
            response: [],
        }).as('postSubmission')

        cy.visit('/survey.dev.html?survey=test.json&mode=online&submit=openrosa/submissions')
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
            status: 500,
        }).as('postSubmission')

        cy.visit('/survey.dev.html?survey=test.json&mode=online&submit=openrosa/submissions')
            .get('input[name="/data/TEST1"]').type('Hello World!')
            .get('.submit-form').click()

        cy.wait('@postSubmission')
            .its('request.headers')
            .should('have.any.keys', 'X-OpenRosa-Version')
            .should('have.any.keys', 'X-OpenRosa-Instance-Id')
            .should('have.any.keys', 'X-OpenRosa-Deprecated-Id')

        cy.location('pathname').should('not.eq', '/index.html')
    })
    

})
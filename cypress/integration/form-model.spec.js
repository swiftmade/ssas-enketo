/*
import sessionRepository from '../../src/js/modules/repositories/sessions-repository'


describe('Patched Enketo Form Model', () => {

    it('allows arbitrary session object keys', async () => {

        const all = await sessionRepository.all()
        await all.map(session => sessionRepository.remove(session))

        const extra = {
            phonenumber: '123456',
            arbitraryKey: 'arbitraryValue',
        }

        cy.visit('/survey.dev.html?survey=test.json&mode=offline&session=test&session_extra=' + JSON.stringify(extra))
            .get('input[name="/data/TEST1"]').should('have.value', '').type('Hello World!')
            .get('.submit-form').click()
            .location('pathname').should('eq', '/index.html')
            .then(async () => { 
                const [testSession] = await sessionRepository.all()
                cy.wrap(testSession.payload).should('have.property', 'phonenumber', '123456')
                cy.wrap(testSession.payload).should('have.property', 'arbitraryKey', 'arbitraryValue')
                // TODO: Make sure these are also included in the submitted XML?
            })        
    })

})
*/
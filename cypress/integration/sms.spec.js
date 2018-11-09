import Sms from '../../src/js/submission/drivers/Sms'

describe('SMS', () => {
    it('transcodes xml to SMS message', () => {
        cy.fixture('session.xml').then((xml) => {

            const smsDriver = new Sms()
            const sms = smsDriver.objectToText(
                smsDriver.transcode(xml)
            )

            const messageLines = [
                'instanceID:uuid:e2c7f8a1-3cbd-451a-9fab-0cade1efbe30',
                'ScndryHzrd:y',
                'ScndryHzrdNm:kkkkkkk',
                'ScndryHzrdTyp:2',
                'RADaR1:n',
                'RADaR2:n',
                'RADaR3:n',
                'R3_Q1:0',
                'R3_Q2:0',
                'R3_Q3:0',
                'R3_Q4:0',
                'RADaR3_Q5:0',
                'RADaR3_Q6:0',
                'RADaR3_Q7:0',
                'RADaR3_Q8:0',
            ]

            expect(sms).to.eq(messageLines.join(';'))
        })
    })
})
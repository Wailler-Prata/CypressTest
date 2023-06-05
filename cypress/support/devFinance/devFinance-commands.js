
import {functionsDevfinance} from '../../../funcoes/devfinance'

Cypress.Commands.add('getVisibeElement', (selector)=>{
    return cy.get(selector).should('be.visible')
})

Cypress.Commands.add('registerEntranceInDevFinance',(description, amount, date)=>{
    cy.get('#transaction > .button')
        .should('be.visible')
        .click()
        .then(()=>{
            cy.getVisibeElement('#description').type(description)
            cy.getVisibeElement('#amount').type(amount)
            cy.getVisibeElement('#date').type(date)
            cy.getVisibeElement('.button.save').click()            
        })
})

Cypress.Commands.add('verifyCardsValueOfSumValues', (listEntrances)=>{
    cy.wrap(functionsDevfinance.CssSelectiorAndValuesTotalCardsByEntrances(listEntrances))
    .each((element) => {

        cy.getVisibeElement(element.cssSelector)
         .invoke('text')
         .then((text) => {           
             cy.wrap(functionsDevfinance.convertStringNumberTo(text).float(), {timeout: 0} ).should('eq', functionsDevfinance.numberRounder(element.value))
         }) 
     })
})

Cypress.Commands.add('verifyEntranceInDataTable', (entrance)=>{

    cy.getVisibeElement('#data-table tbody td[class="description"]').invoke('text').then((text)=>{
        expect(text).to.eq(entrance.description)
    })

    cy.getVisibeElement('#data-table tbody td').eq(1).invoke('text').then((text) => {   
        cy.wrap( functionsDevfinance.convertStringNumberTo(text).float(), {timeout: 0}).should('eq', entrance.amount)
    })

    cy.getVisibeElement('#data-table tbody td[class="date"]').invoke('text').then((text)=>{
        cy.wrap(functionsDevfinance.convetTextDateToRightFormatForBrowserForBrowser(text), {timeout: 0}).should('eq', entrance.date)
    })

})


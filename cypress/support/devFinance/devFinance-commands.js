
import {functionsDevFinance} from '../../../funcoes/devfinance'

Cypress.Commands.add('getVisibleElement', (selector)=>{
    return cy.get(selector).should('be.visible')
})

Cypress.Commands.add('registerEntranceInDevFinance',(description, amount, date)=>{
    cy.get('#transaction > .button')
        .should('be.visible')
        .click()
        .then(()=>{
            cy.getVisibleElement('#description').type(description)
            cy.getVisibleElement('#amount').type(amount)
            cy.getVisibleElement('#date').type(date)
            cy.getVisibleElement('.button.save').click()            
        })
})

Cypress.Commands.add('verifyCardsValueOfSumValues', (listEntrances)=>{
    cy.wrap(functionsDevFinance.CssSelectorAndValuesTotalCardsByEntrances(listEntrances))
    .each((element) => {

        cy.getVisibleElement(element.cssSelector)
         .invoke('text')
         .then((text) => {           
             cy.wrap(functionsDevFinance.convertStringNumberTo(text).float(), {timeout: 0} ).should('eq', functionsDevFinance.numberRounder(element.value))
         }) 
     })
})

Cypress.Commands.add('verifyEntranceInDataTable', (entrance)=>{

    cy.getVisibleElement('#data-table tbody td[class="description"]').invoke('text').then((text)=>{
        expect(text).to.eq(entrance.description)
    })

    cy.getVisibleElement('#data-table tbody td').eq(1).invoke('text').then((text) => {   
        cy.wrap( functionsDevFinance.convertStringNumberTo(text).float(), {timeout: 0}).should('eq', entrance.amount)
    })

    cy.getVisibleElement('#data-table tbody td[class="date"]').invoke('text').then((text)=>{
        cy.wrap(functionsDevFinance.convertTextDateToRightFormatForBrowserForBrowser(text), {timeout: 0}).should('eq', entrance.date)
    })

})


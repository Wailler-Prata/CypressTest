import {functionsDevfinance} from '../../funcoes/devfinance'

context('Dev Finances', () => {

    const positiveEntrance = {description:"Salário", amount: 100.03, date:"2023-02-01"}
    const negativeEntrance = {description:"Compra", amount: -75.23, date:"2023-02-02"}

    const cardValues = [
        {   
            cssSelector: "#totalDisplay",
            value: functionsDevfinance.numberRounder(positiveEntrance.amount + negativeEntrance.amount)
        },
        {   
            cssSelector: "#incomeDisplay",
            value: positiveEntrance.amount
        },
        {   
            cssSelector: "#expenseDisplay",
            value: negativeEntrance.amount
        }    
    ]

    beforeEach(() => {
        cy.visit('https://artursantiago.github.io/dev.finance/balance')        
    })

    it('Cadastrar uma entrada positiva', () => {        
        
        cy.registerEntranceInDevFinance(positiveEntrance.description, positiveEntrance.amount, positiveEntrance.date)

        cy.getVisibeElement('#data-table .description').invoke('text').then((text)=>{
            expect(text).to.eq(positiveEntrance.description)
        })

        cy.getVisibeElement('#data-table .income').invoke('text').then((text) => {           
            cy.wrap( functionsDevfinance.convertStringNumberTo(text).float(), {timeout: 0}).should('eq', positiveEntrance.amount)
        })

        cy.getVisibeElement('#data-table .date').invoke('text').then((text)=>{
            cy.wrap(functionsDevfinance.convetTextDateToRightFormat(text), {timeout: 0}).should('eq', positiveEntrance.date)
        })

        const cardValuesNegativeEntrance = cardValues.map(item =>{
            return  item.cssSelector == '#expenseDisplay'? { cssSelector: item. cssSelector, value: 0.00} : { cssSelector: item.cssSelector, value: positiveEntrance.amount}
            }
        )
        cy.verifyValueCardsOfSumValues(cardValuesNegativeEntrance)
    })    

        
    it('Cadastrar uma entrada negativa', () => {
        
        cy.registerEntranceInDevFinance(negativeEntrance.description, negativeEntrance.amount, negativeEntrance.date)
        
        cy.getVisibeElement('#data-table .description').invoke('text').then((text)=>{
            expect(text).to.eq(negativeEntrance.description)
        })

        cy.getVisibeElement('#data-table .expense').invoke('text').then((text) => {           
            cy.wrap(functionsDevfinance.convertStringNumberTo(text).float(), {timeout: 0} ).should('eq', negativeEntrance.amount)
        })

        cy.getVisibeElement('#data-table .date').invoke('text').then((text)=>{
            cy.wrap(functionsDevfinance.convetTextDateToRightFormat(text)).should('eq', negativeEntrance.date)
        })

        const cardValuesNegativeEntrance = cardValues.map(item =>{
            return  item.cssSelector == '#incomeDisplay'? { cssSelector: item. cssSelector, value: 0.00} : { cssSelector: item.cssSelector, value: negativeEntrance.amount}
            }
        )
        cy.verifyValueCardsOfSumValues(cardValuesNegativeEntrance)
    })

    it('Verificar valores dos cards entradas, saidas e totais após inserir entradas', () => {
       
        cy.registerEntranceInDevFinance(negativeEntrance.description, negativeEntrance.amount, negativeEntrance.date)
        cy.registerEntranceInDevFinance(positiveEntrance.description, positiveEntrance.amount, positiveEntrance.date)

        cy.verifyValueCardsOfSumValues(cardValues)
    })

    it('Verificar tema light', () => {

        cy.get('body')
            .invoke('css', 'background-color')
            .then((backgroundColor) => {
              expect(functionsDevfinance.rgbToHex(backgroundColor)).to.eq('#f0f2f5')
        })

        cy.get('header')
            .invoke('css', 'background-color')
            .then((backgroundColor) => {
              expect(functionsDevfinance.rgbToHex(backgroundColor)).to.eq('#2d4a22')
        })

    });

    it('Verificar tema dark', () => {
        cy.getVisibeElement('.theme-switch .slider').click()
        
        cy.get('body')
            .invoke('css', 'background-color')
            .then((backgroundColor) => {
              expect(functionsDevfinance.rgbToHex(backgroundColor)).to.eq('#202024')
        })

        cy.get('header')
            .invoke('css', 'background-color')
            .then((backgroundColor) => {
              expect(functionsDevfinance.rgbToHex(backgroundColor)).to.eq('#121214')
        })        
    })

    describe('Simulação de entradas já computadas para remoção', () => {
        
        before(() => {   
            functionsDevfinance.setLocalStorange('dev.finances:transactions', [{"description": negativeEntrance.description,"amount":negativeEntrance.amount,"date":negativeEntrance.date},{"description":positiveEntrance.description,"amount":positiveEntrance.amount,"date":positiveEntrance.date}])
        })

        it('Remover entradas', () => {
            cy.getVisibeElement('#data-table td img').first().click()
            cy.getVisibeElement('#data-table td img').click()

            const cardValuesEqualToZero = cardValues.map(item =>{return { cssSelector: item. cssSelector, value: 0.00}})
            cy.verifyValueCardsOfSumValues(cardValuesEqualToZero)
        })     
    });
})
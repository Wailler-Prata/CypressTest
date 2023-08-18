import {functionsDevFinance} from '../../funcoes/devfinance'

context('Dev Finances', () => {

    beforeEach(() => {
        cy.visit('https://artursantiago.github.io/dev.finance/balance')        
    })

    it('Cadastrar uma entrada positiva', () => {      
        
        cy.fixture('devFinance/entradas.json')
        .then((entrances)=>{

            const positiveEntrance = entrances.filter(item => item.amount >= 0)[0]

            cy.registerEntranceInDevFinance(positiveEntrance.description, positiveEntrance.amount, positiveEntrance.date)
            
            cy.getVisibleElement('#data-table > tbody > tr').its('length', {timeout:0}).should('to.eq', 1)
            cy.verifyEntranceInDataTable( {description: positiveEntrance.description, amount: positiveEntrance.amount, date: positiveEntrance.date})
            cy.verifyCardsValueOfSumValues([positiveEntrance])
        })
    })    

        
    it('Cadastrar uma entrada negativa', () => {

        cy.fixture('devFinance/entradas.json')
        .then((entrances)=>{

            const negativeEntrance = entrances.filter(item => item.amount < 0)[0]
        
            cy.registerEntranceInDevFinance(negativeEntrance.description, negativeEntrance.amount, negativeEntrance.date)
    
            cy.getVisibleElement('#data-table > tbody > tr').its('length', {timeout:0}).should('to.eq', 1)
            cy.verifyEntranceInDataTable( {description: negativeEntrance.description, amount: negativeEntrance.amount, date: negativeEntrance.date})
            cy.verifyCardsValueOfSumValues([negativeEntrance])
        })
    })

    it('Validação de valores dos cards (entradas, saídas e totais) após inserir múltiplas entradas', () => {

        cy.fixture('devFinance/entradas.json')
        .then((entrances)=>{

            const negativeEntrance = entrances.filter(item => item.amount < 0)[0]
            const positiveEntrance = entrances.filter(item => item.amount >= 0)[0]

            cy.registerEntranceInDevFinance(negativeEntrance.description, negativeEntrance.amount, negativeEntrance.date)
            cy.registerEntranceInDevFinance(positiveEntrance.description, positiveEntrance.amount, positiveEntrance.date)
            cy.getVisibleElement('#data-table > tbody > tr').its('length', {timeout:0}).should('to.eq', 2)

            cy.verifyCardsValueOfSumValues([negativeEntrance, positiveEntrance])
        })         
    })

    it('Verificar tema light', () => {

        cy.get('body')
            .invoke('css', 'background-color')
            .then((backgroundColor) => {
              expect(functionsDevFinance.colorRgbToHex(backgroundColor)).to.eq('#f0f2f5')
        })

        cy.get('header')
            .invoke('css', 'background-color')
            .then((backgroundColor) => {
              expect(functionsDevFinance.colorRgbToHex(backgroundColor)).to.eq('#2d4a22')
        })

    });

    it('Verificar tema dark', () => {
        cy.getVisibleElement('.theme-switch .slider').click()
        
        cy.get('body')
            .invoke('css', 'background-color')
            .then((backgroundColor) => {
              expect(functionsDevFinance.colorRgbToHex(backgroundColor)).to.eq('#202024')
        })

        cy.get('header')
            .invoke('css', 'background-color')
            .then((backgroundColor) => {
              expect(functionsDevFinance.colorRgbToHex(backgroundColor)).to.eq('#121214')
        })        
    })

    describe('Carregamento das informações em cache para execução do teste de remoção de entradas', () => {
        
        before(() => {
            cy.fixture('devFinance/entradas.json')
            .then((entrances)=>{
                functionsDevFinance.setLocalStorage('dev.finances:transactions', entrances)
            })            
        })

        it('Remoção de entradas', () => {
            cy.fixture('devFinance/entradas.json')
            .then((entrances)=>{

                cy.getVisibleElement('#data-table > tbody > tr').its('length', {timeout:0}).should('to.gt', 1)
                cy.wrap(entrances).each(()=>{
                    cy.getVisibleElement('#data-table > tbody > tr > td> img ').first().click()
                })
    
                cy.get('#data-table > tbody > tr').should('not.exist')
                cy.verifyCardsValueOfSumValues([{...entrances[0], amount:0}])
            })
        })     
    });
})
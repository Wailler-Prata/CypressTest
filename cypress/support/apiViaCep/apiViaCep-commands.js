Cypress.Commands.add('getEnderecoByCepFromCepApi', (cep)=>{
    return cy.request({
      method: 'GET',
      url: `ws/${cep}/json`,
      failOnStatusCode:false
    })
  })
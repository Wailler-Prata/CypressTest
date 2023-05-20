describe('Trabalhando com "Cy.Request"', () =>{
    it('Requisitando um endereço por um CEP valido', ()=>{
        cy.fixture('apiViaCep/enderecosValidos.json')
        .then((data)=>{

            const indice = Math.floor(Math.random() * ((data.length - 1) - 0 + 1) ) + 0 // Gera um numero de 0 a ultima posição do array de endereços
            const raw = data[indice]

            cy.request({
                method: 'GET',
                url: `ws/${raw.cep}/json`
            })
            .then((response)=>{
                expect(response.status).to.eq(200)
                expect(raw).to.deep.equal(response.body)
                //expect(response.body).to.have.keys(Object.keys(raw))
            })            
        })
    })

    it('Requisitando um endereço por um CEP inexistente', ()=>{
        cy.request( 'GET',
                    'ws/00000000/json',
            ).then((response) =>{
                expect(response.body.erro).to.eq(true)
            })
    })

    it('Requisitando um endereço por um CEP inválido (Alfanumérico)', ()=>{
        cy.request(
            {
                method: 'GET',
                url: 'ws/95010A10/json',
                failOnStatusCode: false
            }
        ).then((response) =>{
            expect(response.status).to.eq(400)
        })
    })
})

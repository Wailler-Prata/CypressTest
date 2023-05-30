describe('Trabalhando com "Cy.Request"', () =>{

    const generateRandomNumberInAInterval = (firstNumber, LastNumber)=>{
        return Math.floor(Math.random() * ((LastNumber - 1) - firstNumber + 1) ) + firstNumber // Gera um numero de 0 a ultima posição do array de endereços
    }

    it('Requisitando um endereço por um CEP valido', ()=>{
        cy.fixture('apiViaCep/enderecosValidos.json')
        .then((data)=>{

            const raw = data[generateRandomNumberInAInterval(0, data.length)]
            cy.request({
                method: 'GET',
                url: `ws/${raw.cep}/json`
            })
            .then((response)=>{
                expect(response.status).to.eq(200)
                expect(raw).to.deep.equal(response.body)

                cy.addTestContext({title: "Response esperado", value: raw})
                cy.addTestContext({title: "Response recebido", value: response.body})
            })            
        })
    })

    it('Requisitando um endereço por um CEP inexistente', ()=>{
        cy.request( 'GET',
                    'ws/00000000/json',
            ).then((response) =>{
                expect(response.status).to.eq(200)
                expect(response.body.erro).to.eq(true)
                cy.addTestContext(`Para Cep inexistente é esperado um HTTP 200 com response.body contendo erro = true`)
                cy.addTestContext(`Esperado um HTTP 200 e recebemos um ${response.status} `)
                cy.addTestContext({ title: 'Esperado response.body {erro: true}, recebemos :', value: response.body})
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
            cy.addTestContext(`Esperado um HTTP 400 e recebemos um ${response.status} `)
        })
    })
})

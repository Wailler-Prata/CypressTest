 # Testes E2E e API com Cypress

 Este é um exemplo de como o ```Cypress``` pode nos ajudar a executar tanto testes de interfaces quanto testes de API's.


### Construção do projeto
Este projeto foi construído em ```Node.js``` usando apenas ```Cypress``` para a elaboração e execução dos testes. 

Para a execução de pipeline ```CI/CD``` estamos utilizando ```Git-Hub Actions```, o arquivo ```.yml``` se encontra no seguinte diretório ```.github\workflows```.

Contudo, ainda estamos gerando um relatório da execução de testes, este é publicado a cada execução do nosso pipeline. O mesmo é construído pela biblioteca ```cypress-mochawesome-reporter```. As configurações de geração do report esta no arquivo ```cypress.config.js```.

### Arquitetura do projeto

Dentro do caminho ```cypress\e2e``` temos individualmente os arquivos de testes de cada uma das aplicações:

*```CyRequest.cy.js```, para os testes nos endpoints https://viacep.com.br.
*```dev-finance.cy.js```, para os testes no site https://artursantiago.github.io/dev.finance/balance.

O ```Cypress``` possui o padrão de arquitetura ```App-Actions```, que aliás, é o recomendado pelo próprio. Portanto, no diretório ```cypress\support``` foi criado uma pasta para cada domínio de teste, que por sua vez, contém o(s) arquivo(s) de comandos ```App-Actions``` de cada uma dos domínios a serem testados.

### O projeto. 

Neste projeto executamos alguns testes de GUI no site DevFinances

### Execução

* Para execução com geração de relatório use apenas o comando ```npm run cy:run```. o Relatório será disponibilizado em ```cypress\reports\html```.

* Para acompanhar os testes via interface use ```npm run cy:open```.

describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://tiendaonline.movistar.com.ar/')
    cy.title().should('include', 'Celulares');

    cy.contains('Filtrar').click()
    cy.wait(5000)
    cy.contains('Samsung').click();


    cy.contains('Filtrar').click();
    cy.contains('Memoria interna').click();
    cy.contains('128GB').click();

    cy.contains('Filtrar').click();
    cy.contains('Cámara').click();
    cy.contains('50MP + 5MP + 2MP').click();
    cy.wait(1000);
    
    cy.contains('Filtrar').click();
    cy.contains('Tamaño de pantalla').click();
    cy.wait(1000);
    cy.contains('6.6').click();
    cy.wait(1500);

    cy.get('.product-item').first().click();
    cy.contains('Calculá tus cuotas').click();
    cy.contains('Banco Emisor').click();
    cy.contains('Banco BICA').should('be.visible').click({ force: true });;
    cy.contains('Tarjeta').click();
    cy.contains('Visa').click();

    cy.contains('Calcular cuotas').click();

// Verifica la información de las cuotas
    cy.contains('Ahora 3 cuotas sin interés de $ 51.766,00')
        .should('be.visible')
        .parent() // Accede al elemento padre que contiene la información del interés
        .within(() => {
          cy.contains('Precio total financiado $ 155.299,00 - Interes 0%').should('be.visible');
        });
  });
});
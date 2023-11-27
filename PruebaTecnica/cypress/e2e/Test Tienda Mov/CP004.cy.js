describe('CP004 - Compra y Gestión del Carrito', () => {

    // Desactivar detección automática de errores en Cypress
    Cypress.on('uncaught:exception', (err, runnable) => {
        // Evitar que Cypress falle la prueba automáticamente
        return false;
    });

    const visitTiendaOnline = () => {
        cy.log('Ejecutando precondiciones para las pruebas');
        cy.visit('https://tiendaonline.movistar.com.ar');

        // Paso 1: Seleccionar el primer teléfono
        cy.get('ol > [data-id="12814"] > a > .product-item-name > .name').first().click();

        // Esperar a que el botón "Comprar" sea clickeable
        cy.contains('Comprar')
            .wait(2500) // Espera 5 segundos para manejar el caso en que el botón se habilite después de un tiempo
            .click({ force: true });

        // Capturar una screenshot del carrito
        cy.screenshot('carrito');

        // Eliminar el producto del carrito
        cy.get('#removeItem').click();

        // Eliminar el producto del carrito haciendo clic en "Vaciar carrito"
        cy.contains('Vaciar carrito').click();

        // Verificar que el carrito está vacío
        cy.contains('Aún no tienes productos').should('exist');

        // Capturar una screenshot del carrito vacío
        cy.screenshot('carrito_vacio');
    };

    it('Compra y Gestión del Carrito para el primer teléfono', () => {
        // Llamada a la función visitTiendaOnline
        visitTiendaOnline();
    });
});

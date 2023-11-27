describe('Caso de prueba: Filtrar equipos en la tienda de Movistar', () => {
   it('Filtrar por Memoria Interna 128GB y precio entre $200.000 - $300.000', () => {
          cy.visit('https://tiendaonline.movistar.com.ar/')
          //Resultado esperado -que se pueda ingresar a la página indicada.
          cy.title().should('include', 'Celulares');
        
        cy.contains('Filtrar').click();
        //Resultado esperado -que se puedan aplicar los filtros.
        cy.contains('Memoria interna').click();
        cy.contains('128GB').click();
        cy.wait(1000);


        cy.contains('Filtrar').click();
        cy.contains('Precio').click();
        cy.contains('$ 200.000 - $ 300.000').click();
        cy.wait(1000);

        // Resultado esperado -El obtener equipos luego del filtrado y validar la cantidad que se obtiene. 
        cy.get('[data-id="14956"] > a > .product-item-name > .brand, [data-id="12904"] > a > .product-item-name > .name, [data-id="14956"] > a > .product-image > img')
            .should('exist')
            .then(($elements) => {
                const cantidadCelulares = $elements.length;

                // Mostrar la cantidad de celulares encontrados en la consola
                cy.log(`Se encontraron ${cantidadCelulares} celulares.`);

                // Tomar una captura de pantalla dentro del resultado
                cy.screenshot('resultado_filtrado');
            });
    });
});

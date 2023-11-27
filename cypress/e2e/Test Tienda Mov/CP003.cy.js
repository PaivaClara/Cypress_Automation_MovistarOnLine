// Page Object Model
class TiendaOnlinePage {
    visitTiendaOnline() {
        cy.log('Ejecutando precondiciones para las pruebas');
        cy.visit('https://tiendaonline.movistar.com.ar');
    }

    selectThirdProduct() {
        cy.get('.product-item-name')
            .should('have.length.gte', 3)
            .eq(2)
            .click();
    }

    clickCalcularCuotas() {
        cy.contains('Calculá tus cuotas').click();
    }

    selectBancoEmisorAndTarjeta() {
        this.seleccionarOpcion('Banco Emisor', 'Credicoop');
        this.seleccionarOpcion('Tarjeta', 'Visa');
    }

    calcularCuotas() {
        cy.contains('Calcular cuotas').click();
    }

    verificarOpcionesDePago() {
        // Verificar que 'Banco.Credicoop' y 'Tarjeta.Visa' existan y no haya '60 cuotas'
        cy.contains('Credicoop').should('exist');
        cy.contains('Visa').should('exist');
        cy.contains('60 cuotas').should('not.exist');
    }

    capturarScreenshot(resultado) {
        cy.screenshot(resultado);
    }

    // Función para seleccionar una opción en un menú desplegable
    seleccionarOpcion(etiqueta, opcion) {
        cy.contains(etiqueta).click();
        cy.contains(opcion).click({ force: true });
    }
}

// archivo de pruebas Cypress
describe('CP003 - Validar cuotas en compra de equipo', () => {
    const tiendaOnlinePage = new TiendaOnlinePage();

    beforeEach(() => {
        tiendaOnlinePage.visitTiendaOnline();
    });

    it('verifica las opciones de pago para el tercer equipo con Cuotas.60 - Banco.Credicoop - Tarjeta.Visa', () => {
        // Verificar que estamos en la página correcta
        cy.url().should('eq', 'https://tiendaonline.movistar.com.ar/');

        // Seleccionar el tercer producto
        tiendaOnlinePage.selectThirdProduct();

        // Hacer clic en 'Calcular tus cuotas'
        tiendaOnlinePage.clickCalcularCuotas();

        // Calcular cuotas
        tiendaOnlinePage.selectBancoEmisorAndTarjeta();
        tiendaOnlinePage.calcularCuotas();

        // Verificar opciones de pago y capturar screenshot
        tiendaOnlinePage.verificarOpcionesDePago();
        tiendaOnlinePage.capturarScreenshot('resultado_cuotas');
    });
});

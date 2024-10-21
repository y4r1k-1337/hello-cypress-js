describe('Проверка покупки аватара', function() {
	it('покупка аватара', function() {
		cy.visit('https://pokemonbattle.ru');
		cy.get('input[type="email"]').type("USER_LOGIN");
		cy.get('input[type="password"]').type("USER_PASSWORD");
		cy.get('.auth__button').click();
		cy.wait(5000);
		cy.visit('https://pokemonbattle.ru/shop');
		cy.get('.available > button').first().click({force: true});
		cy.wait(1000);
		cy.get('input[placeholder="0000 0000 0000 0000"]').type('4111111111111111');
		cy.get('input[placeholder="000"]').type('125');
		cy.get(':nth-child(1) > .pay_base-input-v2').type('1225');
		cy.get('.pay__input-box-last-of > .pay_base-input-v2').type('NAME');
		cy.get('.pay-btn').click();
		cy.get('#cardnumber').type('56456');
		cy.get('.payment__submit-button').click();
		cy.contains('Покупка прошла успешно').should('be.visible');
	});
});
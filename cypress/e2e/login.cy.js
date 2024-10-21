describe('Проверка авторизации', function() {
	it('Верные логин и пароль', function() {
		cy.visit('https://login.qa.studio/');
		cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)');
		cy.get('#mail').type('german@dolnikov.ru');
		cy.get('#pass').type('iLoveqastudio1');
		cy.get('#loginButton').click();
		cy.get('#messageHeader').contains('Авторизация прошла успешно');
		cy.get('#exitMessageButton > .exitIcon').should('be.visible');
	});
	
	it("Восстановить пароль", function() {
		cy.visit('https://login.qa.studio/');
		cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)');
		cy.get('#forgotEmailButton').click();
		cy.get('#mailForgot').type('german@dolnikov.ru');
		cy.get('#restoreEmailButton').click();
		cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail');
		cy.get('#messageHeader').should('be.visible');
		cy.get('#exitMessageButton > .exitIcon').should('be.visible');
	});

	it('Верный логин, неверный пароль', function() {
		cy.visit('https://login.qa.studio/');
		cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)');
		cy.get('#mail').type('german@dolnikov.ru');
		cy.get('#pass').type('asdasd1337');
		cy.get('#loginButton').click();
		cy.get('#messageHeader').contains('Такого логина или пароля нет');
		cy.get('#exitMessageButton > .exitIcon').should('be.visible');
	});

	it('Неверный логин, верный пароль', function() {
		cy.visit('https://login.qa.studio/');
		cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)');
		cy.get('#mail').type('german@dolnikov.com');
		cy.get('#pass').type('iLoveqastudio1');
		cy.get('#loginButton').click();
		cy.get('#messageHeader').contains('Такого логина или пароля нет');
		cy.get('#exitMessageButton > .exitIcon').should('be.visible');
	});

	it('Логин без @', function() {
		cy.visit('https://login.qa.studio/');
		cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)');
		cy.get('#mail').type('germandolnikov.ru');
		cy.get('#pass').type('iLoveqastudio1');
		cy.get('#loginButton').click();
		cy.get('#messageHeader').contains('Нужно исправить проблему валидации');
		cy.get('#exitMessageButton > .exitIcon').should('be.visible');
	});

	it('Проверка на приведение к строчным буквам в логине', function() {
		cy.visit('https://login.qa.studio/');
		cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)');
		cy.get('#mail').type('GerMan@Dolnikov.ru');
		cy.get('#pass').type('iLoveqastudio1');
		cy.get('#loginButton').click();
		cy.get('#messageHeader').contains('Такого логина или пароля нет');
		cy.get('#exitMessageButton > .exitIcon').should('be.visible');
	});
})
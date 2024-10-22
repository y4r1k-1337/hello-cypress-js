import * as data from "../helpers/data.json"



describe('Проверка авторизации', function() {
	beforeEach('Начало теста', function() {
		cy.visit('https://login.qa.studio/');
		cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)');	
	});

	afterEach('Конец теста', function() {
		cy.get('#exitMessageButton > .exitIcon').should('be.visible');
	})

	it('Верные логин и пароль', function() {
		cy.get('#mail').type(data.login);
		cy.get('#pass').type(data.password);
		cy.get('#loginButton').click();
		cy.get('#messageHeader').contains('Авторизация прошла успешно');
	});
	
	it("Восстановить пароль", function() {
		cy.get('#forgotEmailButton').click();
		cy.get('#mailForgot').type(data.login);
		cy.get('#restoreEmailButton').click();
		cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail');
		cy.get('#messageHeader').should('be.visible');
	});

	it('Верный логин, неверный пароль', function() {
		cy.get('#mail').type(data.login);
		cy.get('#pass').type('asdasd1337');
		cy.get('#loginButton').click();
		cy.get('#messageHeader').contains('Такого логина или пароля нет');
	});

	it('Неверный логин, верный пароль', function() {
		cy.get('#mail').type('german@dolnikov.com');
		cy.get('#pass').type(data.password);
		cy.get('#loginButton').click();
		cy.get('#messageHeader').contains('Такого логина или пароля нет');
	});

	it('Логин без @', function() {
		cy.get('#mail').type('germandolnikov.ru');
		cy.get('#pass').type(data.password);
		cy.get('#loginButton').click();
		cy.get('#messageHeader').contains('Нужно исправить проблему валидации');
	});

	it('Проверка на приведение к строчным буквам в логине', function() {
		cy.get('#mail').type('GerMan@Dolnikov.ru');
		cy.get('#pass').type(data.password);
		cy.get('#loginButton').click();
		cy.get('#messageHeader').contains('Такого логина или пароля нет');
	});
})
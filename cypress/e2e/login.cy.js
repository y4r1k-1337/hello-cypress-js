import * as data from "../helpers/data.json"
import * as main from "../helpers/main_page.json"
import * as rest from "../helpers/pass_restore.json"
import * as msg from "../helpers/message_page.json"


describe('Проверка авторизации', function() {
	beforeEach('Начало теста', function() {
		cy.visit('https://login.qa.studio/');
		cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)');	
	});

	afterEach('Конец теста', function() {
		cy.get('#exitMessageButton > .exitIcon').should('be.visible');
	})

	it('Верные логин и пароль', function() {
		cy.get(main.mail).type(data.login);
		cy.get(main.password).type(data.password);
		cy.get(main.login_button).click();
		cy.get(msg.content).contains('Авторизация прошла успешно');
	});
	
	it("Восстановить пароль", function() {
		cy.get(main.forgot_pass).click();
		cy.get(rest.mail_forgot).type(data.login);
		cy.get(rest.button).click();
		cy.get(msg.content).contains('Успешно отправили пароль на e-mail');
		cy.get(msg.content).should('be.visible');
	});

	it('Верный логин, неверный пароль', function() {
		cy.get(main.mail).type(data.login);
		cy.get(main.password).type('asdasd1337');
		cy.get(main.login_button).click();
		cy.get(msg.content).contains('Такого логина или пароля нет');
	});

	it('Неверный логин, верный пароль', function() {
		cy.get(main.mail).type('german@dolnikov.com');
		cy.get(main.password).type(data.password);
		cy.get(main.login_button).click();
		cy.get(msg.content).contains('Такого логина или пароля нет');
	});

	it('Логин без @', function() {
		cy.get(main.mail).type('germandolnikov.ru');
		cy.get(main.password).type(data.password);
		cy.get(main.login_button).click();
		cy.get(msg.content).contains('Нужно исправить проблему валидации');
	});

	it('Проверка на приведение к строчным буквам в логине', function() {
		cy.get(main.mail).type('GerMan@Dolnikov.ru');
		cy.get(main.password).type(data.password);
		cy.get(main.login_button).click();
		cy.get(msg.content).contains('Авторизация прошла успешно');
	});
})
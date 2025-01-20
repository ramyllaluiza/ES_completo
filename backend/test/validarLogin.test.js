import { expect } from 'chai';
import sinon from 'sinon';
import { validarLogin } from '../middleware/validarLogin.middleware.js';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import loginSchema from '../schema/login.schema.js';

const ajv = new Ajv();
addFormats(ajv);
const validate = ajv.compile(loginSchema);

describe('validarLogin Middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            body: {}
        };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub().returnsThis()
        };
        next = sinon.spy();
    });

    it('deve passar na validação com dados válidos', () => {
        // Dados válidos de exemplo (ajustados para o schema)
        req.body = {
            email: 'user1@example.com',
            senha: 'password123'
        };

        // Chamando o middleware
        validarLogin(req, res, next);

        // Verifica se a função next() foi chamada
        expect(next.calledOnce).to.be.true;
        expect(res.status.called).to.be.false; // Não deve chamar status para dados válidos
    });

    it('deve retornar erro com dados inválidos', () => {
        // Dados inválidos de exemplo
        req.body = {
            email: 'user1@example.com',
            senha: '' // senha inválida (campo vazio)
        };

        // Chamando o middleware
        validarLogin(req, res, next);

        // Verifica se a resposta de erro foi chamada
        expect(res.status.calledOnceWith(400)).to.be.true;
        expect(res.json.calledOnce).to.be.true;
        expect(next.called).to.be.false; // Não deve chamar next() se houver erro
    });
});

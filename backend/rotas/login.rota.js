import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';  // Importe sua aplicação Express

chai.use(chaiHttp);
const { expect } = chai;

describe('Login API', () => {
    let loginId;

    it('Deve criar um novo login', (done) => {
        const novoLogin = {
            email: 'joaosilva@gmail.com',
            senha: '123456'
        };

        chai.request(app)
            .post('/login')
            .send(novoLogin)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('msg').eql('Login registrado com sucesso!');
                expect(res.body.login).to.have.property('id');
                loginId = res.body.login.id;  // Guarde o ID do login para testes posteriores
                done();
            });
    });

    it('Não deve permitir criar um login com email já registrado', (done) => {
        const novoLogin = {
            email: 'joaosilva@gmail.com',
            senha: '123456'
        };

        chai.request(app)
            .post('/login')
            .send(novoLogin)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('msg').eql('Login já registrado.');
                done();
            });
    });

    it('Deve atualizar um login existente', (done) => {
        const loginAtualizado = {
            email: 'joaosilva2@gmail.com',
            senha: '654321'
        };

        chai.request(app)
            .put(`/login/${loginId}`)
            .send(loginAtualizado)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('msg').eql('Login atualizado com sucesso!');
                done();
            });
    });

    it('Deve excluir um login existente', (done) => {
        chai.request(app)
            .delete(`/login?id=${loginId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('msg').eql('Login deletado com sucesso!');
                done();
            });
    });

    it('Deve retornar todos os logins', (done) => {
        chai.request(app)
            .get('/login')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('logins').that.is.an('array');
                done();
            });
    });
});

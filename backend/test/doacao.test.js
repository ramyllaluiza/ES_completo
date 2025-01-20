import request from 'supertest';
import express from 'express';
import router from '../rotas/doacoes.rota.js';  // Certifique-se de importar com a extensão .js

import { assert } from 'chai';

const app = express();
app.use(express.json());
app.use('/doacoes', router);

describe('API de Doações', function () {
  let doacaoId;

  // Teste para criar uma nova doação (POST /doacoes)
  it('deve criar uma nova doação', function (done) {
    const doacao = {
      nome: 'camisa',
      tamanho: 'P',
      quantidade: 2
    };

    request(app)
      .post('/doacoes')
      .send(doacao)
      .end((err, res) => {
        assert.strictEqual(res.status, 200);
        assert.exists(res.body.id, 'ID da doação deve existir');
        doacaoId = res.body.id; // Armazenar o ID para usar em outros testes
        done();
      });
  });

  // Teste para listar todas as doações (GET /doacoes)
  it('deve listar todas as doações', function (done) {
    request(app)
      .get('/doacoes')
      .end((err, res) => {
        assert.strictEqual(res.status, 200);
        assert.isArray(res.body.doacoes);
        assert.isAbove(res.body.doacoes.length, 0);
        done();
      });
  });

  // Teste para recuperar uma doação específica (GET /doacoes/:id)
  it('deve recuperar uma doação específica', function (done) {
    request(app)
      .get(`/doacoes/${doacaoId}`)
      .end((err, res) => {
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.body.doacao.id, doacaoId);
        assert.strictEqual(res.body.doacao.nome, 'camisa');
        done();
      });
  });

  // Teste para tentar recuperar uma doação com ID inexistente (GET /doacoes/:id)
  it('deve retornar erro 404 se a doação não for encontrada', function (done) {
    request(app)
      .get('/doacoes/invalid-id')
      .end((err, res) => {
        assert.strictEqual(res.status, 404);
        assert.strictEqual(res.body.msg, 'Doação não encontrada!');
        done();
      });
  });

  // Teste para atualizar uma doação existente (PUT /doacoes)
  it('deve atualizar uma doação existente', function (done) {
    const doacaoAtualizada = {
      nome: 'camisa',
      tamanho: 'P',
      quantidade: 2
    };

    request(app)
      .put('/doacoes')
      .query({ id: doacaoId })  // Passando o ID via query string
      .send(doacaoAtualizada)
      .end((err, res) => {
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.body.msg, 'Doação atualizada com sucesso!');
        done();
      });
  });

  // Teste para tentar atualizar uma doação com ID inexistente (PUT /doacoes)
  it('deve retornar erro 404 se a doação não for encontrada para atualização', function (done) {
    const doacaoInvalida = {
      nome: 'camisa',
      tamanho: 'CP',
      quantidade: 200
    };

    request(app)
      .put('/doacoes')
      .query({ id: 'invalid-id' })
      .send(doacaoInvalida)
      .end((err, res) => {
        assert.strictEqual(res.status, 404);
        assert.strictEqual(res.body.msg, 'Doação não encontrada!');
        done();
      });
  });

  // Teste para deletar uma doação existente (DELETE /doacoes/:id)
  it('deve deletar uma doação existente', function (done) {
    request(app)
      .delete(`/doacoes/${doacaoId}`)
      .end((err, res) => {
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.body.msg, 'Doação deletada com sucesso!');
        done();
      });
  });

  // Teste para tentar deletar uma doação com ID inexistente (DELETE /doacoes/:id)
  it('deve retornar erro 400 se a doação não for encontrada para deletar', function (done) {
    request(app)
      .delete('/doacoes/invalid-id')
      .end((err, res) => {
        assert.strictEqual(res.status, 400);
        assert.strictEqual(res.body.msg, 'Doação não encontrada!');
        done();
      });
  });
});

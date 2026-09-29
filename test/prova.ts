import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';
import { SimpleReporter } from '../simple-reporter';

describe('Validação de produtos', () => {
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://dummyjson.com';

  p.request.setDefaultTimeout(30000);

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  describe('Validação do endpoint GET', () => {
    it('Deve retornar um produto', async () => {
      await p
        .spec()
        .get(`${baseUrl}/products/1`)
        .expectStatus(StatusCodes.OK)
        .expectJsonLike({
          id: 1,
          title: 'Essence Mascara Lash Princess'
        });
    });
  });

  describe('Validação do endpoint POST', () => {
    it('Deve criar um novo produto', async () => {
      await p
        .spec()
        .post(`${baseUrl}/products/add`)
        .withJson({
          title: 'Notebook',
          price: 3500
        })
        .expectStatus(StatusCodes.CREATED)
        .expectJsonLike({
          title: 'Notebook',
          price: 3500
        });
    });
  });

  describe('Validação do endpoint PUT', () => {
    it('Deve atualizar um produto', async () => {
      await p
        .spec()
        .put(`${baseUrl}/products/1`)
        .withJson({
          title: 'Notebook Gamer',
          price: 4500
        })
        .expectStatus(StatusCodes.OK)
        .expectJsonLike({
          id: 1,
          title: 'Notebook Gamer',
          price: 4500
        });
    });
  });

  describe('Validação do endpoint DELETE', () => {
    it('Deve excluir um produto', async () => {
      await p
        .spec()
        .delete(`${baseUrl}/products/1`)
        .expectStatus(StatusCodes.OK)
        .expectJsonLike({
          id: 1,
          isDeleted: true
        });
    });
  });

  describe('Validação de outro endpoint POST', () => {
    it('Deve criar outro produto', async () => {
      await p
        .spec()
        .post(`${baseUrl}/products/add`)
        .withJson({
          title: 'Mouse Gamer',
          price: 150
        })
        .expectStatus(StatusCodes.CREATED)
        .expectJsonLike({
          title: 'Mouse Gamer',
          price: 150
        });
    });
  });
});
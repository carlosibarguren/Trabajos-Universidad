
const request = require('supertest');
const app =require('../../index.js') ;

describe('Pruebas de la API', () => {
  test('GET', async () => {
    const response = await request(app).get('/aeropuertos');

    expect(response.statusCode).toBe(200);
  });

  test('GET by ID', async () => {
    const response = await request(app).get('/aeropuertos/2');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      IdAeropuerto: 2,
      Nombre: 'Aeropuerto Internacional Heathrow',
      Ciudad: 'Londres',
      Pais: 'Reino Unido',
      CodigoIATA: 'LHR',
      FechaInauguracion: '1946-05-31'
  });
  });

  test('POST /', async () => {
    const newAeropuerto = {
      Nombre: 'Aeropuerto Josep Tarradellas Barcelona-El Prat', 
      Ciudad: 'Barcelona', 
      Pais: 'España', 
      CodigoIATA: 'BCN', 
      FechaInauguracion: '2020-01-01' 
    };
    const response = await request(app).post('/aeropuertos').send(newAeropuerto)

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      IdAeropuerto: expect.any(Number), 
      Nombre: 'Aeropuerto Josep Tarradellas Barcelona-El Prat', 
      Ciudad: 'Barcelona', 
      Pais: 'España', 
      CodigoIATA: 'BCN', 
      FechaInauguracion: '2020-01-01'
    });
  });

  test('DELETE/aeropuertos/:IdAeropuerto', async () =>{
    const response = await request(app).get('/aeropuertos/')
    const aeropuertos = response.body
    const ultimoAeropuerto = aeropuertos[aeropuertos.length -1]
    const res = await request(app).delete(`/aeropuertos/${ultimoAeropuerto.IdAeropuerto}`)
    
    expect(res.statusCode).toBe(204);
  });

  test('PUT/aeropuertos/:IdAeropuerto', async () =>{
    const response = await await request(app).put('/aeropuertos/13').send({CodigoIATA: 'BKN'});

    expect(response.statusCode).toBe(200);
  });

  test('PUT/aeropuertos/:IdAeropuerto', async () =>{
    const response = await await request(app).put('/aeropuertos/13').send({CodigoIATA: 'VLS'});

    expect(response.statusCode).toBe(200);
  });
});
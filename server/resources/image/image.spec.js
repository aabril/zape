export default (test, server, supertest) => {
  let image1, image2;

  test.serial('images:GET get all with an empty array as a result', async t => {
    t.plan(3);
    const res = await supertest(server).get('/images')
    t.is(res.status, 200);
    t.is(Array.isArray(res.body), true)
    t.is(res.body.length, 0)
  })

  test.serial('images:POST a new "image" object 1', async t => {
    const data = {
      active: false
    }
    const res = await supertest(server).post('/images').send(data)
    t.is(res.status, 201);
    t.is(typeof res.body, 'object')
    image1 = res.body;
  })

  test.serial('images:POST a new "image" object 2', async t => {
    const data = {
      name: 'DUMMY 2',
      info: 'dummy information 2',
      active: false
    }
    const res = await supertest(server).post('/images').send(data)
    t.is(res.status, 201);
    t.is(typeof res.body, 'object')
    image2 = res.body;
  })

  test.serial('images:GET all with the two last "image" added', async t => {
    t.plan(3);
    const res = await supertest(server).get('/images')
    t.is(res.status, 200);
    t.is(Array.isArray(res.body), true)
    t.is(res.body.length, 2)
  })

  test.serial('images:DELETE last item', async t => {
    const res = await supertest(server).del('/images/' + image2._id)
    t.is(res.status, 204)
    t.is(typeof res.body, 'object')
  })

  test.serial('images:GET all with a 200 with and only one image', async t => {
    t.plan(3);
    const res = await supertest(server).get('/images')
    t.is(res.status, 200);
    t.is(Array.isArray(res.body), true)
    t.is(res.body.length, 1)
  })

  test.serial('images:PUT to update a image', async t => {
    const data = {
      active: false
    }
    const res = await supertest(server).put('/images/' + image1._id).send(data)
    t.is(res.status, 200);
  })

}

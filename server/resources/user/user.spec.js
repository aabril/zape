export default (test, server, supertest) => {
  let thing1, thing2;

  test.serial('users:GET get all with an empty array as a result', async t => {
    t.plan(3);
    const res = await supertest(server).get('/users')
    t.is(res.status, 200);
    t.is(Array.isArray(res.body), true)
    t.is(res.body.length, 0)
  })

  test.serial('things:POST a new "user" object 1', async t => {
    const data = {
      name: 'DUMMY',
      info: 'dummy information',
      active: false
    }
    const res = await supertest(server).post('/things').send(data)
    t.is(res.status, 201);
    t.is(typeof res.body, 'object')
    t.is(res.body.name, 'DUMMY')
    t.is(res.body.info, 'dummy information')
    thing1 = res.body;
  })


}

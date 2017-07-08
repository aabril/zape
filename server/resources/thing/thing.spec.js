export default (test, server, supertest) => {
  let thing1, thing2, user1;


  test.serial('things > register a new user', async t => {
    const data = {
      email: "user-things@mail.com",
      password: 'password',
      name: 'new user'
    }
    const res = await supertest(server).post('/auth/register').send(data)
    t.is(res.status, 200);
    t.is(res.body.email, 'user-things@mail.com')
  })

  test.serial('things > login', async t => {
    const data = {
      email: "user@mail.com",
      password: 'password',
    }
    const res = await supertest(server).post('/auth/login').send(data)
    t.is(res.status, 200);
    t.is(typeof res.body, 'object')
    t.is(res.body.hasOwnProperty('token'), true)
    user1 = res.body
  })

  test.serial('things:GET get all with an empty array as a result', async t => {
    t.plan(3);
    const res = await supertest(server).get('/things')
    t.is(res.status, 200);
    t.is(Array.isArray(res.body), true)
    t.is(res.body.length, 0)
  })

  test.serial('things:POST a new "thing" object 1', async t => {
    t.plan(4);

    const postData = {
      name: 'DUMMY 1',
      info: 'dummy information 1', 
      user: user1.user_id
    }

    const res = await supertest(server)
      .post('/things')
      .send(postData)
      .set('Authorization', 'Bearer ' + user1.token)

    t.is(res.status, 201);
    t.is(typeof res.body, 'object')
    t.is(res.body.name, postData.name)
    t.is(res.body.info, postData.info)

    thing1 = res.body;
  })

  test.serial('things:POST a new "thing" object 2', async t => {
    t.plan(4);

    const postData = {
      name: 'DUMMY 2',
      info: 'dummy information 2',
      user: user1.user_id
    }

    const res = await supertest(server)
      .post('/things')
      .send(postData)
      .set('Authorization', 'Bearer ' + user1.token)

    t.is(res.status, 201);
    t.is(typeof res.body, 'object')
    t.is(res.body.name, postData.name)
    t.is(res.body.info, postData.info)
    
    thing2 = res.body;
  })

  test.serial('things:GET all with the two last "thing" added', async t => {
    t.plan(3);
    const res = await supertest(server).get('/things')
    t.is(res.status, 200);
    t.is(Array.isArray(res.body), true)
    t.is(res.body.length, 2)
  })

  test.serial('things:DELETE last item', async t => {
    t.plan(2)

    const res = await supertest(server)
      .del('/things/' + thing2._id)
      .set('Authorization', 'Bearer ' + user1.token)

    t.is(res.status, 204)
    t.is(typeof res.body, 'object')
  })

  test.serial('things:GET all with a 200 with and only one thing', async t => {
    t.plan(3);
    const res = await supertest(server).get('/things')
    t.is(res.status, 200);
    t.is(Array.isArray(res.body), true)
    t.is(res.body.length, 1)
  })

  test.serial('things:PUT to update a thing', async t => {
    const putData = {
      name: 'DUMMY 1 MODIFIED',
      info: 'dummy information 1 MODIFIED',
      active: false
    }

    const res = await supertest(server)
      .put('/things/' + thing1._id)
      .send(putData)
      .set('Authorization', 'Bearer ' + user1.token)

    t.is(res.status, 200);
    t.is(res.body.name, 'DUMMY 1 MODIFIED')
    t.is(res.body.info, 'dummy information 1 MODIFIED')
  })

}

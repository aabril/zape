export default (test, server, supertest) => {
  test.serial('auth:POST register a new user', async t => {
    const data = {
      email: "user@mail.com",
      password: 'password',
      name: 'new user'
    }
    const res = await supertest(server).post('/auth/register').send(data)
    t.is(res.status, 200);
    t.is(res.body.email, 'user@mail.com')
  })

  test.serial('auth:POST check user has been registerd', async t => {
    const res = await supertest(server).get('/users')
    t.is(res.status, 200);
    t.is(res.body[0].email, 'user@mail.com')
  })

  test.serial('auth:POST login', async t => {
    const data = {
      email: "user@mail.com",
      password: 'password',
    }
    const res = await supertest(server).post('/auth/login').send(data)
    t.is(res.status, 200);
    t.is(typeof res.body, 'object')
    t.is(res.body.hasOwnProperty('token'), true)
  })

  test.serial('auth:POST register same user should display a error', async t => {
    const data = {
      email: "user@mail.com",
      password: 'password',
      name: 'new user'
    }
    const res = await supertest(server).post('/auth/register').send(data)
    t.is(res.status, 200);
    t.is(res.body.msg, 'user already registered')
  })

}

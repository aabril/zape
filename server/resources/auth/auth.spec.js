export default (test, server, supertest) => {
  test.only('auth:POST register a new user', async t => {
    const data = {
      email: "user@mail.com",
      password: 'password',
      name: 'new user'
    }
    const res = await supertest(server).post('/auth/register').send(data)
    console.log(res.body)
    t.is(res.status, 200);
  })
}

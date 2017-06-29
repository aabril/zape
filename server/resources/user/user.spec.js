export default (test, server, supertest) => {
  let thing1, thing2;

  test.serial('users:GET get all with an empty array as a result', async t => {
    t.plan(3);
    const res = await supertest(server).get('/users')
    t.is(res.status, 200);
    t.is(Array.isArray(res.body), true)
    t.is(res.body.length, 1) // an user has been already registered in auth test
  })

}

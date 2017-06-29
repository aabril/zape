import config from '../config.json'

process.env.NODE_ENV = 'test'
process.env.PORT = process.env.TEST_PORT || config.TEST_PORT
process.env.MONGO_URI = process.env.TEST_MONGO_URI || config.TEST_MONGO_URI

import mongoose from 'mongoose'
const server = require('../server/server').default
import supertest from 'supertest'
const test = require('ava')

import thingsSpec from '../server/resources/thing/thing.spec'
import authSpec from '../server/resources/auth/auth.spec'
import usersSpec from '../server/resources/user/user.spec'

mongoose.Promise = Promise;

test.before(async t => {
  await mongoose.connection.dropDatabase(error => { if(error) console.log(error);});
})

test('root:get', async t => {
  t.plan(1);
  const res = await supertest(server).get('/')
  t.is(res.status, 200);
});

authSpec(test, server, supertest)
usersSpec(test, server, supertest)
thingsSpec(test, server, supertest)

test.after.always('guaranteed cleanup', async t => {
  mongoose.disconnect()
});

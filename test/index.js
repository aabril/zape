import config from '../config.json'

process.env.NODE_ENV = 'test'
process.env.PORT = process.env.TEST_PORT || config.TEST_PORT
process.env.MONGO_URI = process.env.TEST_MONGO_URI || config.TEST_MONGO_URI
process.env.MONGO_URI = process.env.MONGO_URI + '-' + process.pid

import mongoose from 'mongoose'
import supertest from 'supertest'
import {test} from 'ava'
const server = require('../server/server').default

import authSpec from '../server/resources/auth/auth.spec'
import usersSpec from '../server/resources/user/user.spec'
import imagesSpec from '../server/resources/image/image.spec'
import thingsSpec from '../server/resources/thing/thing.spec'

mongoose.Promise = Promise;

test.serial('root:get', async t => {
  t.plan(1);
  const res = await supertest(server).get('/')
  t.is(res.status, 200);
});

authSpec(test, server, supertest)
usersSpec(test, server, supertest)
imagesSpec(test, server, supertest)
thingsSpec(test, server, supertest)

test.after.always('guaranteed cleanup', async t => {
  await mongoose.connection.dropDatabase(error => { if(error) console.log(error);});
});

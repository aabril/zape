process.env.PORT = require('../../config').test.PORT
process.env.MONGO_URI = require('../../config').test.MONGO_URI

const mongoose = require('mongoose')
const server = require('../../server/server').default
const supertest = require('supertest')
const test = require('ava')
const objectTypes = require('object-types')

mongoose.Promise = Promise;


test.before(async t => {
	await mongoose.connection.dropDatabase(error => { if(error) console.log(error);});
})

test.serial('thing:post', async t => {
	t.plan(4);
	const res = await supertest(server)
		.post('/api/things')
		.send({name: 'John', info: 'lorem ipsum' })
	t.is(res.status, 201);
	t.is(objectTypes(res.body), 'object')
	t.is(res.body.info, 'lorem ipsum')
	t.is(res.body.name, 'John')
})

test('thing:get', async t => {
	t.plan(4);
	const res = await supertest(server).get('/api/things')
	t.is(res.status, 200);
	t.is(objectTypes(res.body), 'array')
	t.is(res.body[0].info, 'lorem ipsum')
	t.is(res.body[0].name, 'John')
});

test.after.always('guaranteed cleanup', async t => {
	mongoose.disconnect()
});



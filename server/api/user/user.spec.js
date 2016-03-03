import frisby from 'icedfrisby'
import Joi from 'joi'
import config from '../../config/environments/dev.json'

const URL = 'http://' + config.hostname + ':' + config.port;
// const URL_AUTH = 'http://username:password@localhost:8080';
 
describe('User tests', () => {
  before( () => {
    // Place here your hooks before any tests
    // frisby.globalSetup({  
    //   request: {
    //     headers: { 'X-Auth-Token': 'fa8426a0-8eaf-4d22-8e13-7c1b16a9370c' }
    //   }
    // });
  })

  frisby
    .create('GET list of users and expect an array with ')
    .get(URL + '/api/users')
    .expectStatus(200)
    .expectJSONTypes('*', Joi.object().keys({
      _id: Joi.string().required(),
      createdAt: Joi.string().required(),
      updatedAt: Joi.string().required(),
      name: Joi.string(),
      info: Joi.string(),
      active: Joi.boolean()
    }))
    .afterJSON((jsonResponse) => {
      expect(1+1).to.equal(2);
    })
    .toss()

  after( () => {
    // Place here your hooks after all tests
  })  

})
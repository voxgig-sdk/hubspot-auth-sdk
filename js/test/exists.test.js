
const { test, describe } = require('node:test')
const { equal } = require('node:assert')


const { HubspotAuthSDK } = require('..')


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await HubspotAuthSDK.test()
    equal(null !== testsdk, true)
  })

})

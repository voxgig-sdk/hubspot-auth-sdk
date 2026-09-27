
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { HubspotAuthSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = HubspotAuthSDK.test()
    equal(testsdk instanceof HubspotAuthSDK, true,
      'HubspotAuthSDK.test() must return a client synchronously')
  })

})

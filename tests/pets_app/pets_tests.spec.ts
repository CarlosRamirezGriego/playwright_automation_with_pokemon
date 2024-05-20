import { test, expect } from '@playwright/test';
import {APIResponse } from '@playwright/test'
import {PetAPI} from '../../api_clients/petStore_app/PetAPI'


test(`Add Pet`, async({page}) => {
    PetAPI.initialize(page)
    let payload = '{"id":10,"name":"doggie","category":{"id":1,"name":"Dogs"},"photoUrls":["string"],"tags":[{"id":0,"name":"string"}],"status":"available"}'
    let response: APIResponse = await PetAPI.add_pet_information(payload);
    expect(response.status()).toEqual(200)
  })



test.describe('Update Pets DataDriven Tests', () => {
  const testData = [
    {
      "status":"available",
      "name": "Available Status"
    }, 
    {
        "status":"pending",
        "name": "Pending Status"
    }, 
    {
        "status":"sold",
        "name": "Sold Status"
    }
  ]


  testData.forEach(({status, name}) => {
    test(`Update Pet - ${name}`, async({page}) => {
        PetAPI.initialize(page)
        let payload = `{"id":10,"name":"doggie","category":{"id":1,"name":"Dogs"},"photoUrls":["string"],"tags":[{"id":0,"name":"string"}],"status":"${status}"}`
        let response: APIResponse = await PetAPI.add_pet_information(payload);
        expect(response.status()).toEqual(200)

        //Read the Response into a JSON
        let data = JSON.parse(await response.text())
        expect(data.status).toEqual(status)
      })
  })

});
  


test.describe('Get Pets DataDriven Tests', () => {

    test.beforeEach(async({page}) => {
        PetAPI.initialize(page)
    })

    const testData = [
        {
        "id":"10",
        "result": 200,
        "name": "Valid User"
        }, 
        {
        "id":"15615612",
        "result": 404,
        "name": "Non Existing User"
        },
        {
        "id":"abc",
        "result": 400,
        "name": "invalid User"
        }
    ]

    testData.forEach(({id, result, name}) => {
        test(`Get Pet: '${name}`, async({page}) => {
        let response: APIResponse = await PetAPI.get_pet_information(id);
        expect(response.status()).toEqual(result)
        })
    })

});


test(`Delete Pet`, async({page}) => {
    PetAPI.initialize(page)

    //We add a pet with ID 117117, then Delete It
    let payload = '{"id":117117,"name":"doggie","category":{"id":1,"name":"Dogs"},"photoUrls":["string"],"tags":[{"id":0,"name":"string"}],"status":"available"}'
    await PetAPI.add_pet_information(payload);

    let response: APIResponse = await PetAPI.delete_pet_information("117117", "key");
    expect(response.status()).toEqual(200)
})
  
  
  
  
  
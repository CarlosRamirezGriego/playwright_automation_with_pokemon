import {Page, APIResponse } from '@playwright/test'

export class PetAPI {
    static page: Page;
    static format: string = "json";

    static initialize(page: Page)
    {
        this.page = page;
    }


    static setFormat(format: string)
    {
        this.format = format
    }

    static async get_pet_information(petId: string): Promise<APIResponse> {
        const context = this.page.context();
        const response = await this.page.request.get(`https://petstore3.swagger.io/api/v3/pet/${petId}`, {
            headers: {
                'accept': 'application/'+ this.format,
            }
        });
        return response;
    }


    static async delete_pet_information(petId: string, apiKey: string): Promise<APIResponse> {
        const context = this.page.content();
        const response = await this.page.request.delete(`https://petstore3.swagger.io/api/v3/pet/${petId}`, {
            headers: {
                'accept': '*/*',
                'api_key': apiKey,
            }
        });
        return response;
    }


    static async update_pet_information(payload: string): Promise<APIResponse> {
        const context = this.page.content();
        const response = await this.page.request.put(`https://petstore3.swagger.io/api/v3/pet`, {
            headers: {
                'accept': 'application/'+ this.format,
                'Content-Type': 'application/'+ this.format
            },
            data: payload
        });
        return response;
    }

    

    static async add_pet_information(payload: string): Promise<APIResponse> {
        const context = this.page.content();
        const response = await this.page.request.post(`https://petstore3.swagger.io/api/v3/pet`, {
            headers: {
                'accept': 'application/'+ this.format,
                'Content-Type': 'application/'+ this.format
            },
            data: payload
        });
        return response;
    }

}
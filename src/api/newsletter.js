import { ENV  } from "../utils";

export class Newsletter {

    baseApi = ENV.BASE_API;

    async index(accessToken, pagination){
        try {
            const pageFilter = `page=${pagination?.page || 1}`;
            const limitFilter = `limit=${pagination?.limit || 10}`;
            const url = `${this.baseApi}/${ENV.API_ROUTES.NEWSLETTERS}?${pageFilter}&${limitFilter}`;

            const params = {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            }

            const response = await fetch(url, params);
            const result = await response.json();
            if(response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }

    async save(email){
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.NEWSLETTER}`;
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email})
            }
            const response = await fetch(url, params);
            const result = await response.json();

            if(response.status !== 200) throw result;
            return result;

        } catch (error) {
            throw error;
        }
    }

    async remove(accessToken, idEmail){
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.NEWSLETTER}/${idEmail}`;
            const params = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                },
            }

            const response = await fetch(url, params);
            const result = await response.json();
            if(response.status !== 200) throw result;
            return result;

        } catch (error) {
            throw error;
        }
    }
}
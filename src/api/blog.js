import { ENV } from "../utils";

export class Post {
    baseApi = ENV.BASE_API;

    async save(accessToken, data ){
        try {
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            })

            if(data.file){
                formData.append("miniature", data.file)
            }

            const url = `${this.baseApi}/${ENV.API_ROUTES.POST}`;
            const params = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                body: formData
            }
            const response = await fetch(url, params);
            const result = await response.json();

            if(response.status !== 200) throw result;
            return result;

        } catch (error) {
            throw error;
        }

    }

    async update(accessToken, idPost, data ){
        try {
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            })

            if(data.file){
                formData.append("miniature", data.file)
            }

            const url = `${this.baseApi}/${ENV.API_ROUTES.POST}/${idPost}`;
            const params = {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                body: formData
            }
            const response = await fetch(url, params);
            const result = await response.json();

            if(response.status !== 200) throw result;
            return result;

        } catch (error) {
            throw error;
        }
    }

    async index(params){
        try {
            const pageFilter = `page=${params?.page || 1}`;
            const limitFilter = `limit=${params?.limit || 10}`;
            const url = `${this.baseApi}/${ENV.API_ROUTES.POSTS}?${pageFilter}&${limitFilter}`;

            const response = await fetch(url);
            const result = await response.json();
            if(response.status !== 200) throw result;
            return result;
        } catch (error) {
            throw error;
        }
    }

    async remove(accessToken, idPost){
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.POST}/${idPost}`;
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

    async show(path){
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.POST}/${path}`;
            const response = await fetch(url);
            const result = await response.json();

            if(response.status !== 200) throw  result;
            return result;
        } catch (error) {
            throw error;
        }
    }
}
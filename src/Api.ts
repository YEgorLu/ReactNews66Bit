import axios, {AxiosInstance} from "axios";


export class Api {
    private static _client: AxiosInstance;

    public static setClient(baseUrl: string) {
        this._client = axios.create({baseURL: baseUrl});
    }

    public static async getNews(page: number, count: number): Promise<News[]> {
        if (!this._client)
            throw Error('Client not created')
        return (await this._client.get<any, { data: News[] }>(`news/get?page=${page}&count=${count}`)).data;
    }

    public static async getTheme(name: ThemeName): Promise<Theme> {
        if (!this._client)
            throw Error('Client not created')
        return (await this._client.get<any, { data: Theme }>('theme/get?name=' + name)).data;
    }
}

export type ThemeName = 'dark' | 'light' | 'blue';

export type Theme = {
    id: number,
    name: ThemeName,
    mainColor: string,
    secondColor: string,
    title: string,
    textColor: string
}

export type News = {
    "title": string,
    "content": string,
    "id": number,
    "createdAt": Date,
    "updatedAt": Date
}
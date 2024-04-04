import {
    COLLECTIONS,
    CONTENT_TYPE,
    LUXAND_TOKEN,
    LUXAND_URL,
    NAME,
    PHOTO,
    PHOTOS,
    STORE,
    TOKEN,
} from '../constants/luxand_constants';
import axios from 'axios';

export default class LUXAND_FACE {
    constructor() {
        this.url = LUXAND_URL;
        this.headers = {
            [TOKEN]: LUXAND_TOKEN,
            [CONTENT_TYPE]: 'multipart/form-data;',
        };
        this.form;
        this.options = {
            method: '',
            url: this.url,
            headers: this.headers,
            data: this.form,
        };
    }

    async EnrollPerson(name, photo, store = '0', collections = '') {
        const form = new FormData();
        form.append(PHOTOS, photo);
        form.append(NAME, name);
        form.append(STORE, store);
        form.append(COLLECTIONS, collections);
        const options = {
            method: 'POST',
            url: this.url,
            headers: this.headers,
            data: form,
        };
        return await this.AXIOS_PROMISE(options);
    }

    async GetListPersons() {
        const form = new FormData();
        const options = {
            method: 'GET',
            url: this.url,
            headers: this.headers,
            data: form,
        };
        return await this.AXIOS_PROMISE(options);
    }

    async RecognizePeople(photo, collections = '') {
        this.form = new FormData();
        this.form.append(PHOTO, photo);
        this.form.append(COLLECTIONS, collections);
        this.options.method = 'POST';
        this.options.data = this.form;
        return await this.AXIOS_PROMISE(this.options);
    }

    async AXIOS_PROMISE(options) {
        return await axios(options)
            .then((response) => {
                console.log(response.data);
                return response.data;
            })
            .catch((error) => {
                console.error(error);
            });
    }
}

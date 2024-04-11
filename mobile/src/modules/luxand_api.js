import {
    COLLECTIONS,
    CONTENT_TYPE,
    LUXAND_ENROLL_FACE,
    LUXAND_ENROLL_PERSON,
    LUXAND_TOKEN,
    LUXAND_URL,
    NAME,
    PHOTO,
    PHOTOS,
    STORE,
    TOKEN,
} from '../constants/luxand_constants';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';

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

    async EnrollPerson(name, photos, store = '0', collections = '') {
        const form = new FormData();
        // const photoContent = await FileSystem.readAsStringAsync(photo, {
        //     encoding: FileSystem.EncodingType.Base64,
        // });
        const photos_obj = photos.map((photo, index) => ({
            uri: photo,
            name: `${index}.jpg`,
            type: `image/jpeg`,
        }));
        form.append(PHOTOS, photos_obj.shift());
        form.append(NAME, name);
        form.append(STORE, store);
        form.append(COLLECTIONS, collections);
        const options = {
            method: 'POST',
            url: LUXAND_ENROLL_PERSON,
            headers: this.headers,
            data: form,
        };
        const response = await this.AXIOS_PROMISE(options);
        if (response.status === 'success') {
            for (const photo of photos_obj) {
                this.AddFaceToPerson(response.uuid, photo);
            }
        }
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
        this.form.append(PHOTO, {
            uri: photo,
            name: this.getNamePhoto(photo),
            type: `image/jpeg`,
        });
        this.form.append(COLLECTIONS, collections);
        const options = {
            method: 'POST',
            url: LUXAND_URL,
            headers: this.headers,
            data: this.form,
        };
        return await this.AXIOS_PROMISE(options);
    }

    async AddFaceToPerson(uuid, photo, store = '0') {
        const url = LUXAND_ENROLL_FACE + '/' + uuid + '';
        this.form = new FormData();
        this.form.append(PHOTOS, {
            uri: photo,
            name: this.getNamePhoto(photo),
            type: `image/jpeg`,
        });
        this.form.append(STORE, store);
        const options = {
            method: 'POST',
            url: url,
            headers: this.headers,
            data: this.form,
            params: {
                uuid: uuid,
            },
        };
        return await this.AXIOS_PROMISE(options);
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

    getNamePhoto(uri) {
        return uri.substring(uri.lastIndexOf('/') + 1);
    }
}

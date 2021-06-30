import axios from 'axios';
import { BASE_URL } from 'utils/requests';

export class TodoService {

    getTodo(path) {
        return axios.get(`${BASE_URL}/${path}`)
            .then(response => response.data);
    }

    addItem(url) {
        return axios.post(`${BASE_URL}/add-item`,
            {
                todoUrl: url
            })
            .then(response => response.data);
    }

    checkItem(url, id) {
        return axios.post(`${BASE_URL}/check-item`,
            {
                todoUrl: url,
                itemId: id
            })
            .then(response => response.data);
    }

    deleteItem(url, id) {
        return axios.delete(`${BASE_URL}/delete-item`,
            {
                data: {
                    todoUrl: url,
                    itemId: id
                }
            })
            .then(response => response.data);
    }

    addSubItem(url, id) {
        return axios.post(`${BASE_URL}/add-sub-item`,
            {
                todoUrl: url,
                itemId: id
            })
            .then(response => response.data);
    }

    updateItem(url, id, description, moveUpCheck, selectedItem) {
        return axios.put(`${BASE_URL}/update-item`,
            {
                todoUrl: url,
                itemId: id,
                itemDescription: description,
                moveUp: moveUpCheck,
                selectedItem: selectedItem
            })
            .then(response => response.data);
    }

    deleteTodo(url) {
        return axios.delete(`${BASE_URL}/delete-todo`,
            {
                data: {
                    todoUrl: url
                }
            })
            .then(document.location.href = "/");
    }

    shareTodo(url, emails) {
        return axios.post(`${BASE_URL}/share`,
            {
                todoUrl: url,
                emails: emails
            })
            .then(response => response.data);
    }

}
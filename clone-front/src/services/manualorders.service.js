import config from '../config';
import { authHeader } from '../helpers';
import querystring from 'querystring';

export const manualordersService = {
    create,
    get,
    getSymbols
};

function create(manualorders) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify( manualorders )
    };

    return fetch(`${config.apiUrl}/api/manualorders`, requestOptions)
        .then(handleResponse)
        .then(manualorders => {
            return manualorders;
        });
}

function get(exchange_account = null) {
    const requestOptions = {
        method: 'GET',
    };
    const params = {exchange_account };
    return fetch(`${config.apiUrl}/api/manualorders?${querystring.stringify(params)}`, requestOptions).then(handleResponse);
}
function getSymbols(exchange) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    const params = {exchange };
    return fetch(`${config.apiUrl}/api/exchangesymbols?${querystring.stringify(params)}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                //window.location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}
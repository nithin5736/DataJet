import axios from 'axios';

import { Query } from '../../interfaces';

export async function restapiRun(query: Query) {
  const baseUrl = `${query.options.baseUrl}${query.options.path}`;
  const type = query.options.type;
  const body = query.options.body;
  const headers = query.options.headers;
  const params = query.options.params;
  let data = {};

  //Function for GET request
  async function getProducts() {
    console.log(type + baseUrl);
    let headerObj = {};
    if (headers !== '' && headers !== undefined) {
      headerObj = JSON.parse(headers);
      console.log(headerObj);
    }
    let paramsObj = {};
    if (params !== '' && params !== undefined) {
      paramsObj = JSON.parse(params);
      console.log(paramsObj);
    }
    if (baseUrl !== undefined) {
      console.log(headerObj);
      console.log(paramsObj);
      const resData = await axios.get(baseUrl, { headers: headerObj, params: paramsObj });
      return resData;
    } else {
      const res = '';
      return res;
    }
  }

  // Function for POST request
  async function postProducts() {
    console.log(type + baseUrl);
    let headerObj = {};
    if (headers !== '' && headers !== undefined) {
      headerObj = JSON.parse(headers);
      console.log(headerObj);
    }
    let paramsObj = {};
    if (params !== '' && params !== undefined) {
      paramsObj = JSON.parse(params);
      console.log(paramsObj);
    }
    let bodyObj = {};
    if (body !== '' && body !== undefined) {
      bodyObj = JSON.parse(body);
      console.log(bodyObj);
    }
    if (baseUrl !== undefined && body !== undefined) {
      const resData = await axios.post(baseUrl, bodyObj, { headers: headerObj, params: paramsObj });
      console.log(resData);
      return resData;
    } else {
      const res = '';
      return res;
    }
  }

  //Function for PUT request
  async function putProducts() {
    console.log(type + baseUrl);
    let headerObj = {};
    if (headers !== '' && headers !== undefined) {
      headerObj = JSON.parse(headers);
      console.log(headerObj);
    }
    let paramsObj = {};
    if (params !== '' && params !== undefined) {
      paramsObj = JSON.parse(params);
      console.log(paramsObj);
    }
    let bodyObj = {};
    if (body !== '' && body !== undefined) {
      bodyObj = JSON.parse(body);
      console.log(bodyObj);
    }
    if (baseUrl !== undefined && body !== undefined) {
      const resData = await axios.post(baseUrl, bodyObj, { headers: headerObj, params: paramsObj });
      console.log(resData);
      return resData;
    } else {
      const res = '';
      return res;
    }
  }

  //Function for PATCH request
  async function patchProducts() {
    console.log(type + baseUrl);
    let headerObj = {};
    if (headers !== '' && headers !== undefined) {
      headerObj = JSON.parse(headers);
      console.log(headerObj);
    }
    let paramsObj = {};
    if (params !== '' && params !== undefined) {
      paramsObj = JSON.parse(params);
      console.log(paramsObj);
    }
    let bodyObj = {};
    if (body !== '' && body !== undefined) {
      bodyObj = JSON.parse(body);
      console.log(bodyObj);
    }
    if (baseUrl !== undefined && body !== undefined) {
      const resData = await axios.post(baseUrl, bodyObj, { headers: headerObj, params: paramsObj });
      console.log(resData);
      return resData;
    } else {
      const res = '';
      return res;
    }
  }

  async function deleteProducts() {
    console.log(type + baseUrl);
    let headerObj = {};
    if (headers !== '' && headers !== undefined) {
      headerObj = JSON.parse(headers);
      console.log(headerObj);
    }
    let paramsObj = {};
    if (params !== '' && params !== undefined) {
      paramsObj = JSON.parse(params);
      console.log(paramsObj);
    }
    let bodyObj = {};
    if (body !== '' && body !== undefined) {
      bodyObj = JSON.parse(body);
      console.log(bodyObj);
    }
    if (baseUrl !== undefined && body !== undefined) {
      const resData = await axios.post(baseUrl, bodyObj, { headers: headerObj, params: paramsObj });
      console.log(resData);
      return resData;
    } else {
      const res = '';
      return res;
    }
  }
  console.log(type);
  switch (type) {
    case 'GET':
      data = await getProducts();
      break;
    case 'POST':
      data = await postProducts();
      break;
    case 'PUT':
      data = await putProducts();
      break;
    case 'PATCH':
      data = await patchProducts();
      break;
    case 'DELETE':
      data = await deleteProducts();
      break;
  }
  return data;
}
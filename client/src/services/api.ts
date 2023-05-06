import axios from 'axios';

export const API_ENDPOINT =  process.env.API_URL || 'http://localhost:7000';
// export const API_ENDPOINT = 'http://genuine-hold-381607.et.r.appspot.com';

export const client = axios.create({
    baseURL: API_ENDPOINT + '/api',
    headers: {
    //   Authorization: `Bearer ${getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
  });

import _axios from 'axios';

export const axios = _axios.create({
    baseURL: "https://vqdwswqxjtbwnvywsaiv.supabase.co/functions/v1/",
    headers: {
        'Content-Type': 'application/json',
    },
});

export const setAxiosToken = (token: string) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
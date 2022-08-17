import axios from './axios'

export const getData = () => axios({url:'/home/getData',method:'get'})

export const getUser = (params) => axios({url:'/user/getUser',method:'get',params})


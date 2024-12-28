import Request from '@/utils/request'

export const register = (params: any = {}) => {
    return Request('/users/register', {
        method: 'POST',
        params
    })
}

export const login = (params: any = {}) => {
    return Request('/users/login', {
        method: 'POST',
        params
    })
}
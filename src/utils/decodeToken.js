import jwt from 'jsonwebtoken';

export const decodeToken = () => {
    const token = localStorage.getItem('jwt')
    const decoded = jwt.verify(token, 'rlog')
    return decoded.id
}
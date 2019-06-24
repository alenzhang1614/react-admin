import ajax from './ajax'
export const resLogin=({username,password})=>ajax('/login',{username,password},"post")
export const resConfirmUser = (userId)=>ajax('/user/confirm',{userId},'post')
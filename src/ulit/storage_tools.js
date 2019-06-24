/*只有setItem在第一次登录会设置登录时会设置，设置一个七天免登录，后面只需要每次获取判断是否超期，一旦超期，就要清空localStorage的内容
* */


const validity=1000*3600*24*7
export const setItem =function(data){
    localStorage.setItem('USER_KEY',JSON.stringify(data))
    localStorage.setItem('CREAT_TIME',Date.now())
}
export const getItem=function () {
    const creatTime=localStorage.getItem('CREAT_TIME')
    if (Date.now()-creatTime>validity){
        console.log('creatTime='+creatTime)
        removeItem()
    }
    return JSON.parse(localStorage.getItem('USER_KEY'))
}
export const removeItem=function () {
    localStorage.removeItem('USER_KEY')
    localStorage.removeItem('CREAT_TIME')
}
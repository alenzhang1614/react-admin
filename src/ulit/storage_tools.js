/*只有setItem在第一次登录会设置登录时会设置，设置一个七天免登录，后面只需要每次获取判断是否超期，一旦超期，就要清空localStorage的内容
* */
let startTime=0
let loginTime=0
const validity=1000*3600*24*7
export function setItem(data){
    startTime=Date.now()
    localStorage.setItem('USER_KEY',JSON.stringify(data))
    localStorage.setItem('CREAT_TIME',startTime)
}
export function getItem() {
    loginTime=Date.now()
    const getStartTime=JSON.parse(localStorage.getItem('CREAT_TIME'))
    if (loginTime-getStartTime>validity){
        removeItem()
    }
    return JSON.parse(localStorage.getItem('USER_KEY'))
}
export function removeItem() {
    localStorage.removeItem('USER_KEY')
    localStorage.removeItem('CREAT_TIME')
}
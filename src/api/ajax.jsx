import axios from "axios";
import {message} from "antd";
export default function ajax(url,data,method){//为了复用代码，别的也要用，路径地址参数可能不一样，通过参数传过来
    return axios[method](url,data)//服务器代理模式，服务器端口5000，自己及端口3000，产生跨域问题，可以采用proxy服务器代理模式。在配置文件中添加proxy：“http://localhost：5000，这里写成“http://localhost：3000，为了避免以后上线时出现端口变化导致的改代码的问题，就要写成”/login
        .then((res)=>{//跳转至指定网址两种方式，1中red为redirect。2编程是导航this.history。repalce
            const {data} = res
            if(data.status===0){
                return data.data
            } else{
                message.error(data.msg,2)
            }
        })
        .catch(res=>{
            message.error("网络崩溃了~~~刷新试试")
        })
    //统一处理错误，登录成功有返回data，登录失败，或者网络崩溃返回值都是undefine
}

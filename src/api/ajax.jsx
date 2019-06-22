import axios from "axios";
import {message} from "antd";
export default function ajax(url,data={},method='get'){//为了复用代码，别的也要用，路径地址参数可能不一样，通过参数传过来
   //服务器代理模式，服务器端口5000，自己及端口3000，产生跨域问题，可以采用proxy服务器代理模式。在配置文件中添加proxy：“http://localhost：5000，这里写成“http://localhost：3000，为了避免以后上线时出现端口变化导致的改代码的问题，就要写成”/login
        //默认方式设置为get，数据类型为{}
        //post请求和get请求穿参不一样
    let dataParam=data
    console.log(dataParam)
    if (method.toLowerCase()==='get'){
        dataParam={
            params: data
        }
    }
    console.log(dataParam)
    return axios[method](url,dataParam)
        .then((res)=>{//跳转至指定网址两种方式，1中red为redirect。2编程是导航this.history。repalce
            const {data} = res
            if(data.status===0){
                return data.data
            } else if(data.status===1){
                message.error(data.msg,2)
            }
        })
        .catch(res=>{
            message.error("网络崩溃了~~~刷新试试")
        })
    //统一处理错误，登录成功有返回data，登录失败，或者网络崩溃返回值都是undefine
}

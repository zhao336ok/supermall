import axios from 'axios'
export function request(config){
  const intance = axios.create({
    baseURL:'xxx',
    timeout:5000
  })

  //1.请求拦截的作用
  intance.interceptors.request.use(config=>{
    return config;
  },error => {
    console.log(error);
  });

  //2.响应拦截
  intance.interceptors.response.use(result=>{
    return result.data
  },error => {
    console.log(error);
  });

  return intance(config)
}

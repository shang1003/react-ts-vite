
const { VITE_HTTP_BASE, VITE_DEV } = import.meta.env
console.log(VITE_HTTP_BASE,'VITE_HTTP_BASE');

const PROD = VITE_DEV === 'false'
const isDevelopment = !PROD

const CONFIG = {
  isProduction: PROD,
  isDevelopment,
  // 路由 basename
  baseURL: '/',
  // 网页标题
  title: 'BSXXX',
  http: {
    baseURL: VITE_HTTP_BASE as string
  },
}

export default CONFIG

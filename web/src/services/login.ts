import request from '@/utils/request';

export interface LoginParamsType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}

/**
 * -login
 * 注意寫路由地址時前面和後面的斜杠,直接影響webapi調的接口地址是否準確，如果亂寫可能導致bug
 * @param params 
 */
export async function accountLogin(params:LoginParamsType){
  return request('/api/users/login',{
    method: 'POST',
    data: params,
  })
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

import request from 'umi-request';
import { UserRegisterParams } from './index';

export async function fakeRegister(params: UserRegisterParams) {
  return request('/api/register', {
    method: 'POST',
    data: params,
  });
}

/**
 * -註冊用戶
 * @param params 
 */
export async function registerUser(params:UserRegisterParams){
  return request('/api/users/registeruser',{
    method: 'POST',
    data:{...params},
  })
}

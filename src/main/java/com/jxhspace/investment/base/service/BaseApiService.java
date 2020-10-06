package com.jxhspace.investment.base.service;

import com.jxhspace.investment.base.vo.ResponseMsg;
import com.jxhspace.investment.base.vo.ResponsePageMsg;

public class BaseApiService {

	/**
	 * 方法描述: (返回成功)
	 */
	public ResponseMsg setResultSuccess() {
		return setResult(BaseHttpStatusCode.HTTP_RES_CODE_200, BaseHttpStatusCode.HTTP_RES_CODE_200_VALUE, null);
	}

	/**
	 * 方法描述: (返回成功，有参数)
	 */
	public ResponseMsg setResultSuccess(String msg) {
		return setResult(BaseHttpStatusCode.HTTP_RES_CODE_200, msg, null);
	}

	/**
	 * 方法描述: (返回成功,有参数，有数据)
	 */
	public ResponseMsg setResultSuccessData(Object data) {
		return setResult(BaseHttpStatusCode.HTTP_RES_CODE_200, BaseHttpStatusCode.HTTP_RES_CODE_200_VALUE, data);
	}

	/**
	 * 方法描述: (返回失败)
	 */
	public ResponseMsg setResultError() {
		return setResult(BaseHttpStatusCode.HTTP_RES_CODE_500, BaseHttpStatusCode.HTTP_RES_CODE_500_VALUE, null);
	}

	/**
	 * 方法描述: (返回失败，有参数)
	 */
	public ResponseMsg setResultError(String msg) {
		return setResult(BaseHttpStatusCode.HTTP_RES_CODE_500, msg, null);
	}

	/**
	 * 方法描述: (返回失败，無結果)
	 */
	public ResponseMsg setResultNoResourcesError(String msg) {
		return setResult(BaseHttpStatusCode.NONE_RES, msg, null);
	}

	/**
	 * 方法描述: (未認證)
	 */
	public ResponseMsg setResultUnauthorizedError() {
		return setResult(BaseHttpStatusCode.UNAUTHORIZED, "訪問令牌無效/身份驗證未能通過", null);
	}

	/**
	 * 方法描述: (無權限)
	 */
	public ResponseMsg setResultNoACCESSError() {
		return setResult(BaseHttpStatusCode.No_ACCESS, "無權限", null);
	}

	/**
	 * 方法描述: (参数错误)
	 */
	public ResponseMsg setResultParamterError(String msg) {
		return setResult(BaseHttpStatusCode.HTTP_RES_CODE_400, msg, null);
	}

	/**
	 * 方法描述: (自定义返回 )
	 */
	public ResponseMsg setResult(Integer code, String msg, Object data) {
		ResponseMsg messageInfo = new ResponseMsg(String.valueOf(code), msg, data);
		return messageInfo;
	}

	/**
	 * -特殊分頁返回模型
	 * 
	 * @param data
	 * @param total
	 * @param pageSize
	 * @param current
	 * @return
	 */
	public ResponsePageMsg setResultSuccessPageData(Object data, Integer total, Integer pageSize, Integer current) {
		ResponsePageMsg msg = new ResponsePageMsg(BaseHttpStatusCode.HTTP_RES_CODE_200, true, data, total, pageSize,
				current);
		return msg;
	}

}

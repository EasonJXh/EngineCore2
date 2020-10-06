package com.jxhspace.investment.base.vo;

import java.util.regex.Pattern;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(description = "返回响应数据")
public class ResponseMsg {

	public ResponseMsg() {
	};

	public ResponseMsg(Integer code, String msg, Object data) {
		this.code = code;
		this.msg = msg;
		if (data != null) {
			this.data = data;
		}

	}

	public ResponseMsg(Integer code, String msg) {
		this.code = code;
		this.msg = msg;
	}

	public ResponseMsg(String code, String msg) {
		Pattern pattern = Pattern.compile("^[-\\+]?[\\d]*$");
		if (pattern.matcher(code).matches()) {
			this.code = Integer.valueOf(code);
		} else {
			this.code = 500;
		}
		this.msg = msg;
	}

	public ResponseMsg(String code, String msg, Object data) {
		Pattern pattern = Pattern.compile("^[-\\+]?[\\d]*$");
		if (pattern.matcher(code).matches()) {
			this.code = Integer.valueOf(code);
		} else {
			this.code = 500;
		}

		this.msg = msg;
		if (data != null) {
			this.data = data;
		}

	}

	@ApiModelProperty(value = "状态码")
	private Integer code;
	@ApiModelProperty(value = "消息")
	private String msg;
	@ApiModelProperty(value = "數據")
	private Object data;
}

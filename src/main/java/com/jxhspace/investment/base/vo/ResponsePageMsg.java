package com.jxhspace.investment.base.vo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel(value = "特殊分頁接收數據模型")
public class ResponsePageMsg {

	/**
	 * -構造函數
	 */
	public ResponsePageMsg() {

	};

	public ResponsePageMsg(Integer code, boolean msg, Object data, Integer total, Integer pageSize, Integer current) {
		this.code = code;
		this.success = msg;
		this.total = total;
		this.pageSize = pageSize;
		this.current = current;
		if (data != null) {
			this.data = data;
		}

	}

	@ApiModelProperty(value = "状态码")
	private Integer code;
	@ApiModelProperty(value = "是否成功標誌位")
	private boolean success;
	@ApiModelProperty(value = "數據")
	private Object data;
	@ApiModelProperty(value = "總條數")
	private Integer total;
	@ApiModelProperty(value = "每頁條數")
	private Integer pageSize;
	@ApiModelProperty(value = "當前頁碼")
	private Integer current;
}

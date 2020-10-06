package com.jxhspace.investment.analysis.vo;

import java.io.Serializable;

import com.baomidou.mybatisplus.annotation.TableField;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class RegisterResultVO implements Serializable {

	/**
	 * -Register User Model
	 */
	private static final long serialVersionUID = 1L;
	private String status;
	private String currentAuthority;
	private String type;

	@TableField(exist = false)
	@ApiModelProperty(value = "msg", example = "錯誤信息", required = false)
	private String msg;
}

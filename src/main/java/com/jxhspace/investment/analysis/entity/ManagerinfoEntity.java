package com.jxhspace.investment.analysis.entity;

import lombok.Data;

import java.io.Serializable;

import com.baomidou.mybatisplus.annotation.TableField;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@Data
@ApiModel(description = "MANAGERINFO")
public class ManagerinfoEntity implements Serializable {

	/**
	 * -MANAGERINFO
	 * 
	 * @author F1680488
	 * @date:2020/6/4
	 */
	private static final long serialVersionUID = 1L;

	@TableField(exist = false)
	@ApiModelProperty(value = "操作類型", example = "insert", required = false)
	private String otype;

	@ApiModelProperty(value = "manager", example = "Xiaonan", required = false)
	private String manager;

	@ApiModelProperty(value = "country", example = "China", required = false)
	private String country;

	@ApiModelProperty(value = "nation", example = "Han", required = false)
	private String nation;

	@ApiModelProperty(value = "sex", example = "male", required = false)
	private String sex;

	@ApiModelProperty(value = "borndate", example = "1980/4/3", required = false)
	private String borndate;

	@ApiModelProperty(value = "education", example = "master", required = false)
	private String education;

	@ApiModelProperty(value = "workdate", example = "2010/6/2", required = false)
	private String workdate;

	@ApiModelProperty(value = "manager", example = "Adhere to long-term investment", required = false)
	private String memo;

	@ApiModelProperty(value = "creator", example = "Tomas", required = false)
	private String creator;

	@ApiModelProperty(value = "amount", example = "6.86billion", required = false)
	private String amount;

	@ApiModelProperty(value = "returnrate", example = "1.863", required = false)
	private String returnrate;

}

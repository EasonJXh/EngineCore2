package com.jxhspace.investment.analysis.entity;

import java.io.Serializable;

import com.baomidou.mybatisplus.annotation.TableField;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel(description = "INVESTMENT_RECORDS")
public class InvestentRecordsEntity implements Serializable {

	/**
	 * -INVESTMENT_RECORDS
	 * 
	 * @author F1680488
	 * @date:2020/6/4
	 */
	private static final long serialVersionUID = 1L;

	@TableField(exist = false)
	@ApiModelProperty(value = "seq", example = "1", required = false)
	private String seq;

	@ApiModelProperty(value = "id", example = "276899EAAAAA42D687579A5F4534A9FE", required = false)
	private String id;

	@ApiModelProperty(value = "trasdate", example = "2020/5/4", required = false)
	private String trasdate;

	@ApiModelProperty(value = "operator", example = "Tomas", required = false)
	private String operator;

	@ApiModelProperty(value = "otype", example = "1", required = false)
	private String otype;

	@ApiModelProperty(value = "fundcode", example = "110022", required = false)
	private String fundcode;

	@ApiModelProperty(value = "amount", example = "5000", required = false)
	private String amount;

	@ApiModelProperty(value = "platform", example = "Alipay", required = false)
	private String platform;

	@ApiModelProperty(value = "events", example = "U.S. launches trade war", required = false)
	private String events;

	@TableField(exist = false)
	private String createdate;

	@TableField(exist = false)
	private String updatedate;

}

package com.jxhspace.investment.analysis.dto;

import com.baomidou.mybatisplus.annotation.TableId;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel(description = "綜合查詢所需參數的封裝模型")
public class ComDetailDTO {

	@TableId
	@ApiModelProperty(value = "fundcode", example = "110022", required = false)
	private String fundcode;

	@ApiModelProperty(value = "ftype", example = "", required = false)
	private String ftype;

	@ApiModelProperty(value = "manager", example = "", required = false)
	private String manager;

	@ApiModelProperty(value = "otype", example = "1", required = false)
	private String otype;

	@ApiModelProperty(value = "sdate", example = "110022", required = false)
	private String sdate;

	@ApiModelProperty(value = "edate", example = "110022", required = false)
	private String edate;

	/* -報表顯示字段- */

	private String amount;

	private String industry;

	private String name;

	private String canbuy;

	private String cansale;

	private String rdate;

	private String grownrate;

	private String price;

	private String trasdate;

}

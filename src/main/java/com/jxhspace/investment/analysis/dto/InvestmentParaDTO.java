package com.jxhspace.investment.analysis.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel(description = "Investment查詢參數傳遞模型")
public class InvestmentParaDTO {

	@ApiModelProperty(value = "fundcode", example = "110022", required = true)
	private String fundcode;

	@ApiModelProperty(value = "platform", example = "Alipay", required = false)
	private String platform;

	@ApiModelProperty(value = "otype", example = "1", required = false)
	private String otype;

	@ApiModelProperty(value = "operator", example = "Tomas", required = false)
	private String operator;

	@ApiModelProperty(value = "sdate", example = "2020/6/13 16:12:45", required = false)
	private String sdate;

	@ApiModelProperty(value = "edate", example = "2020/6/15 13:15:00", required = false)
	private String edate;

	@ApiModelProperty(value = "current", example = "1", required = false)
	private int current;

	@ApiModelProperty(value = "pageSize", example = "10", required = false)
	private int pageSize;

	@ApiModelProperty(value = "startRow", example = "11", required = false)
	private Integer startRow;

	@ApiModelProperty(value = "endRow", example = "20", required = false)
	private Integer endRow;
}

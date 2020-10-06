package com.jxhspace.investment.analysis.entity;

import lombok.Data;

import java.io.Serializable;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@Data
@ApiModel(description = "FUNDPRICE_RECORDS")
public class FundpriceRecordsEntity implements Serializable {

	/**
	 * -FUNDPRICE_RECORDS
	 * 
	 * @author F1680488
	 * @date:2020/6/4
	 */
	private static final long serialVersionUID = 1L;

	@ApiModelProperty(value = "fundcode", example = "110022", required = false)
	private String fundcode;

	@ApiModelProperty(value = "price", example = "2.8450", required = false)
	private String price;

	@ApiModelProperty(value = "rdate", example = "2020/2/3", required = false)
	private String rdate;

	@ApiModelProperty(value = "frank", example = "3", required = false)
	private String frank;

	@ApiModelProperty(value = "isover", example = "Y", required = false)
	private String isover;

	@ApiModelProperty(value = "mposition", example = "Moutai", required = false)
	private String mposition;

	@ApiModelProperty(value = "creator", example = "Tomas", required = false)
	private String creator;

	@ApiModelProperty(value = "memo", example = "The wave of de-dollarization broke out", required = false)
	private String memo;

	@ApiModelProperty(value = "sdate", example = "2020/6/1 12:00:23", required = false)
	private String sdate;

	@ApiModelProperty(value = "edate", example = "2020/6/4 16:03:03", required = false)
	private String edate;
}

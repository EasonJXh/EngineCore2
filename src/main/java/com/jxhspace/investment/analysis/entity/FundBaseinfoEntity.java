package com.jxhspace.investment.analysis.entity;

import lombok.Data;

import java.io.Serializable;

import com.baomidou.mybatisplus.annotation.TableField;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@Data
@ApiModel(description = "FUNDBASEINFO")
public class FundBaseinfoEntity implements Serializable {

	/**
	 * -FUNDBASEINFO
	 * 
	 * @author F1680488
	 * @date:2020/6/4
	 */
	private static final long serialVersionUID = 1L;

	@TableField(exist = false)
	@ApiModelProperty(value = "操作類型", example = "insert", required = false)
	private String otype;

	@ApiModelProperty(value = "fundcode", example = "110022", required = false)
	private String fundcode;

	@ApiModelProperty(value = "name", example = "E Fund Consumer Stocks", required = false)
	private String name;

	@ApiModelProperty(value = "manager", example = "Xiaonan", required = false)
	private String manager;

	@ApiModelProperty(value = "fundcode", example = "China Construction Bank Corporation Limited", required = false)
	private String escrow;

	@ApiModelProperty(value = "founddate", example = "2012/5/14", required = false)
	private String founddate;

	@ApiModelProperty(value = "fundcode", example = "Stock type", required = false)
	private String ftype;

	@ApiModelProperty(value = "industry", example = "Technology", required = false)
	private String industry;

	@ApiModelProperty(value = "assetsize", example = "6.412 billion", required = false)
	private String assetsize;

	@ApiModelProperty(value = "market", example = "A shares", required = false)
	private String market;

	@ApiModelProperty(value = "flevel", example = "5", required = false)
	private Integer flevel;

	@ApiModelProperty(value = "creator", example = "Tomas", required = false)
	private String creator;

	@ApiModelProperty(value = "market", example = "0.0015", required = false)
	private String buyrate;
}

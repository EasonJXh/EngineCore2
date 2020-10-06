package com.jxhspace.investment.analysis.dto;

import lombok.Data;

@Data
public class PriceTrendDTO {
	private String fundcode;
	private String rdate;
	private double value;
	private double assist;
}

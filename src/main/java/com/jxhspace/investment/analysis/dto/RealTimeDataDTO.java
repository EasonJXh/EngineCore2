package com.jxhspace.investment.analysis.dto;

import lombok.Data;

@Data
public class RealTimeDataDTO {

	private String fundcode;
	private double maxvalue;
	private double nowvalue;
	private double assist;
}

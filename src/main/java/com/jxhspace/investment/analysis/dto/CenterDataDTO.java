package com.jxhspace.investment.analysis.dto;

import java.util.List;

import lombok.Data;

@Data
public class CenterDataDTO {
	private String rating;
	private String coeNum;
	private String maxItem;
	private String minItem;
	private String operation;
	private List<RateDTO> market;
	private RateDTO fun;
}

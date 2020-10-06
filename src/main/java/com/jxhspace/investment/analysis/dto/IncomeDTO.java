package com.jxhspace.investment.analysis.dto;

import lombok.Data;

@Data
public class IncomeDTO {

	private String fundcode;

	private String recentdate;

	private String cost;

	private String cumincome;

	private String costincrem;

	private String incomeincrem;

	private String maxcumincome;

	private String mincumincome;

	private String avgcumincome;
}

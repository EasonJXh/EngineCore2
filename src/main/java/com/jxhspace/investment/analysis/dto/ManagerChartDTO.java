package com.jxhspace.investment.analysis.dto;

import java.util.List;

import lombok.Data;

@Data
public class ManagerChartDTO {
	private String manager;
	private String country;
	private String sex;
	private String education;
	private String workdate;
	private double amount;
	private double returnRate;
	private String imgPath;
	private String memo;
	private List<RateDTO> managerFund;
	private String fundcode;
	private double value;
	private double assist;
}

package com.jxhspace.investment.analysis.vo;

import lombok.Data;

@Data
public class AnalysisChartVO {
	private String rdate;
	private double avgRate;
	private double minRate;
	private double maxRate;
	private double minMed;
	private double maxMed;
	private double minAvg;
	private double maxAvg;
	private String trend;
}

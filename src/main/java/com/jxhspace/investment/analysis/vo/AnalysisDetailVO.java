package com.jxhspace.investment.analysis.vo;

import java.util.List;

import lombok.Data;

@Data
public class AnalysisDetailVO {

	private List<AnalysisChartVO> analysisChartData;
	private List<AnalysisAdviceVO> analysisAdviceData;

}

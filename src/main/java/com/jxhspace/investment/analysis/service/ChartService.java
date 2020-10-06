package com.jxhspace.investment.analysis.service;

import java.util.List;

import com.jxhspace.investment.analysis.dto.CenterDataDTO;
import com.jxhspace.investment.analysis.dto.ManagerChartDTO;
import com.jxhspace.investment.analysis.dto.PriceTrendDTO;
import com.jxhspace.investment.analysis.dto.RateDTO;
import com.jxhspace.investment.analysis.dto.RealTimeDataDTO;
import com.jxhspace.investment.analysis.vo.AnalysisDetailVO;
import com.jxhspace.investment.base.dto.TextValueDTO;
import com.jxhspace.investment.base.vo.ResponseMsg;

public interface ChartService {

	// Get AvgIncome Data
	ResponseMsg getAvgIncome();

	// Get Manager Ability Data
	ResponseMsg getMangerAblity();

	// Get Each Platform Trans-Data
	ResponseMsg getPlatformTrans();

	// Get Each Month Trans-Data
	ResponseMsg getEachMonthTrans();

	// Get Each Times Trans-Data
	ResponseMsg getEachTimesInfo();

	// Get Each Pc In-Out-Data
	ResponseMsg getEachPcInOut();

	// Get Each day Fluctuation Data
	ResponseMsg getEachDayPrice(String fundcode, String sdate, String edate);

	// Get Each-Price Compared-Data
	ResponseMsg getPriceCompared(String fundcode, String sdate, String edate);

	// Get Incomeinfo-Data
	ResponseMsg getIncomeInfo(String fundcode, String sdate, String edate);

	// Get Variance-Data
	List<RateDTO> getVariance(String inDate);

	// Get Ratio-Data
	ResponseMsg getRatio(String fundcode, String sdate, String edate);

	// Get IncreameIncome Data
	ResponseMsg getIncreameIncome(String fundcode, String sdate, String edate);

	// Get TotalIncomeInfo-Data
	ResponseMsg getTotalIncomeInfo(String fundcode);

	// Get Operation Advice
	ResponseMsg getAdvice(String fundcode);

	// 1.Get RealTimeRow-Data
	List<RealTimeDataDTO> getRealTimeRowData(String inDate);

	// 2.Get Srate-Data
	List<RateDTO> getSrateData(String inDate);

	// 3.Get AmountTop-Data
	List<RateDTO> getAmountTopData(String inDate);

	// 4.Get ClassType-Data
	List<RateDTO> getClassTypeData(String inDate);

	// 5.Get ClassIncome-Data
	List<RateDTO> getClassIncomeData(String inDate);

	// 6.Get Hold-Data
	List<RateDTO> getHoldData();

	// 7.Get PriceTrend-Data
	List<PriceTrendDTO> getpriceTrend(String industry, String fundcode, String sDate, String inDate);

	// 8.Get IncomeTrend-Data
	List<PriceTrendDTO> getIncomeTrend(String fundcode, String sDate, String inDate);

	// 9.Get RecentOperate-Data
	List<PriceTrendDTO> getRecentOperateData();

	// 10.Get Industory-Data
	List<TextValueDTO> getIndustryList();

	// 11.Get Lastdate Price-Data
	List<RateDTO> getLastdate(String inDate);

	// 12.Get Monthdetails-Data
	List<RateDTO> getMonthDetailsData(String sDate, String inDate);

	// 13.Get LastDateFundcode-Data
	List<RateDTO> getLastDateFundecodeData(String inDate);

	// 14.Get Index-Data
	List<PriceTrendDTO> getIndexData(String inDate);

	// 15.Get CenterAnalysis-Data
	CenterDataDTO getCenterAnalysisData(String inDate);

	// 16.Get Manager-Chartinfo
	ManagerChartDTO getManagerChart(String manager);

	// 17.Get Analysis-Details-Data
	AnalysisDetailVO getAnalysisDetailData(String inData);
}

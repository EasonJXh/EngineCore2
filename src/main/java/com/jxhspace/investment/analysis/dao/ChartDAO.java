package com.jxhspace.investment.analysis.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.jxhspace.investment.analysis.dto.AdviceDTO;
import com.jxhspace.investment.analysis.dto.ComDetailDTO;
import com.jxhspace.investment.analysis.dto.FundinfoDTO;
import com.jxhspace.investment.analysis.dto.IncomeDTO;
import com.jxhspace.investment.analysis.dto.ManagerChartDTO;
import com.jxhspace.investment.analysis.dto.ManagerDTO;
import com.jxhspace.investment.analysis.dto.PlatformDTO;
import com.jxhspace.investment.analysis.dto.PriceDTO;
import com.jxhspace.investment.analysis.dto.PriceTrendDTO;
import com.jxhspace.investment.analysis.dto.RateDTO;
import com.jxhspace.investment.analysis.dto.RatioDTO;
import com.jxhspace.investment.analysis.dto.RealTimeDataDTO;
import com.jxhspace.investment.analysis.dto.TransDTO;
import com.jxhspace.investment.analysis.vo.AnalysisAdviceVO;
import com.jxhspace.investment.analysis.vo.AnalysisChartVO;
import com.jxhspace.investment.base.dto.TextValueDTO;

public interface ChartDAO extends BaseMapper<ComDetailDTO> {

	// Get AvgIncome Data
	List<FundinfoDTO> getAvgIncome();

	// Get Manager Ability Data
	List<ManagerDTO> getMangerAblity();

	// Get Each Platform Trans-Data
	List<PlatformDTO> getPlatformTrans();

	// Get Each Month Trans-Data
	List<TransDTO> getEachMonthTrans();

	// Get Each Times Trans-Data
	List<TransDTO> getEachTimesInfo();

	// Get Each Pc In-Out-Data
	List<TransDTO> getEachPcInOut();

	// Get Each day Fluctuation Data
	List<PriceDTO> getEachDayPrice(@Param("fundcode") String fundcode, @Param("sdate") String sdate,
			@Param("edate") String edate);

	// Get Each-Price Compared-Data
	List<PriceDTO> getPriceCompared(@Param("fundcode") String fundcode, @Param("sdate") String sdate,
			@Param("edate") String edate);

	// Get Incomeinfo-Data
	List<IncomeDTO> getIncomeInfo(@Param("fundcode") String fundcode, @Param("sdate") String sdate,
			@Param("edate") String edate);

	// Get Variance-Data
	List<RateDTO> getVariance(@Param("inDate") String inDate);

	// Get Ratio-Data
	List<RatioDTO> getRatio(@Param("fundcode") String fundcode, @Param("sdate") String sdate,
			@Param("edate") String edate);

	// Get IncreameIncome Data
	List<IncomeDTO> getIncreameIncome(@Param("fundcode") String fundcode, @Param("sdate") String sdate,
			@Param("edate") String edate);

	// Get TotalIncomeInfo-Data
	List<IncomeDTO> getTotalIncomeInfo(@Param("fundcode") String fundcode);

	// Get Operation Advice
	List<AdviceDTO> getAdvice(@Param("fundcode") String fundcode);

	// 1.Get RealTimeRow-Data
	List<RealTimeDataDTO> getRealTimeRowData(@Param("inDate") String inDate);

	// 2.Get Srate-Data
	List<RateDTO> getSrateData(@Param("inDate") String inDate);

	// 3.Get AmountTop-Data
	List<RateDTO> getAmountTopData(@Param("inDate") String inDate);

	// 4.Get ClassType-Data
	List<RateDTO> getClassTypeData(@Param("inDate") String inDate);

	// 5.Get ClassIncome-Data
	List<RateDTO> getClassIncomeData(@Param("inDate") String inDate);

	// 6.Get Hold-Data
	List<RateDTO> getHoldData();

	// 7.Get PriceTrend-Data
	List<PriceTrendDTO> getpriceTrend(@Param("industry") String industry, @Param("fundcode") String fundcode,
			@Param("sDate") String sDate,
			@Param("inDate") String inDate);

	// 8.Get IncomeTrend-Data
	List<PriceTrendDTO> getIncomeTrend(@Param("fundcode") String fundcode, @Param("sDate") String sDate,
			@Param("inDate") String inDate);

	// 9.Get RecentOperate-Data
	List<PriceTrendDTO> getRecentOperateData();

	// 10.Get Industory-Data
	List<TextValueDTO> getIndustryList();

	// 11.Get Lastdate Price-Data
	List<RateDTO> getLastdate(@Param("inDate") String inDate);

	// 12.Get Monthdetails-Data
	List<RateDTO> getMonthDetailsData(@Param("sDate") String sDate, @Param("inDate") String inDate);

	// 13.Get LastDateFundcode-Data
	List<RateDTO> getLastDateFundecodeData(@Param("inDate") String inDate);

	// 14.Get Index-Data
	List<PriceTrendDTO> getIndexData(@Param("inDate") String inDate);

	// 15.Get Center-circle-Data
	List<TextValueDTO> getCenterCircleData(@Param("inDate") String inDate);

	// 16.Get Center-analysis-Data
	String getCenterAnalysisData(@Param("inDate") String inDate);

	// 17.Get Manager-Chartinfo
	List<ManagerChartDTO> getManagerChart(@Param("manager") String manager);

	// 18.Get AnalysisChartData
	List<AnalysisChartVO> getAnalysisChartData(@Param("para") HashMap<String, Object> para);

	// 19.Get AnalysisAdaviceData
	List<AnalysisAdviceVO> getAnalysisAdaviceData(@Param("para") HashMap<String, Object> para);
}

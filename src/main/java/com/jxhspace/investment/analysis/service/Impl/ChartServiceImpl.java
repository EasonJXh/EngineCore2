package com.jxhspace.investment.analysis.service.Impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jxhspace.investment.analysis.dao.ChartDAO;
import com.jxhspace.investment.analysis.dto.AdviceDTO;
import com.jxhspace.investment.analysis.dto.CenterDataDTO;
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
import com.jxhspace.investment.analysis.service.ChartService;
import com.jxhspace.investment.analysis.vo.AnalysisAdviceVO;
import com.jxhspace.investment.analysis.vo.AnalysisChartVO;
import com.jxhspace.investment.analysis.vo.AnalysisDetailVO;
import com.jxhspace.investment.base.dto.TextValueDTO;
import com.jxhspace.investment.base.service.BaseApiService;
import com.jxhspace.investment.base.vo.ResponseMsg;

/**
 * -Charts Analysis-Data Show
 * 
 * @author F1680488
 * @date 2020/6/19 17:13:23
 */
@Service
public class ChartServiceImpl extends BaseApiService implements ChartService {

	/**
	 * DAO層接口實例化
	 */
	@Autowired
	private ChartDAO chartDAO;

	// Get AvgIncome Data
	@Override
	public ResponseMsg getAvgIncome() {
		List<FundinfoDTO> data = chartDAO.getAvgIncome();
		return setResultSuccessData(data);
	}

	// Get Manager Ability Data
	@Override
	public ResponseMsg getMangerAblity() {
		List<ManagerDTO> data = chartDAO.getMangerAblity();
		return setResultSuccessData(data);
	}

	// Get Each Platform Trans-Data
	@Override
	public ResponseMsg getPlatformTrans() {
		List<PlatformDTO> data = chartDAO.getPlatformTrans();
		return setResultSuccessData(data);
	}

	// Get Each Month Trans-Data
	@Override
	public ResponseMsg getEachMonthTrans() {
		List<TransDTO> data = chartDAO.getEachMonthTrans();
		return setResultSuccessData(data);
	}

	// Get Each Times Trans-Data
	@Override
	public ResponseMsg getEachTimesInfo() {
		List<TransDTO> data = chartDAO.getEachTimesInfo();
		return setResultSuccessData(data);
	}

	// Get Each Pc In-Out-Data
	@Override
	public ResponseMsg getEachPcInOut() {
		List<TransDTO> data = chartDAO.getEachPcInOut();
		return setResultSuccessData(data);
	}

	// Get Each day Fluctuation Data
	@Override
	public ResponseMsg getEachDayPrice(String fundcode, String sdate, String edate) {
		List<PriceDTO> data = chartDAO.getEachDayPrice(fundcode, sdate, edate);
		return setResultSuccessData(data);
	}

	// Get Each-Price Compared-Data
	@Override
	public ResponseMsg getPriceCompared(String fundcode, String sdate, String edate) {
		List<PriceDTO> data = chartDAO.getPriceCompared(fundcode, sdate, edate);
		return setResultSuccessData(data);
	}

	// Get Incomeinfo-Data
	@Override
	public ResponseMsg getIncomeInfo(String fundcode, String sdate, String edate) {
		List<IncomeDTO> data = chartDAO.getIncomeInfo(fundcode, sdate, edate);
		return setResultSuccessData(data);
	}

	// Get Variance-Data
	@Override
	public List<RateDTO> getVariance(String inDate) {
		List<RateDTO> data = chartDAO.getVariance(inDate);
		return data;
	}

	// Get Ratio-Data
	@Override
	public ResponseMsg getRatio(String fundcode, String sdate, String edate) {
		List<RatioDTO> data = chartDAO.getRatio(fundcode, sdate, edate);
		return setResultSuccessData(data);
	}

	// Get IncreameIncome Data
	@Override
	public ResponseMsg getIncreameIncome(String fundcode, String sdate, String edate) {
		List<IncomeDTO> data = chartDAO.getIncreameIncome(fundcode, sdate, edate);
		return setResultSuccessData(data);
	}

	// Get TotalIncomeInfo-Data
	@Override
	public ResponseMsg getTotalIncomeInfo(String fundcode) {
		List<IncomeDTO> data = chartDAO.getTotalIncomeInfo(fundcode);
		return setResultSuccessData(data);
	}

	// Get Operation Advice
	@Override
	public ResponseMsg getAdvice(String fundcode) {
		List<AdviceDTO> data = chartDAO.getAdvice(fundcode);
		return setResultSuccessData(data);
	}

	// 1.Get RealTimeRow-Data
	@Override
	public List<RealTimeDataDTO> getRealTimeRowData(String inDate) {
		List<RealTimeDataDTO> data = chartDAO.getRealTimeRowData(inDate);
		return data;
	}

	// 2.Get Srate-Data
	@Override
	public List<RateDTO> getSrateData(String inDate) {
		List<RateDTO> data = chartDAO.getSrateData(inDate);
		return data;
	}

	// 3.Get AmountTop-Data
	@Override
	public List<RateDTO> getAmountTopData(String inDate) {
		List<RateDTO> data = chartDAO.getAmountTopData(inDate);
		return data;
	}

	// 4.Get ClassType-Data
	@Override
	public List<RateDTO> getClassTypeData(String inDate) {
		List<RateDTO> data = chartDAO.getClassTypeData(inDate);
		return data;
	}

	// 5.Get ClassIncome-Data
	@Override
	public List<RateDTO> getClassIncomeData(String inDate) {
		List<RateDTO> data = chartDAO.getClassIncomeData(inDate);
		return data;
	}

	// 6.Get Hold-Data
	@Override
	public List<RateDTO> getHoldData() {
		List<RateDTO> data = chartDAO.getHoldData();
		return data;
	}

	// 7.Get PriceTrend-Data
	@Override
	public List<PriceTrendDTO> getpriceTrend(String industry, String fundcode, String sDate, String inDate) {
		List<PriceTrendDTO> data = chartDAO.getpriceTrend(industry, fundcode, sDate, inDate);
		return data;
	}

	// 8.Get IncomeTrend-Data
	@Override
	public List<PriceTrendDTO> getIncomeTrend(String fundcode, String sDate, String inDate) {
		List<PriceTrendDTO> data = chartDAO.getIncomeTrend(fundcode, sDate, inDate);
		return data;
	}

	// 9.Get RecentOperate-Data
	@Override
	public List<PriceTrendDTO> getRecentOperateData() {
		List<PriceTrendDTO> data = chartDAO.getRecentOperateData();
		return data;
	}

	// 10.Get Industory-Data
	@Override
	public List<TextValueDTO> getIndustryList() {
		List<TextValueDTO> data = chartDAO.getIndustryList();
		return data;
	}

	// 11.Get Lastdate Price-Data
	@Override
	public List<RateDTO> getLastdate(String inDate) {
		List<RateDTO> data = chartDAO.getLastdate(inDate);
		return data;
	}

	// 12.Get Monthdetails-Data
	@Override
	public List<RateDTO> getMonthDetailsData(String sDate, String inDate) {
		List<RateDTO> data = chartDAO.getMonthDetailsData(sDate, inDate);
		return data;
	}

	// 13.Get LastDateFundcode-Data
	@Override
	public List<RateDTO> getLastDateFundecodeData(String inDate) {
		List<RateDTO> data = chartDAO.getLastDateFundecodeData(inDate);
		return data;
	}

	// 14.Get Index-Data
	@Override
	public List<PriceTrendDTO> getIndexData(String inDate) {
		List<PriceTrendDTO> data = chartDAO.getIndexData(inDate);
		return data;
	}

	// 15.Get CenterAnalysis-Data
	@Override
	public CenterDataDTO getCenterAnalysisData(String inDate) {
		// 對數據進行格式轉換處理
		CenterDataDTO e = new CenterDataDTO();
		RateDTO e1 = new RateDTO();
		RateDTO e2 = new RateDTO();
		List<TextValueDTO> circleData = chartDAO.getCenterCircleData(inDate);
		List<RateDTO> marketList = new ArrayList<RateDTO>();
		RateDTO fundList = new RateDTO();
		String analysisResult = chartDAO.getCenterAnalysisData(inDate);
		String[] row1 = circleData.get(0).getText().split(",");
		String[] row2 = circleData.get(1).getText().split(",");
		String[] row3 = circleData.get(2).getText().split(",");

		e1.setFundcode(row1[0]);
		e1.setValue(Integer.parseInt(row1[1]));
		e1.setAssist(0);
		marketList.add(e1);

		e2.setFundcode(row2[0]);
		e2.setValue(Integer.parseInt(row2[1]));
		e2.setAssist(0);
		marketList.add(e2);
		e.setMarket(marketList);

		fundList.setFundcode(row3[0]);
		fundList.setValue(Integer.parseInt(row3[3]));
		fundList.setAssist(0);
		e.setFun(fundList);

		String[] result = analysisResult.split(",");
		e.setRating(result[0]);
		e.setCoeNum(result[1]);
		e.setMaxItem(result[2]);
		e.setMinItem(result[3]);
		e.setOperation(result[4]);
		return e;
	}

	// 16.Get Manager-Chartinfo
	@Override
	public ManagerChartDTO getManagerChart(String manager) {
		List<ManagerChartDTO> list = chartDAO.getManagerChart(manager);
		ManagerChartDTO e = new ManagerChartDTO();
		List<RateDTO> managerFund = new ArrayList<RateDTO>();
		for (ManagerChartDTO item : list) {
			RateDTO e1 = new RateDTO();
			e1.setFundcode(item.getFundcode());
			e1.setValue(item.getValue());
			e1.setAssist(item.getAssist());
			managerFund.add(e1);
		}
		e.setManagerFund(managerFund);
		if (list.size() > 0) {
			e.setManager(list.get(0).getManager());
			e.setCountry(list.get(0).getCountry());
			e.setEducation(list.get(0).getEducation());
			e.setSex(list.get(0).getSex());
			e.setAmount(list.get(0).getAmount());
			e.setReturnRate(list.get(0).getReturnRate());
			e.setMemo(list.get(0).getMemo());
			e.setImgPath(list.get(0).getImgPath());
			e.setWorkdate(list.get(0).getWorkdate());
		}
		return e;
	}

	// 17.Get Analysis-Details-Data
	@SuppressWarnings("unchecked")
	@Override
	public AnalysisDetailVO getAnalysisDetailData(String inData) {
		AnalysisDetailVO e = new AnalysisDetailVO();

		List<?> dataChart = new ArrayList<Map<String, Object>>();
		HashMap<String, Object> chartMap = new HashMap<String, Object>();
		chartMap.put("tdate", inData);
		chartMap.put("days", 365);
		chartMap.put("outrecord", dataChart);
		chartDAO.getAnalysisChartData(chartMap);
		dataChart = (List<?>) chartMap.get("outrecord");

		List<?> dataAdvice = new ArrayList<Map<String, Object>>();
		HashMap<String, Object> adviceMap = new HashMap<String, Object>();
		adviceMap.put("tdate", inData);
		adviceMap.put("days", 365);
		adviceMap.put("outrecord", dataAdvice);
		chartDAO.getAnalysisAdaviceData(adviceMap);
		dataAdvice = (List<?>) adviceMap.get("outrecord");
		e.setAnalysisChartData((List<AnalysisChartVO>) dataChart);
		e.setAnalysisAdviceData((List<AnalysisAdviceVO>) dataAdvice);
		return e;
	}

}

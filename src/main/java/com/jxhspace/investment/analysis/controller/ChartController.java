package com.jxhspace.investment.analysis.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jxhspace.investment.analysis.dto.CenterDataDTO;
import com.jxhspace.investment.analysis.dto.ChartShowModelDTO;
import com.jxhspace.investment.analysis.dto.ManagerChartDTO;
import com.jxhspace.investment.analysis.dto.PriceTrendDTO;
import com.jxhspace.investment.analysis.dto.RateDTO;
import com.jxhspace.investment.analysis.dto.RealTimeDataDTO;
import com.jxhspace.investment.analysis.dto.RealTimeParaDTO;
import com.jxhspace.investment.analysis.service.ChartService;
import com.jxhspace.investment.analysis.vo.AnalysisDetailVO;
import com.jxhspace.investment.base.dto.TextValueDTO;
import com.jxhspace.investment.base.service.BaseApiService;
import com.jxhspace.investment.base.utils.MySystemUtil;
import com.jxhspace.investment.base.vo.ResponseMsg;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("api/chart/")
@Api(tags = "Charts Analysis-Data Show")
/**
 * -Show Chart-Data!
 * 
 * @author F1680488
 * @date 2020/6/13 10:47:15
 *
 */
public class ChartController extends BaseApiService {

	/**
	 * -服務層接口引入
	 */

	@Autowired
	private ChartService chartService;

	@GetMapping("getfundinfotype")
	@ApiOperation(value = "Get FundinfoType Data")
	public ResponseMsg getFundinfoType() {
		ResponseMsg msg = chartService.getAvgIncome();
		return msg;
	}

	@GetMapping("getmanagerablity")
	@ApiOperation(value = "Get Manager Ability Data ")
	public ResponseMsg getMangerAblity() {
		ResponseMsg msg = chartService.getMangerAblity();
		return msg;
	}

	@GetMapping("getplatformtrans")
	@ApiOperation(value = "Get Each Platform Trans-Data")
	public ResponseMsg getPlatformTrans() {
		ResponseMsg msg = chartService.getPlatformTrans();
		return msg;
	}

	@GetMapping("geteachmonthtrans")
	@ApiOperation(value = "Get Each Month Trans-Data")
	public ResponseMsg getEachMonthTrans() {
		ResponseMsg msg = chartService.getEachMonthTrans();
		return msg;
	}

	@GetMapping("geteachtimesinfo")
	@ApiOperation(value = "Get Each Times Trans-Data")
	public ResponseMsg getEachTimesInfo() {
		ResponseMsg msg = chartService.getEachTimesInfo();
		return msg;
	}

	@GetMapping("geteachpcinout")
	@ApiOperation(value = "Get Each Pc In-Out-Data")
	public ResponseMsg getEachPcInOut() {
		ResponseMsg msg = chartService.getEachPcInOut();
		return msg;
	}

	@GetMapping("geteachdayprice")
	@ApiOperation(value = "Get Each day Fluctuation Data")
	@ApiImplicitParams({ @ApiImplicitParam(dataType = "String", name = "fundcode", value = "代碼", required = false),
			@ApiImplicitParam(dataType = "String", name = "sdate", value = "起始日期", required = false),
			@ApiImplicitParam(dataType = "String", name = "edate", value = "截止日期", required = false) })
	public ResponseMsg getEachDayPrice(String fundcode, String sdate, String edate) {
		ResponseMsg msg = chartService.getEachDayPrice(fundcode, sdate, edate);
		return msg;
	}

	@GetMapping("getpricecompared")
	@ApiOperation(value = "Get Each-Price Compared-Data")
	@ApiImplicitParams({ @ApiImplicitParam(dataType = "String", name = "fundcode", value = "代碼", required = false),
			@ApiImplicitParam(dataType = "String", name = "sdate", value = "起始日期", required = false),
			@ApiImplicitParam(dataType = "String", name = "edate", value = "截止日期", required = false) })
	public ResponseMsg getPriceCompared(String fundcode, String sdate, String edate) {
		ResponseMsg msg = chartService.getPriceCompared(fundcode, sdate, edate);
		return msg;
	}

	@GetMapping("getincomeinfo")
	@ApiOperation(value = "Get Incomeinfo-Data")
	@ApiImplicitParams({ @ApiImplicitParam(dataType = "String", name = "fundcode", value = "代碼", required = false),
			@ApiImplicitParam(dataType = "String", name = "sdate", value = "起始日期", required = false),
			@ApiImplicitParam(dataType = "String", name = "edate", value = "截止日期", required = false) })
	public ResponseMsg getIncomeInfo(String fundcode, String sdate, String edate) {
		ResponseMsg msg = chartService.getIncomeInfo(fundcode, sdate, edate);
		return msg;
	}

	@GetMapping("getratio")
	@ApiOperation(value = "Get Ratio-Data")
	@ApiImplicitParams({ @ApiImplicitParam(dataType = "String", name = "fundcode", value = "代碼", required = false),
			@ApiImplicitParam(dataType = "String", name = "sdate", value = "起始日期", required = false),
			@ApiImplicitParam(dataType = "String", name = "edate", value = "截止日期", required = false) })
	public ResponseMsg getRatio(String fundcode, String sdate, String edate) {
		ResponseMsg msg = chartService.getRatio(fundcode, sdate, edate);
		return msg;
	}

	@GetMapping("getincreameincome")
	@ApiOperation(value = "Get IncreameIncome Data")
	@ApiImplicitParams({ @ApiImplicitParam(dataType = "String", name = "fundcode", value = "代碼", required = false),
			@ApiImplicitParam(dataType = "String", name = "sdate", value = "起始日期", required = false),
			@ApiImplicitParam(dataType = "String", name = "edate", value = "截止日期", required = false) })
	public ResponseMsg getIncreameIncome(String fundcode, String sdate, String edate) {
		ResponseMsg msg = chartService.getIncreameIncome(fundcode, sdate, edate);
		return msg;
	}

	@GetMapping("gettotalincomeinfo")
	@ApiOperation(value = "Get TotalIncomeInfo-Data")
	@ApiImplicitParam(dataType = "String", name = "fundcode", value = "代碼", required = false)
	public ResponseMsg getTotalIncomeInfo(String fundcode) {
		ResponseMsg msg = chartService.getTotalIncomeInfo(fundcode);
		return msg;
	}

	@GetMapping("getadvice")
	@ApiOperation(value = "Get Operation Advice")
	@ApiImplicitParam(dataType = "String", name = "fundcode", value = "代碼", required = false)
	public ResponseMsg getAdvice(String fundcode) {
		ResponseMsg msg = chartService.getAdvice(fundcode);
		return msg;
	}

	/**
	 * -按模塊進行匯總接口數據
	 */

	@PostMapping("getrealtimerowdata")
	@ApiOperation(value = "1.Get All-Chart-Data")
	@ApiImplicitParam(dataType = "String", name = "RealTimeParaDTO", value = "結束日期", required = false)
	public ChartShowModelDTO getRealTimeRowData(@RequestBody RealTimeParaDTO para) {
		Date today = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("HH");
		Integer num = Integer.parseInt(sdf.format(today));

		String industry = para.getIndustry() == null ? null : para.getIndustry();
		String fundcode = para.getFundcode() == null ? null : para.getFundcode();
		String startDate = para.getStartDate() == null ? null : para.getStartDate();
		String endDate = para.getEndDate() == null ? null : para.getEndDate();

		if (endDate == null) {
			if (num < 10) {
				Date yestoday = MySystemUtil.getAtDateAfter(new Date(), -1);
				endDate = MySystemUtil.DateToStr(yestoday, "yyyy/MM/dd");
			}
		}

		/* 接口集合數據獲取 */
		List<RealTimeDataDTO> realTimeData = chartService.getRealTimeRowData(endDate);
		List<RateDTO> srateData = chartService.getSrateData(endDate);
		List<RateDTO> amountTopData = chartService.getAmountTopData(endDate);
		List<RateDTO> classTypeData = chartService.getClassTypeData(endDate);
		List<RateDTO> classIncomeData = chartService.getClassIncomeData(endDate);
		List<RateDTO> varianceData = chartService.getVariance(endDate);
		List<RateDTO> holdData = chartService.getHoldData();
		List<PriceTrendDTO> priceTrendData = chartService.getpriceTrend(industry, fundcode, startDate, endDate);
		List<PriceTrendDTO> incomeTrendData = chartService.getIncomeTrend(fundcode, startDate, endDate);
		List<PriceTrendDTO> recentOperateData = chartService.getRecentOperateData();
		List<TextValueDTO> industryListData = chartService.getIndustryList();
		List<RateDTO> lastDateData = chartService.getLastdate(endDate);
		List<RateDTO> monthDetailsData = chartService.getMonthDetailsData(startDate, endDate);
		List<RateDTO> lastDateFundcodeData = chartService.getLastDateFundecodeData(endDate);
		List<PriceTrendDTO> indexData = chartService.getIndexData(endDate);
		CenterDataDTO centerData = chartService.getCenterAnalysisData(endDate);

		/* 封裝到容器中返回給前端 */
		ChartShowModelDTO collection = new ChartShowModelDTO();
		collection.setRealTimeData(realTimeData);
		collection.setSrateData(srateData);
		collection.setAmountTopData(amountTopData);
		collection.setClassTypeData(classTypeData);
		collection.setClassIncomeData(classIncomeData);
		collection.setVarianceData(varianceData);
		collection.setHoldData(holdData);
		collection.setPriceTrendData(priceTrendData);
		collection.setIncomeTrendData(incomeTrendData);
		collection.setRecentOperateData(recentOperateData);
		collection.setIndustryListData(industryListData);
		collection.setLastDateData(lastDateData);
		collection.setMonthDetailsData(monthDetailsData);
		collection.setLastDateFundcodeData(lastDateFundcodeData);
		collection.setIndexData(indexData);
		collection.setCenterAnalysisData(centerData);

		return collection;
	}

	@GetMapping("getindexdatadetail")
	@ApiImplicitParam(dataType = "String", name = "fundcode", value = "代碼", required = false)
	@ApiOperation(value = "Get Index-Data")
	public List<PriceTrendDTO> getIndexDataDetail(String fundcode) {
		List<PriceTrendDTO> data = chartService.getpriceTrend("指數", fundcode, null, null);
		return data;
	}

	@GetMapping("getmanagerchart")
	@ApiImplicitParam(dataType = "String", name = "manager", value = "經理", required = false)
	@ApiOperation(value = "Get Manager-Chartinfo")
	public ManagerChartDTO getManagerChart(String manager) {
		ManagerChartDTO data = chartService.getManagerChart(manager);
		return data;
	}

	@GetMapping("getanalysisdetaildata")
	@ApiImplicitParam(dataType = "String", name = "inData", value = "日期", required = false)
	@ApiOperation(value = "Get Analysis-Details-Data")
	public AnalysisDetailVO getAnalysisDetailData(String inData) {
		AnalysisDetailVO data = chartService.getAnalysisDetailData(inData);
		return data;
	}

}

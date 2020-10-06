package com.jxhspace.investment.analysis.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jxhspace.investment.analysis.dto.DelParaDTO;
import com.jxhspace.investment.analysis.dto.InvestmentParaDTO;
import com.jxhspace.investment.analysis.entity.FundBaseinfoEntity;
import com.jxhspace.investment.analysis.entity.FundpriceRecordsEntity;
import com.jxhspace.investment.analysis.entity.InvestentRecordsEntity;
import com.jxhspace.investment.analysis.entity.ManagerinfoEntity;
import com.jxhspace.investment.analysis.service.InvestmentService;
import com.jxhspace.investment.base.service.BaseApiService;
import com.jxhspace.investment.base.vo.ResponseMsg;
import com.jxhspace.investment.base.vo.ResponsePageMsg;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/api/investment/")
@Api(tags = "Operate Investment Records Information")
/**
 * -Operate Investment Records Information!
 * 
 * @author F1680488
 * @date 2020/6/13 10:47:15
 *
 */
public class InvestmentController extends BaseApiService {

	/**
	 * -服務接口實例化
	 */

	/* INVESTMENT_RECORDS */
	@Autowired
	private InvestmentService investmentService;

	@PostMapping("dealdatasingle")
	@ApiOperation(value = "Deal With Single Rows Data")
	@ApiImplicitParam(dataType = "InvestentRecordsEntity", name = "para", value = "INVESTMENT_RECORDS Base-Information", required = false)
	public ResponseMsg DealDataSingle(@RequestBody InvestentRecordsEntity para) {
		List<InvestentRecordsEntity> paraList = new ArrayList<InvestentRecordsEntity>();
		paraList.add(para);
		ResponseMsg msg = DealData(paraList);
		return msg;
	}

	@PostMapping("dealdata")
	@ApiOperation(value = "Deal with the Data")
	@ApiImplicitParam(dataType = "InvestentRecordsEntity", name = "para", value = "INVESTMENT_RECORDS Base-Information", required = false)
	public ResponseMsg DealData(@RequestBody List<InvestentRecordsEntity> para) {
		ResponseMsg msg = investmentService.DealData(para);
		return msg;
	}

	@PostMapping("queryhistory")
	@ApiOperation(value = "Query History Investment Data")
	@ApiImplicitParam(dataType = "InvestmentParaDTO", name = "para", value = "InvestmentParaDTO Parameter Informations", required = false)
	public ResponsePageMsg queryHistory(@RequestBody InvestmentParaDTO para) {
		ResponsePageMsg msg = investmentService.queryHistory(para);
		return msg;
	}

	@PostMapping("dealdatadel")
	@ApiOperation(value = "Delete Records")
	@ApiImplicitParam(dataType = "String", name = "idList", value = "Records Collection", required = false)
	public ResponseMsg DealDataDel(@RequestBody DelParaDTO idList) {
		ResponseMsg msg = investmentService.DealDataDel(idList);
		return msg;
	}

	/* FUNDBASEINFO */

	@PostMapping("dealdatafundinfo")
	@ApiOperation(value = "Deal with fundbaseinfo data")
	@ApiImplicitParam(dataType = "FundBaseinfoEntity", name = "para", value = "Fund informaions list!", required = false)
	public ResponseMsg DealDataFundInfo(@RequestBody List<FundBaseinfoEntity> para) {
		ResponseMsg msg = investmentService.DealDataFundInfo(para);
		return msg;
	}

	@PostMapping("queryfundinfo")
	@ApiOperation(value = "Query fundbaseinfo data")
	@ApiImplicitParam(dataType = "FundBaseinfoEntity", name = "para", value = "Fund informaions!", required = false)
	public ResponseMsg QueryFundInfo(FundBaseinfoEntity para) {
		ResponseMsg msg = investmentService.QueryFundInfo(para);
		return msg;
	}

	/* FUNDPRICE_RECORDS */

	@PostMapping("dealdatafundprice")
	@ApiOperation(value = "Deal with fundbaseprice data")
	@ApiImplicitParam(dataType = "FundpriceRecordsEntity", name = "para", value = "Fundprice informaions list!", required = false)
	public ResponseMsg DealDataFundPrice(@RequestBody List<FundpriceRecordsEntity> para) {
		ResponseMsg msg = investmentService.DealDataFundPrice(para);
		return msg;
	}

	@PostMapping("queryfundprice")
	@ApiOperation(value = "Query fundbaseprice data")
	@ApiImplicitParam(dataType = "FundpriceRecordsEntity", name = "para", value = "Fundprice informaions!", required = false)
	public ResponseMsg QueryFundPrice(FundpriceRecordsEntity para) {
		ResponseMsg msg = investmentService.QueryFundPrice(para);
		return msg;
	}

	/* MANAGERINFO */

	@PostMapping("dealdatamanager")
	@ApiOperation(value = "Deal with manager data")
	@ApiImplicitParam(dataType = "ManagerinfoEntity", name = "para", value = "Manager informaions list!", required = false)
	public ResponseMsg DealDataManager(@RequestBody List<ManagerinfoEntity> para) {
		ResponseMsg msg = investmentService.DealDataManager(para);
		return msg;
	}

	@PostMapping("querymanager")
	@ApiOperation(value = "Query manager data")
	@ApiImplicitParam(dataType = "ManagerinfoEntity", name = "para", value = "Manager informaions!", required = false)
	public ResponseMsg QueryManager(ManagerinfoEntity para) {
		ResponseMsg msg = investmentService.QueryManager(para);
		return msg;
	}
}

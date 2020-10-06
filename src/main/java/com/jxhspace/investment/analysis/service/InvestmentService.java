package com.jxhspace.investment.analysis.service;

import java.util.List;

import com.jxhspace.investment.analysis.dto.DelParaDTO;
import com.jxhspace.investment.analysis.dto.InvestmentParaDTO;
import com.jxhspace.investment.analysis.entity.FundBaseinfoEntity;
import com.jxhspace.investment.analysis.entity.FundpriceRecordsEntity;
import com.jxhspace.investment.analysis.entity.InvestentRecordsEntity;
import com.jxhspace.investment.analysis.entity.ManagerinfoEntity;
import com.jxhspace.investment.base.vo.ResponseMsg;
import com.jxhspace.investment.base.vo.ResponsePageMsg;

public interface InvestmentService {

	/* -INVESTMENT_RECORDS- */
	// Deal Data
	ResponseMsg DealData(List<InvestentRecordsEntity> para);

	// Delete Records
	ResponseMsg DealDataDel(DelParaDTO idList);

	// Query History Investment Data
	ResponsePageMsg queryHistory(InvestmentParaDTO para);

	/* -FUNDBASEINFO- */
	// Deal with Fundbaseinfo data
	ResponseMsg DealDataFundInfo(List<FundBaseinfoEntity> para);

	// Query Fundbaseinfo data
	ResponseMsg QueryFundInfo(FundBaseinfoEntity para);

	/* -FUNDPRICE_RECORDS- */
	// Deal with Fundbaseinfo data
	ResponseMsg DealDataFundPrice(List<FundpriceRecordsEntity> para);

	// Query Fundbaseprice data
	ResponseMsg QueryFundPrice(FundpriceRecordsEntity para);

	/* -MANAGERINFO- */
	// Deal with manager data
	ResponseMsg DealDataManager(List<ManagerinfoEntity> para);

	// Query manager data
	ResponseMsg QueryManager(ManagerinfoEntity para);

}

package com.jxhspace.investment.analysis.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.jxhspace.investment.analysis.dto.InvestmentParaDTO;
import com.jxhspace.investment.analysis.entity.FundBaseinfoEntity;
import com.jxhspace.investment.analysis.entity.FundpriceRecordsEntity;
import com.jxhspace.investment.analysis.entity.InvestentRecordsEntity;
import com.jxhspace.investment.analysis.entity.ManagerinfoEntity;

public interface InvestmentDAO extends BaseMapper<InvestentRecordsEntity> {

	/* -INVESTMENT_RECORDS- */
	// Deal Data(Insert)
	Integer DealDataInsert(InvestentRecordsEntity para);

	// Deal Data(Update)
	Integer DealDataUpdate(InvestentRecordsEntity para);

	// Deal Data(Delete)
	Integer DealDataDel(@Param("idList") List<String> idList);

	// Query History Investment Data
	List<InvestentRecordsEntity> queryHistory(InvestmentParaDTO para);

	/* -FUNDBASEINFO- */
	// Insert Fundbaseinfo data
	Integer insertFundInfo(FundBaseinfoEntity para);

	// Update Fundbaseinfo data
	Integer updateFundInfo(FundBaseinfoEntity para);

	// Delete Fundbaseinfo data
	Integer deleteFundInfo(FundBaseinfoEntity para);

	// Query Fundbaseinfo data
	List<FundBaseinfoEntity> queryFundInfo(FundBaseinfoEntity para);

	/* -FUNDPRICE_RECORDS- */

	// Update Fundbaseinfo data
	Integer updateFundPrice(FundpriceRecordsEntity para);

	// Query Fundbaseinfo data
	List<FundpriceRecordsEntity> queryFundPrice(FundpriceRecordsEntity para);

	/* -MANAGERINFO- */
	// Insert Manager data
	Integer insertManager(ManagerinfoEntity para);

	// Update Fundbaseinfo data
	Integer updateManager(ManagerinfoEntity para);

	// Delete Fundbaseinfo data
	Integer deleteManager(ManagerinfoEntity para);

	// Query Fundbaseinfo data
	List<ManagerinfoEntity> queryManager(ManagerinfoEntity para);
}

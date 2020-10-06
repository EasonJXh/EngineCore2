package com.jxhspace.investment.analysis.service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jxhspace.investment.analysis.dao.InvestmentDAO;
import com.jxhspace.investment.analysis.dto.DelParaDTO;
import com.jxhspace.investment.analysis.dto.InvestmentParaDTO;
import com.jxhspace.investment.analysis.entity.FundBaseinfoEntity;
import com.jxhspace.investment.analysis.entity.FundpriceRecordsEntity;
import com.jxhspace.investment.analysis.entity.InvestentRecordsEntity;
import com.jxhspace.investment.analysis.entity.ManagerinfoEntity;
import com.jxhspace.investment.analysis.service.InvestmentService;
import com.jxhspace.investment.base.service.BaseApiService;
import com.jxhspace.investment.base.utils.PageModel;
import com.jxhspace.investment.base.vo.ResponseMsg;
import com.jxhspace.investment.base.vo.ResponsePageMsg;

@Service
/**
 * -Deal Data 服務實現層
 * 
 * @author F1680488
 *
 */
public class InvestmentServiceImpl extends BaseApiService implements InvestmentService {

	/**
	 * DAO層接口實例化
	 */
	@Autowired
	private InvestmentDAO investmentDAO;

	/* -INVESTMENT_RECORDS- */

	/**
	 * -Deal Data
	 */
	@Override
	@Transactional
	public ResponseMsg DealData(List<InvestentRecordsEntity> para) {
		Integer suNum = 0;
		for (InvestentRecordsEntity item : para) {
			// 根據前台傳遞id值是否為空判斷後端要做什麼操作
			String id = item.getId() == null ? null : item.getId();
			Integer num = 0;
			// 插入
			if (id == null || id == "") {
				num = investmentDAO.DealDataInsert(item);
			}
			// 更新
			else {
				num = investmentDAO.DealDataUpdate(item);
			}
			suNum += num;
		}
		return suNum < para.size() ? setResultError("數據處理失敗!") : setResultSuccess("OK");
	}

	/**
	 * -Delete Records
	 */
	@Override
	@Transactional
	public ResponseMsg DealDataDel(DelParaDTO idList) {
		List<String> idArrayList = idList.getIdList();
		Integer num = investmentDAO.DealDataDel(idArrayList);
		return num < 1 ? setResultNoResourcesError("No data is deleted or Operation is defeated")
				: setResultSuccess("OK");
	}

	/**
	 * -Query History Investment Data
	 */
	@Override
	public ResponsePageMsg queryHistory(InvestmentParaDTO para) {
		para.setStartRow(0);
		para.setEndRow(0);
		List<InvestentRecordsEntity> data = investmentDAO.queryHistory(para);

		Integer totalRow = data.size();
		Integer current = para.getCurrent();
		Integer pageSize = para.getPageSize();
		PageModel pm = new PageModel(totalRow, current, pageSize);

		Integer startRow = pm.getStartRow();
		Integer endRow = pm.getEndRow();
		para.setStartRow(startRow);
		para.setEndRow(endRow);
		data = investmentDAO.queryHistory(para);
		return setResultSuccessPageData(data, totalRow, pageSize, current);
	}

	/* -FUNDBASEINFO- */
	// Deal with Fundbaseinfo data
	@Override
	@Transactional
	public ResponseMsg DealDataFundInfo(List<FundBaseinfoEntity> para) {
		Integer suNum = 0;
		Integer num = 0;
		for (FundBaseinfoEntity item : para) {
			String otype = item.getOtype();
			if (otype == "insert") {
				num = investmentDAO.insertFundInfo(item);
			} else if (otype == "update") {
				num = investmentDAO.updateFundInfo(item);
			} else {
				num = investmentDAO.deleteFundInfo(item);
			}
			suNum += num;
		}
		return para.size() < suNum ? setResultError("Deal Error") : setResultSuccess("OK");
	}

	// Query Fundbaseinfo data
	@Override
	public ResponseMsg QueryFundInfo(FundBaseinfoEntity para) {
		List<FundBaseinfoEntity> data = investmentDAO.queryFundInfo(para);
		return data.size() < 1 ? setResultNoResourcesError("NULL") : setResultSuccessData(data);
	}

	/* -FUNDPRICE_RECORDS- */
	// Deal with Fundbaseprice data
	@Override
	public ResponseMsg DealDataFundPrice(List<FundpriceRecordsEntity> para) {
		Integer suNum = 0;
		Integer num = 0;
		for (FundpriceRecordsEntity item : para) {
			num = investmentDAO.updateFundPrice(item);
			suNum += num;
		}
		return para.size() < suNum ? setResultError("Deal Error") : setResultSuccess("OK");
	}

	// Query Fundbaseprice data
	@Override
	@Transactional
	public ResponseMsg QueryFundPrice(FundpriceRecordsEntity para) {
		List<FundpriceRecordsEntity> data = investmentDAO.queryFundPrice(para);
		return data.size() < 1 ? setResultNoResourcesError("NULL") : setResultSuccessData(data);
	}

	/* -MANAGERINFO- */
	// Deal with manager data
	@Override
	public ResponseMsg DealDataManager(List<ManagerinfoEntity> para) {
		Integer suNum = 0;
		Integer num = 0;
		for (ManagerinfoEntity item : para) {
			String otype = item.getOtype();
			if (otype == "insert") {
				num = investmentDAO.insertManager(item);
			} else if (otype == "update") {
				num = investmentDAO.updateManager(item);
			} else {
				num = investmentDAO.deleteManager(item);
			}
			suNum += num;
		}
		return para.size() < suNum ? setResultError("Deal Error") : setResultSuccess("OK");
	}

	// Query manager data
	@Override
	public ResponseMsg QueryManager(ManagerinfoEntity para) {
		List<ManagerinfoEntity> data = investmentDAO.queryManager(para);
		return data.size() < 1 ? setResultNoResourcesError("NULL") : setResultSuccessData(data);
	}
}

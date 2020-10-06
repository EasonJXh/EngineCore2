package com.jxhspace.investment.analysis.service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jxhspace.investment.analysis.dao.ReportDAO;
import com.jxhspace.investment.analysis.dto.ComDetailDTO;
import com.jxhspace.investment.analysis.service.ReportService;
import com.jxhspace.investment.base.dto.TextValueDTO;
import com.jxhspace.investment.base.service.BaseApiService;
import com.jxhspace.investment.base.vo.ResponseMsg;

@Service
/**
 * -Report Analysis-Data Show
 * 
 * @author F1680488
 * @date 2020/6/18 15:26:15
 */
public class ReportServiceImpl extends BaseApiService implements ReportService {

	/**
	 * -DAO層接口實例化
	 */
	@Autowired
	private ReportDAO reportDAO;

	@Override
	// Report Analysis-Data Show
	public ResponseMsg transDetailQuery(ComDetailDTO para) {
		List<ComDetailDTO> data = reportDAO.transDetailQuery(para);
		return data.size() < 1 ? setResultNoResourcesError("NULL") : setResultSuccessData(data);
	}

	// Get Fundcode List
	@Override
	public List<TextValueDTO> getFundCode(String industry) {
		List<TextValueDTO> data = reportDAO.getFundCode(industry);
		return data;
	}

	// Get Type List
	@Override
	public ResponseMsg getFtype() {
		List<TextValueDTO> data = reportDAO.getFtype();
		return setResultSuccessData(data);
	}

	// Get Manager List
	@Override
	public ResponseMsg getManager() {
		List<TextValueDTO> data = reportDAO.getManager();
		return setResultSuccessData(data);
	}
}

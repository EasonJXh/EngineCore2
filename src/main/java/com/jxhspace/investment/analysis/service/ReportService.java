package com.jxhspace.investment.analysis.service;

import java.util.List;

import com.jxhspace.investment.analysis.dto.ComDetailDTO;
import com.jxhspace.investment.base.dto.TextValueDTO;
import com.jxhspace.investment.base.vo.ResponseMsg;

public interface ReportService {

	// Report Analysis-Data Show
	ResponseMsg transDetailQuery(ComDetailDTO para);

	// Get Fundcode List
	List<TextValueDTO> getFundCode(String industry);

	// Get Type List
	ResponseMsg getFtype();

	// Get Manager List
	ResponseMsg getManager();
}

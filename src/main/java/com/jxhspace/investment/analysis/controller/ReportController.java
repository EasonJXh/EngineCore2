package com.jxhspace.investment.analysis.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jxhspace.investment.analysis.dto.ComDetailDTO;
import com.jxhspace.investment.analysis.service.ReportService;
import com.jxhspace.investment.base.dto.TextValueDTO;
import com.jxhspace.investment.base.service.BaseApiService;
import com.jxhspace.investment.base.vo.ResponseMsg;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;

/**
 * -Report Data Show
 * 
 * @author F1680488
 * @date: 2020/6/17 16:56:23
 */
@RestController
@RequestMapping("api/report/")
@Api(tags = "Report Analysis-Data Show")
public class ReportController extends BaseApiService {

	/**
	 * -服務接口實例化
	 */
	@Autowired
	private ReportService reportService;

	@PostMapping("transdetailquery")
	@ApiOperation(value = "Query Comprehensive Trans-Data")
	@ApiImplicitParam(dataType = "ComDetailDTO", name = "para", value = "綜合參數模型", required = false)
	public ResponseMsg transDetailQuery(@RequestBody ComDetailDTO para) {
		ResponseMsg msg = reportService.transDetailQuery(para);
		return msg;
	}

	@GetMapping("getfundcode")
	@ApiOperation(value = "Get Fundcode List")
	@ApiImplicitParam(dataType = "String", name = "industry", value = "行業", required = false)
	public List<TextValueDTO> getFundCode(String industry) {
		List<TextValueDTO> msg = reportService.getFundCode(industry);
		return msg;
	}

	@GetMapping("getftype")
	@ApiOperation(value = "Get Ftype List")
	public ResponseMsg getFtype() {
		ResponseMsg msg = reportService.getFtype();
		return msg;
	}

	@GetMapping("getmanager")
	@ApiOperation(value = "Get Manager List")
	public ResponseMsg getManager() {
		ResponseMsg msg = reportService.getManager();
		return msg;
	}

}

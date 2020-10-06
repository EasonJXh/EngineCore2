package com.jxhspace.investment.analysis.dto;

import java.util.List;

import com.jxhspace.investment.base.dto.TextValueDTO;

import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiOperation;
import lombok.Data;

@Data
@ApiOperation(value = "圖表數據展示結果匯總model")
public class ChartShowModelDTO {

	@ApiModelProperty(name = "realTimeData", value = "第一個模塊展示數據", required = false)
	private List<RealTimeDataDTO> realTimeData;

	@ApiModelProperty(name = "srateData", value = "第二模塊第一個圖表數據", required = false)
	private List<RateDTO> srateData;

	@ApiModelProperty(name = "amountTopData", value = "第二模塊第二個圖表數據", required = false)
	private List<RateDTO> amountTopData;

	@ApiModelProperty(name = "classTypeData", value = "第二模塊第三個圖表數據", required = false)
	private List<RateDTO> classTypeData;

	@ApiModelProperty(name = "classIncomeData", value = "第二模塊第四個圖表數據", required = false)
	private List<RateDTO> classIncomeData;

	@ApiModelProperty(name = "varianceData", value = "第三模塊第一個圖表數據", required = false)
	private List<RateDTO> varianceData;

	@ApiModelProperty(name = "holdData", value = "第三模塊第二個圖表數據", required = false)
	private List<RateDTO> holdData;

	@ApiModelProperty(name = "priceTrendData", value = "第三模塊第三個圖表數據", required = false)
	private List<PriceTrendDTO> priceTrendData;

	@ApiModelProperty(name = "incomeTrendData", value = "第三模塊第四個圖表數據", required = false)
	private List<PriceTrendDTO> incomeTrendData;

	@ApiModelProperty(name = "recentOperateData", value = "頂部模塊數據", required = false)
	private List<PriceTrendDTO> recentOperateData;

	@ApiModelProperty(name = "industryListData", value = "下拉框行業信息", required = false)
	private List<TextValueDTO> industryListData;

	@ApiModelProperty(name = "lastDateData", value = "最近日期各項明細數據", required = false)
	private List<RateDTO> lastDateData;

	@ApiModelProperty(name = "monthDetailsData", value = "每月各項數據明細查看", required = false)
	private List<RateDTO> monthDetailsData;

	@ApiModelProperty(name = "lastDateFundcodeData", value = "最近日期每項收益佔比", required = false)
	private List<RateDTO> lastDateFundcodeData;

	@ApiModelProperty(name = "indexData", value = "指數數據", required = false)
	private List<PriceTrendDTO> indexData;

	@ApiModelProperty(name = "centerAnalysisData", value = "中心圓盤分析數據", required = false)
	private CenterDataDTO centerAnalysisData;

}

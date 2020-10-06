package com.jxhspace.investment.analysis.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.jxhspace.investment.analysis.dto.ComDetailDTO;
import com.jxhspace.investment.base.dto.TextValueDTO;

public interface ReportDAO extends BaseMapper<ComDetailDTO> {

	// Report Analysis-Data Show
	List<ComDetailDTO> transDetailQuery(ComDetailDTO para);

	// Get Fundcode List
	List<TextValueDTO> getFundCode(@Param("industry") String industry);

	// Get Type List
	List<TextValueDTO> getFtype();

	// Get Manager List
	List<TextValueDTO> getManager();

}

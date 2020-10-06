package com.jxhspace.investment.base.dto;

import lombok.Data;

/**
 * @className ItemModelDTO
 * @Description 下拉菜单选项公用model
 * @author F1680488
 * @Date: 2020/5/4
 */
@Data
public class TextValueDTO {

	/** 选项页面显示内容 **/
	private String Text;

	/** 每个选项对应传给后台的值 **/
	private String Value;
}

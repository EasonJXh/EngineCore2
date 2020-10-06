package com.jxhspace.investment.base.utils;

public class PageModel {

	// 总条目数
	private Integer totalRow;
	// 总页码
	private Integer totalPage;
	// 当前页码(默認第1頁)
	private Integer page = 1;
	// 每页条目数(默認2條)
	private Integer pageSize = 10;
	// 分頁數據
	private Object data;

	public Integer getStartRow() {
		return (page - 1) * pageSize + 1;
	}

	public Integer getEndRow() {
		return page * pageSize;
	}

	/**
	 * 构造中传入总条目数
	 * 
	 * @param totalRow  总条目数
	 * @param pageIndex 当前页码数
	 * @param pageSize  每頁條目數
	 */
	public PageModel(Integer totalRow, Integer page, Integer pageSize) {
		this.totalRow = totalRow;
		if (!MySystemUtil.isAnyEmpty(pageSize) && pageSize > 0)
			this.pageSize = pageSize;
		if (!MySystemUtil.isAnyEmpty(page) && page > 0)
			this.page = page < getTotalPage() ? page : getTotalPage() > 0 ? getTotalPage() : 1;
	}

	public void setTotalRow(Integer totalRow) {
		this.totalRow = totalRow;
	}

	public Integer getTotalRow() {
		return totalRow;
	}

	public Integer getTotalPage() {
		totalPage = totalRow % pageSize == 0 ? totalRow / pageSize : totalRow / pageSize + 1;
		return totalPage;
	}

	public Integer getPage() {
		return page;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	@Override
	public String toString() {
		return "PageModel [totalRow=" + totalRow + ", totalPage=" + totalPage + ", page=" + page + ", pageSize="
				+ pageSize + ", data=" + data + "]";
	}
}

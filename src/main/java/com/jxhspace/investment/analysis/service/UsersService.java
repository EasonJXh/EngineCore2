package com.jxhspace.investment.analysis.service;

import com.jxhspace.investment.analysis.entity.SysUserEntity;
import com.jxhspace.investment.analysis.vo.RegisterResultVO;

public interface UsersService {
	/* 1.Register New User */
	RegisterResultVO registerUser(SysUserEntity para);

	/* 2.User login */
	RegisterResultVO login(SysUserEntity para);

}

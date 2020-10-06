package com.jxhspace.investment.analysis.dao;

import java.util.List;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.jxhspace.investment.analysis.entity.SysUserEntity;

public interface UsersDAO extends BaseMapper<SysUserEntity> {

	/* 1.Register New User */
	Integer registerUser(SysUserEntity para);

	/* 2.User login */
	List<SysUserEntity> login(SysUserEntity para);
}

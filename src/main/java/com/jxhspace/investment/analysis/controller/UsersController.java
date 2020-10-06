package com.jxhspace.investment.analysis.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jxhspace.investment.analysis.entity.SysUserEntity;
import com.jxhspace.investment.analysis.service.UsersService;
import com.jxhspace.investment.analysis.vo.RegisterResultVO;
import com.jxhspace.investment.base.service.BaseApiService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(tags = "涉及用戶相關接口")
@RequestMapping("api/users")
/**
 * -用戶相關接口
 * 
 * @author F1680488
 * @Date 2020/8/31 16:28:45
 *
 */
public class UsersController extends BaseApiService {

	/**
	 * -服務層接口實例化
	 */
	@Autowired
	private UsersService usersService;

	@PostMapping("registeruser")
	@ApiImplicitParam(dataType = "SysUserEntity", name = "para", value = "用戶信息模型", required = false)
	@ApiOperation(value = "Register New User")
	public RegisterResultVO registerUser(@RequestBody SysUserEntity para) {
		RegisterResultVO data = new RegisterResultVO();
		data = usersService.registerUser(para);
		return data;
	}

	@PostMapping("login")
	@ApiImplicitParam(dataType = "SysUserEntity", name = "para", value = "用戶信息模型", required = false)
	@ApiOperation(value = "User login")
	public RegisterResultVO login(@RequestBody SysUserEntity para) {
		RegisterResultVO data = new RegisterResultVO();
		data = usersService.login(para);
		return data;
	}
}

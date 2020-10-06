package com.jxhspace.investment.analysis.service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import com.jxhspace.investment.analysis.dao.UsersDAO;
import com.jxhspace.investment.analysis.entity.SysUserEntity;
import com.jxhspace.investment.analysis.service.UsersService;
import com.jxhspace.investment.analysis.vo.RegisterResultVO;
import com.jxhspace.investment.base.service.BaseApiService;

@Service
public class UserServiceImpl extends BaseApiService implements UsersService {

	/**
	 * -接口實例化
	 */
	@Autowired
	private UsersDAO usersDAO;

	/* 1.Register New User */
	@Override
	public RegisterResultVO registerUser(SysUserEntity para) {
		RegisterResultVO e = new RegisterResultVO();

		String password = DigestUtils.md5DigestAsHex(para.getPassword().getBytes());
		para.setPassword(password);
		String name = "星探者";
		para.setName(name);
		String bornDate = "1995/01/01";
		para.setBorndate(bornDate);

		Integer isSuccess = usersDAO.registerUser(para);
		if (isSuccess > 0) {
			e.setStatus("ok");
			e.setCurrentAuthority("user");
		}
		else {
			e.setStatus("error");
		}

		return e;
	}

	/* 2.User login */
	@Override
	public RegisterResultVO login(SysUserEntity para) {
		RegisterResultVO e = new RegisterResultVO();
		String password = DigestUtils.md5DigestAsHex(para.getPassword().getBytes());
		para.setPassword(password);
		
		String userName = para.getUserName();
		if (userName.contains("@")) {
			para.setEmail(userName);
		} else {
			para.setTel(userName);
		}

		para.setPassword(password);

		List<SysUserEntity> data = usersDAO.login(para);
		if (data.size() > 0) {
			e.setStatus("ok");
			e.setCurrentAuthority("user");
			e.setType("account");
			e.setMsg("登錄成功,歡迎:" + data.get(0).getName());
		} else {
			e.setStatus("error");
			e.setType("account");
			e.setMsg("賬號錯誤或密碼錯誤,請檢查!");
		}
		return e;
	}
}

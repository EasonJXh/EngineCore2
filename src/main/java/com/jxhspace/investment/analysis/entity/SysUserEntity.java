package com.jxhspace.investment.analysis.entity;

import java.io.Serializable;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel(description = "SYS_USER")
/**
 * -USERS TABLE
 * 
 * @author F1680488
 *
 */
public class SysUserEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@TableId
	@ApiModelProperty(value = "userid", example = "12", required = false)
	private String userid;

	@ApiModelProperty(value = "tel", example = "**********", required = true)
	private String tel;

	@ApiModelProperty(value = "password", example = "******", required = true)
	private String password;

	@ApiModelProperty(value = "name", example = "Xiaonan", required = false)
	private String name;

	@ApiModelProperty(value = "sex", example = "female", required = false)
	private String sex;

	@ApiModelProperty(value = "borndate", example = "1998/01/01", required = false)
	private String borndate;

	@ApiModelProperty(value = "email", example = "******@email.com", required = true)
	private String email;

	@ApiModelProperty(value = "education", example = "Doctor", required = false)
	private String education;

	@ApiModelProperty(value = "school", example = "******", required = false)
	private String school;

	@ApiModelProperty(value = "memo", example = "", required = false)
	private String memo;

	@TableField(exist = false)
	@ApiModelProperty(value = "userName", example = "userName", required = false)
	private String userName;

}

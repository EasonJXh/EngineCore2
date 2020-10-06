package com.jxhspace.investment.base.utils;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.lang.reflect.Field;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;
import java.util.UUID;
import javax.imageio.ImageIO;
import org.springframework.util.StringUtils;

public class MySystemUtil {

	public static final String regexS = "^\\d+$";
	public final static String yyyy_MM_dd = "yyyy-MM-dd";
	public final static String HH_mm_ss = "HH:mm:ss";
	public final static String yyyy_MM_dd_HH_mm_ss = "yyyy-MM-dd HH:mm:ss";

	/**
	 * 字符串 防止空 包括空格之類的
	 * 
	 * @param str
	 * @return
	 */
	public static boolean isBlank(String str) {
		int strLen;
		if (str != null && (strLen = str.length()) != 0) {
			for (int i = 0; i < strLen; ++i) {
				if (!Character.isWhitespace(str.charAt(i))) {
					return false;
				}
			}
			return true;
		} else {
			return true;
		}
	}

	/**
	 * 將list類型轉換為帶引號的字符串類型
	 * 
	 * @author F1680488
	 * @date 2020/5/26
	 * @param iList
	 * @return {X,Y}--->('X','Y')
	 */
	public static String trsListToString(List<String> iList) {
		String result = null;
		if (iList.isEmpty()) {
			return null;
		} else {
			for (String item : iList) {
				if (result == null) {
					result = "'" + item + "'";
				} else {
					result += ",'" + item + "'";
				}
			}
			result = "(" + result + ")";
			return result;
		}
	}

	/**
	 * 判断字符串是否为空
	 * 
	 * @param string
	 * @return
	 */
	public static boolean isStrEmpty(String string) {
		boolean flag = false;
		if (string == null || string.length() < 1) {
			flag = true;
		}
		return flag;
	}

	/**
	 * 字符串转换为 日期格式
	 * 
	 * @param str
	 * @return
	 */
	public static Date StrToDate(String str, String pattern) {
		SimpleDateFormat format = null;
		Date date = null;
		if (isStrEmpty(pattern)) {
			format = new SimpleDateFormat(yyyy_MM_dd_HH_mm_ss);
		} else {
			format = new SimpleDateFormat(pattern);
		}
		try {
			date = format.parse(str);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date;
	}

	/**
	 * 字符串转换为 日期格式 yyyy-MM-dd HH-mm-ss
	 * 
	 * @return
	 */
	public static Date StrToDate(String str) {
		SimpleDateFormat format = null;
		Date date = null;
		format = new SimpleDateFormat(yyyy_MM_dd_HH_mm_ss);
		try {
			date = format.parse(str);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date;
	}

	/**
	 * date 转换字符串 成日期格式
	 * 
	 * @param date    源日期
	 * @param pattern 格式
	 * @return
	 */
	public static String DateToStr(Date date, String pattern) {
		SimpleDateFormat format = null;
		if (isStrEmpty(pattern)) {
			format = new SimpleDateFormat(yyyy_MM_dd_HH_mm_ss);
		} else {
			format = new SimpleDateFormat(pattern);
		}
		String str = format.format(date);
		return str;
	}

	/**
	 * 计算相差天数 计算二个时间间隔天数，保留整数
	 * 
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	public static int daysBetween(Date startDate, Date endDate) {
		Date date1 = startDate;
		Date date2 = endDate;
		Calendar cal = Calendar.getInstance();
		cal.setTime(date1);
		long time1 = cal.getTimeInMillis();
		cal.setTime(date2);
		long time2 = cal.getTimeInMillis();
		long between_days = (time2 - time1) / (1000 * 3600 * 24);
		Integer count = Integer.parseInt(String.valueOf(between_days));
		if (count < 1) {
			count = 1;
		}
		return count;
	}

	/**
	 * 计算相差天数 计算二个时间间隔天数，保留一位小数
	 * 
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	public static String getQuot(Date startDate, Date endDate) {
		String retQuot = "";
		try {
			long timeout = endDate.getTime() - startDate.getTime();
			double quot = 0.0;
			quot = ((double) timeout) / 1000 / 60 / 60 / 24;

			DecimalFormat formater = new DecimalFormat();
			formater.setMaximumFractionDigits(1);
			formater.setGroupingSize(0);
			formater.setRoundingMode(RoundingMode.FLOOR);
			retQuot = formater.format(quot);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return retQuot;
	}

	/**
	 * 将日期向后延长
	 * 
	 * @param sourceDate 源日期
	 * @param number     延长几天
	 * @return
	 */
	public static Date getAtDateAfter(Date sourceDate, Integer number) {
		Date result;
		Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("GMT+8"));
		calendar.setTime(sourceDate);
		calendar.add(Calendar.DATE, number);
		result = calendar.getTime();
		return result;
	}

	/**
	 * 将日期向后延长
	 * 
	 * @param sourceDate 源日期
	 * @param number     延长几天
	 * @return
	 */
	public static Date getAtDateAfterToDay(Date sourceDate, Integer number) {
		Date atDateAfter = getAtDateAfter(sourceDate, number);
		String s = MySystemUtil.DateToStr(atDateAfter, MySystemUtil.yyyy_MM_dd_HH_mm_ss);
		return MySystemUtil.StrToDate(s, yyyy_MM_dd);
	}

	/**
	 * 获取时间 yyyy-MM-dd 转换为固定分秒
	 * 
	 * @param date
	 * @param ss
	 * @return
	 */
	public static Date getToDateSS(Date date, String ss) {
		String newDateStr = MySystemUtil.DateToStr(date, yyyy_MM_dd);
		Date _time = MySystemUtil.StrToDate(newDateStr + ss, yyyy_MM_dd_HH_mm_ss);
		return _time;
	}

	/**
	 * 判断字符串 是否是纯数字组成
	 * 
	 * @param str
	 * @return
	 */
	public static boolean isNumerString(String str) {
		return str.matches(regexS);
	}

	/**
	 * 时间比较器
	 * 
	 * @param source 比较源
	 * @param target 比较目标
	 * @param type   日期格式
	 * @return 0 表示相同 -1表示 在目标时间之内 1表示在目标时间之外
	 * @throws Exception
	 */
	public static int dateCompare(String source, String target, String type) {
		Integer ret;
		SimpleDateFormat format = new SimpleDateFormat(type);
		Date sourceDate = null;
		Date targetDate = null;
		try {
			sourceDate = format.parse(source);
			targetDate = format.parse(target);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		ret = sourceDate.compareTo(targetDate);
		return ret;
	}

	/**
	 * 将文件转换二进制
	 * 
	 * @param img
	 * @return
	 * @throws Exception
	 */
	public static byte[] fileToByte(File img) throws IOException {
		byte[] bytes = null;
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		try {
			BufferedImage bi;
			bi = ImageIO.read(img);
			ImageIO.write(bi, "png", baos);
			bytes = baos.toByteArray();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			baos.close();
		}
		return bytes;
	}

	/**
	 * 數組 對象 進行重組為字符串 進行 部門sql 注入
	 * 
	 * @param array
	 * @return ''xx' ,'xxx'
	 */
	public static String analysisArray(List<String> array) {
		if (array == null || array.size() < 1 || StringUtils.isEmpty(array.get(0))) {
			return null;
		}
		StringBuffer stringBuffer = new StringBuffer();
		for (int i = 0; i < array.size(); i++) {
			if (i == 0) {
				stringBuffer.append("'" + array.get(i) + "'");
				continue;
			}
			stringBuffer.append("," + "'" + array.get(i) + "'");
		}
		return stringBuffer.toString();
	}

	/** 转大写 **/
	private static char charToUpperCase(char ch) {
		if (ch <= 122 && ch >= 97) {
			ch -= 32;
		}
		return ch;
	}

	/**
	 * 轉大寫
	 * 
	 * @param str
	 * @return
	 */
	public static String toUpperCase(String str) {
		char[] ch = str.toCharArray();
		StringBuffer sbf = new StringBuffer();
		for (int i = 0; i < ch.length; i++) {
			sbf.append(charToUpperCase(ch[i]));
		}
		return sbf.toString();
	}

	// --------------------------------------------------------------------------------------------

	/**
	 * 判断对象是否为空(參數變長)(有一個為空則為true)
	 * 
	 * @author C3901094
	 * @date 2019年11月22日 上午11:39:29
	 * @param objs
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static Boolean isAnyEmpty(Object... objs) {
		if (objs == null || objs.length == 0)
			return true;
		for (Object obj : objs) {
			if (obj == null)
				return true;
			if (obj instanceof String && "".equals(((String) obj).trim()))
				return true;
			if (obj instanceof Collection && ((Collection) obj).isEmpty())
				return true;
			if (obj instanceof Map) {// 若為Map,則全為空才算空
				Map objMap = ((Map) obj);
				boolean flg = true;
				if (objMap.isEmpty())
					return true;
				for (Object item : objMap.values()) {// 判斷是否全為空
					if (!isAnyEmpty(item)) {
						flg = false;
						break;
					}
				}
				return flg;
			}
		}

		return false;
	}

	/**
	 * 判断对象中属性值是否全为空
	 * 
	 * @author C3901094
	 * @date 2019年11月22日 上午11:39:57
	 * @param object
	 * @return
	 */
	public static boolean innerFieldsAllEmpty(Object object) {
		if (null == object) {
			return true;
		}
		try {
			for (Field f : object.getClass().getDeclaredFields()) {
				f.setAccessible(true);// 开放私有字段
				// 字段名--f.getName();
				// 字段值--f.get(object);
				if (f.get(object) != null && !"".equals(f.get(object).toString())) {
					return false;
				}
			}
		} catch (SecurityException | IllegalArgumentException | IllegalAccessException e) {
			e.printStackTrace();
		}
		return true;
	}

	/**
	 * 判斷對象中存在空屬性值
	 * 
	 * @author C3901094
	 * @date 2019年11月22日 上午11:40:15
	 * @param object
	 * @return
	 */
	public static boolean existNullInnerField(Object object) {
		if (null == object) {
			return true;
		}
		try {
			for (Field f : object.getClass().getDeclaredFields()) {
				f.setAccessible(true);// 开放私有字段
				// 字段名--f.getName();
				// 字段值--f.get(object);
				if (f.get(object) == null || "".equals(f.get(object).toString())) {
					return true;
				}
			}
		} catch (SecurityException | IllegalArgumentException | IllegalAccessException e) {
			e.printStackTrace();
		}
		return false;
	}

	/**
	 * 生成UUID+4位隨機數(去除uuid中的"-"符号)
	 * 
	 * @author C3901094
	 * @date 2019年11月22日 上午11:41:39
	 * @return
	 */
	public static String createRandomId() {
		Integer rnd4bit = (int) Math.floor(Math.random() * 9000 + 1000);
		String id = UUID.randomUUID().toString().replaceAll("-", "").toUpperCase() + rnd4bit;
		return id;
	}

	/**
	 * 創建kappa考試編號
	 * 
	 * @author C3901094
	 * @date 2020年5月7日 上午10:06:45
	 * @param model 幾種
	 * @param part  品名
	 * @return
	 */
	public static String createKappaTestNo(String model, String part) {
		Integer rnd4bit = (int) Math.floor(Math.random() * 9000 + 1000);
		Calendar c = Calendar.getInstance();
		String year = String.valueOf(c.get(Calendar.YEAR));
		year = fillZeroBeforeForbits(year, 4).substring(2);
		String month = String.valueOf(c.get(Calendar.MONTH) + 1);
		month = fillZeroBeforeForbits(month, 2);
		String day = String.valueOf(c.get(Calendar.DAY_OF_MONTH));
		day = fillZeroBeforeForbits(day, 2);
		return model + part + year + month + day + rnd4bit;
	}

	/**
	 * 不足兩位用"0"填充與前
	 * 
	 * @author C3901094
	 * @date 2020年4月28日 上午11:32:20
	 * @return
	 */
	private static String fillZeroBeforeForbits(String str, Integer bits) {
		if (str.length() < bits) {
			int minusNum = bits - str.length();
			for (int i = 0; i < minusNum; i++) {
				str = "0" + str;
			}
		}
		return str;
	}

	/**
	 * -給定日期之初
	 * 
	 * @author C3901094
	 * @date 2020年5月4日 上午11:21:09
	 * @param date
	 * @return
	 */
	public static Date getDayStart(Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		c.set(Calendar.HOUR_OF_DAY, 0);
		c.set(Calendar.MINUTE, 0);
		c.set(Calendar.SECOND, 0);
		return c.getTime();
	}

	/**
	 * -給定日期之末
	 * 
	 * @author C3901094
	 * @date 2020年5月4日 上午11:21:09
	 * @param date
	 * @return
	 */
	public static Date getDayEnd(Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		c.set(Calendar.HOUR_OF_DAY, 23);
		c.set(Calendar.MINUTE, 59);
		c.set(Calendar.SECOND, 59);
		return c.getTime();
	}

}

package com.jxhspace.investment.base.utils;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.Set;
import java.util.TreeSet;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@SuppressWarnings("all")
public class ListUtil {

	private static Logger LOGGER = LoggerFactory.getLogger(ListUtil.class);

	/**
	 * 分组依据接口，用于集合分组时，获取分组 T为要groupBy属性是类型，这个返回值为要groupBy的属性值
	 */
	public interface GroupBy<T> {
		T groupBy(Object obj);
	}

	/**
	 * 通过属性对集合分组
	 * 
	 * @param colls
	 * @param gb
	 * @return extends Comparable<T>
	 */
	public static final <T, D> Map<T, List<D>> groupBy(Collection<D> colls, GroupBy<T> gb) {
		Map<T, List<D>> map = new HashMap<T, List<D>>();

		Iterator<D> iter = colls.iterator();

		while (iter.hasNext()) {
			D d = iter.next();
			T t = gb.groupBy(d);
			if (map.containsKey(t)) {
				map.get(t).add(d);
			} else {
				List<D> list = new ArrayList<D>();
				list.add(d);
				map.put(t, list);
			}
		}
		return map;
	}

	/**
	 * 通过属性名称对集合分组
	 * 
	 * @param colls
	 * @param fieldName为集合中对象的属性名称
	 * @return extends Comparable<T>
	 */
	public static final <T, D> Map<T, List<D>> groupBy(Collection<D> colls, String fieldName) {
		return groupBy(colls, new GroupBy<T>() {
			@Override
			public T groupBy(Object obj) {
				Object v = getFieldValueByName(obj, fieldName);
				return (T) v;
			}
		});
	}

	/**
	 * 通过属性对集合分组，并对blank(null 和“ ” )的数据进行合并
	 * 
	 * @param colls
	 * @param gb
	 * @return extends Comparable<T>
	 */
	public static final <T, D> Map<T, List<D>> groupByAndMergeBlank(Collection<D> colls, GroupBy<T> gb) {
		Map<T, List<D>> map = new HashMap<T, List<D>>();

		Iterator<D> iter = colls.iterator();

		while (iter.hasNext()) {
			D d = iter.next();
			T t = gb.groupBy(d);

			// merge blank and null
			if (t != null) {
				if ("String".equalsIgnoreCase(t.getClass().getSimpleName())) {

//                if(StringUtils.isBlank((CharSequence) t)){
//                    t=null;
//                }
					if ((CharSequence) t == null) {
						t = null;
					}
				}
			}

			if (map.containsKey(t)) {
				map.get(t).add(d);
			} else {
				List<D> list = new ArrayList<D>();
				list.add(d);
				map.put(t, list);
			}
		}
		return map;
	}

	/**
	 * 通过属性名称对集合分组
	 * 
	 * @param colls
	 * @param fieldName为集合中对象的属性名称
	 * @return extends Comparable<T>
	 */
	public static final <T, D> Map<T, List<D>> groupByAndMergeBlank(Collection<D> colls, String fieldName) {
		return groupByAndMergeBlank(colls, new GroupBy<T>() {
			@Override
			public T groupBy(Object obj) {
				Object v = getFieldValueByName(obj, fieldName);
				return (T) v;
			}
		});
}

	/**
	 * 通过属性名称对集合分组
	 * 
	 * @param colls
	 * @param fieldName为集合中对象的属性名称
	 * @return extends Comparable<T>
	 */
	@SuppressWarnings("unchecked")
	public static final <T, D> Map<T, Long> groupByAndCounts(Collection<D> colls, String fieldName) {
		Map<Object, List<D>> groupBy = groupBy(colls, fieldName);
		HashMap<T, Long> hashMap = new HashMap<>();

		for (Entry<Object, List<D>> entry : groupBy.entrySet()) {
			hashMap.put((T) entry.getKey(), (long) entry.getValue().size());
		}
		return hashMap;
	}

	/**
	 * @Desc : 例如：根据customer 分组，统计每个customer 的个数， 并且统计每个customer分组下的courier的数量(需要去重)
	 * @param colls
	 * @param firstfieldName
	 * @param afterGbFieldName
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static final <T, D> Map<T, String> groupByGroupByAndCounting(Collection<D> colls, String firstfieldName,
			String secondGbFieldName) {
		HashMap<T, String> hashMap = new HashMap<>();
		Map<Object, List<D>> firstGroupBy = groupByAndMergeBlank(colls, firstfieldName);

		for (Entry<Object, List<D>> entry : firstGroupBy.entrySet()) {
			TreeSet<Object> secondFieldSet = new TreeSet<Object>();
			List<D> firstfieldNamelist = entry.getValue();
			for (D d : firstfieldNamelist) {
				Object value = getFieldValueByName(d, secondGbFieldName);
				secondFieldSet.add(value);
			}
			hashMap.put((T) entry.getKey(), entry.getValue().size() + "," + secondFieldSet.size());
		}

		return hashMap;
	}

	/**
	 * @Desc:根据一个集合的filed, 去掉重复，并返回去重后改field 的集合 ,比如：List<User> 现在要提取 所有的user.name
	 * @param colls
	 * @param firstfieldName
	 * @param secondGbFieldName
	 * @return
	 */
	public static final <D> Set<D> DistinctByFiled(Collection<D> colls, String fieldName) {
		TreeSet<D> distinctSet = new TreeSet<D>();
		for (D d : colls) {
			Object value = getFieldValueByName(d, fieldName);
			distinctSet.add((D) value);
		}
		return distinctSet;
	}

	/**
	 * 通过属性名称对集合分组 添加合并 blank
	 * 
	 * @param colls
	 * @param fieldName为集合中对象的属性名称
	 * @return extends Comparable<T>
	 */
	public static final <T, D> Map<T, Long> groupByAndMergeBlankCounting(Collection<D> colls, String fieldName) {
		Map<Object, List<D>> groupBy = groupByAndMergeBlank(colls, fieldName);
		HashMap<T, Long> hashMap = new HashMap<>();
		for (Entry<Object, List<D>> entry : groupBy.entrySet()) {
			hashMap.put((T) entry.getKey(), (long) entry.getValue().size());
		}
		return hashMap;
	}

	/**
	 * 通过属性名称对集合分组 添加合并 blank 然后计数
	 * 
	 * @param colls
	 * @param fieldName为集合中对象的属性名称
	 * @return extends Comparable<T>
	 */
	public static final <T, D> Map<T, Long> groupByAndCounting(Collection<D> colls, String fieldName) {
		Map<Object, List<D>> groupBy = groupBy(colls, fieldName);
		HashMap<T, Long> hashMap = new HashMap<>();
		for (Entry<Object, List<D>> entry : groupBy.entrySet()) {
			hashMap.put((T) entry.getKey(), (long) entry.getValue().size());
		}
		// 合并对个空key '' ; ' ' ; null
		/**
		 * find all null key and sum those value
		 */
		Long totalNullSize = 0l;
		List<T> nullkeyList = new ArrayList<>();
		for (Entry<T, Long> entry : hashMap.entrySet()) {
			T key = entry.getKey();
			if (key == null) {
				totalNullSize = entry.getValue() + totalNullSize;
				nullkeyList.add(key);
			} else {
//                    if(StringUtils.isBlank(key.toString())){
//                        totalNullSize=entry.getValue()+totalNullSize;
//                        nullkeyList.add(key);
//                    }
				if (String.valueOf(key.toString()).isEmpty()) {
					totalNullSize = entry.getValue() + totalNullSize;
					nullkeyList.add(key);
				}
			}
		}
		/**
		 * remove all null
		 */
		for (T key : nullkeyList) {
			hashMap.remove(key);
		}

		if (totalNullSize != 0) {
			hashMap.put((T) (" "), totalNullSize);
		}

		return hashMap;
	}

	/**
	 * 根据属性名称获取属性值
	 */
	public static Object getFieldValueByName(Object o, String fieldName) {
		try {
			String firstLetter = fieldName.substring(0, 1).toUpperCase();
			String getter = "get" + firstLetter + fieldName.substring(1);
			Method method = o.getClass().getMethod(getter, new Class[] {});
			Object value = method.invoke(o, new Object[] {});
			return value;
		} catch (Exception e) {
			LOGGER.error(e.getMessage(), e);
			return null;
		}
	}

	/**
	 * 根据属性名称获取属性值 (获取long型)
	 */
	public static Long getFieldLongValueByName(Object o, String fieldName) {
		try {
			String firstLetter = fieldName.substring(0, 1).toUpperCase();
			String getter = "get" + firstLetter + fieldName.substring(1);
			Method method = o.getClass().getMethod(getter, new Class[] {});
			Long value = (Long) method.invoke(o, new Object[] {});
			return value;
		} catch (Exception e) {
			LOGGER.error(e.getMessage(), e);
			return null;
		}
	}

	/**
	 * 
	 * @param pojo
	 * @param fieldName
	 * @param value     just can be Integer(int) Double(double) Long(ong) Date
	 *                  String
	 */
	public static void setFieldValueByName(Object pojo, String fieldName, Object value) {
		try {
			String firstLetter = fieldName.substring(0, 1).toUpperCase();
			String seter = "set" + firstLetter + fieldName.substring(1);
			value = Optional.ofNullable(value).orElseGet(() -> new String("null"));
			String simpleName = value.getClass().getSimpleName();
			Class class1;
			switch (simpleName) {
			case "Integer":
				class1 = Integer.class;
				break;
			case "Double":
				class1 = Double.class;
				break;
			case "Long":
				class1 = Long.class;
				break;
			case "Date":
				class1 = Date.class;
				break;
			default:
				class1 = String.class;
				break;
			}
			Method setmethod = pojo.getClass().getMethod(seter, class1);
			setmethod.invoke(pojo, value);

		} catch (Exception e) {
			LOGGER.error(e.getMessage(), e);
		}
	}

	/**
	 * 通过属性名称对集合分组
	 * 
	 * @Desc:java 8 stream api, list 会过滤掉group by filed 的非空字段
	 * @param colls                集合必须为对象 eg: List<Employee>
	 * @param fieldName为集合中对象的属性名称 eg: Employee-->name
	 * @return extends Comparable<T>
	 */
	public static final <D> Map<Object, List<D>> groupByPro(Collection<D> colls, String fieldName) {

		// filter
//        List<D> filterlist = colls.parallelStream().filter(r->getFieldValueByName(r,fieldName)!=null).collect(Collectors.toList());
		colls.parallelStream().forEach(d -> {
			if (ListUtil.getFieldValueByName(d, fieldName) == null) {
				ListUtil.setFieldValueByName(d, fieldName, "null");
			}
		});
		// group by
		Map<Object, List<D>> collect = colls.stream()
				.collect(Collectors.groupingBy(r -> getFieldValueByName(r, fieldName)));
		return collect;
	}

	/**
	 * 通过属性名称对集合分组统计
	 * 
	 * @Desc:java 8 stream api, list 会过滤掉group by filed 的非空字段
	 * @param colls                集合必须为对象 eg: List<Employee>
	 * @param fieldName为集合中对象的属性名称 eg: Employee-->name
	 * @return extends Comparable<T>
	 */
	public static final <D> Map<Object, Long> groupByAndCount(Collection<D> colls, String fieldName) {

		// filter
		List<D> filterlist = colls.parallelStream().filter(r -> getFieldValueByName(r, fieldName) != null)
				.collect(Collectors.toList());
		// group by
		Map<Object, Long> collect = filterlist.parallelStream()
				.collect(Collectors.groupingBy(r -> getFieldValueByName(r, fieldName), Collectors.counting()));

		return collect;
	}

	/**
	 * 通过属性名称对集合分组统计求和
	 * 
	 * @Desc:java 8 stream api, list 会过滤掉group by filed 的非空字段
	 * @param colls            eg: List<Employee>
	 * @param groupByFieldName 根据那个字段分组
	 * @param sumFieldName     对那个字段进行求和
	 * @return extends Comparable<T>
	 */
	public static final <D> Map<Object, Long> groupByAndSum(Collection<D> colls, String groupByFieldName,
			String sumFieldName) {

		// filter
		List<D> filterlist = colls.parallelStream().filter(r -> getFieldValueByName(r, groupByFieldName) != null)
				.collect(Collectors.toList());
		// group by and sum

		Map<Object, Long> collect = filterlist.stream()
				.collect(Collectors.groupingBy(r -> getFieldValueByName(r, groupByFieldName),
						Collectors.summingLong(r -> getFieldLongValueByName(r, sumFieldName))));
		return collect;
	}

}
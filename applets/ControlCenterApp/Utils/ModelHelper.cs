using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using System.Reflection;
using System.IO;
using System.Xml.Serialization;
using System.Xml;

namespace ControlCenterApp.Utils
{
    public class ModelHelper
    {
        /// <summary>
        /// 判断类型是否是可空类型(泛型)
        /// </summary>
        /// <param name="pi">类型信息</param>
        /// <returns></returns>
        public static bool IsNullable(PropertyInfo pi)
        {
            return pi.PropertyType.IsGenericType && pi.PropertyType.GetGenericTypeDefinition() == typeof(Nullable<>);
        }

        /// <summary>
        /// 把表格转换成实体
        /// </summary>
        /// <typeparam name="T"></typeparam> 
        /// <param name="?"></param>
        /// <returns></returns>
        public static T ToModel<T>(DataRow dr) where T : new()
        {
            if (dr == null) return default(T);
            T model = new T();
            foreach (DataColumn dc in dr.Table.Columns)
            {
                PropertyInfo pi = model.GetType().GetProperty(dc.ColumnName.ToUpper());
                if (pi != null && pi.CanWrite && dr[dc.ColumnName] != null && dr[dc.ColumnName] != DBNull.Value)
                {
                    if (IsNullable(pi))
                    {
                        pi.SetValue(model, Convert.ChangeType(dr[dc.ColumnName], Nullable.GetUnderlyingType(pi.PropertyType)), null);
                    }
                    else
                    {
                        pi.SetValue(model, dr[dc.ColumnName], null);
                    }
                }
            }

            return model;
        }

        /// <summary>
        /// 把表格转换成指定的实体集合
        /// </summary>
        /// <typeparam name="T">指定的实体类</typeparam>
        /// <param name="dt">要转换的表格数据</param>
        /// <returns></returns>
        public static List<T> ToModelList<T>(DataTable dt) where T : new()
        {
            List<T> modelList = new List<T>();
            if (dt == null) return modelList;
            foreach (DataRow dr in dt.Rows)
            {
                T model = ToModel<T>(dr);
                modelList.Add(model);
            }
            return modelList;
        }

        /// <summary>
        /// 把实体转换成数据表
        /// </summary>
        /// <param name="modelList">实体列表</param>
        /// <returns></returns>
        public static DataTable ToDataTable<T>(List<T> modelList) where T : new()
        {
            DataTable dt = GetTableStruct<T>(modelList[0]);
            if (dt == null) return null;

            foreach (T model in modelList)
            {
                DataRow dr = dt.NewRow();
                ToDataRow<T>(model, dr);
                dt.Rows.Add(dr);
            }

            return dt;
        }

        /// <summary>
        /// 把实体转换成数据行
        /// </summary>
        /// <param name="model">实体</param>
        /// <param name="dr">预设的数据行结构</param>
        /// <returns></returns>
        public static DataRow ToDataRow<T>(T model, DataRow dr = null) where T : new()
        {
            if (dr == null)
            {
                DataTable dt = GetTableStruct<T>(model);
                dr = dt.NewRow();
            }

            foreach (PropertyInfo pi in model.GetType().GetProperties())
            {
                object obj = pi.GetValue(model, null);
                if (obj != null && obj != DBNull.Value)
                {
                    dr[pi.Name] = obj;
                }
            }

            return dr;
        }

        /// <summary>
        /// 根据类型获得表结构
        /// </summary>
        /// <param name="model">实体</param>
        /// <returns></returns>
        public static DataTable GetTableStruct<T>(T model) where T : new()
        {
            if (model == null) return null;

            DataTable dt = new DataTable(typeof(T).Name);
            foreach (PropertyInfo pi in model.GetType().GetProperties())
            {
                if (IsNullable(pi))
                {
                    dt.Columns.Add(new DataColumn(pi.Name, Nullable.GetUnderlyingType(pi.PropertyType)));
                }
                else
                {
                    dt.Columns.Add(new DataColumn(pi.Name, pi.PropertyType));
                }
            }

            return dt;
        }
        /// <summary>
        /// 把表格数据转换成Json字串
        /// </summary>
        /// <param name="dt">数据表</param>
        /// <returns></returns>
        public static string ToJson(DataTable dt)
        {
            if (dt == null || dt.Rows.Count == 0) return "[]";
            string jsonStr = "[";
            int rowindex = 0;
            foreach (DataRow row in dt.Rows)
            {
                if (rowindex > 0)
                {
                    jsonStr += ",";
                }
                else
                {
                    rowindex++;
                }
                jsonStr += "{";
                int colindex = 0;
                foreach (DataColumn column in dt.Columns)
                {
                    if (colindex > 0)
                    {
                        jsonStr += ",";
                    }
                    else
                    {
                        colindex++;
                    }
                    jsonStr += "\"" + column.ColumnName + "\":\"" + row[column.ColumnName].ToString().Replace("\r\n", "").Replace("\t", " ").Replace("\n", "").Replace("\"", "“").Replace("'", "‘").Replace("\\", "/") + "\"";
                }
                jsonStr += "}";
            }
            jsonStr += "]";
            return jsonStr;
        }

        /// <summary>
        /// 把XML字串轉換成實體
        /// </summary>
        /// <typeparam name="T">實體類名</typeparam>
        /// <param name="xml">XML字串</param>
        /// <param name="model">實體</param>
        /// <returns></returns>
        public static T XmlToModel<T>(string xml)
        {
            StringReader xmlReader = new StringReader(xml);
            XmlSerializer xmlSer = new XmlSerializer(typeof(T));
            return (T)xmlSer.Deserialize(xmlReader);
        }

        /// <summary>
        /// 把實體轉換成XML字串
        /// </summary>
        /// <typeparam name="T">實體類名</typeparam>
        /// <param name="model">實體</param>
        /// <returns></returns>
        public static string ModelToXml<T>(T model)
        {
            MemoryStream stream = new MemoryStream();
            XmlSerializer xmlSer = new XmlSerializer(typeof(T));
            xmlSer.Serialize(stream, model);

            stream.Position = 0;
            StreamReader sr = new StreamReader(stream);
            return sr.ReadToEnd();
        }

        /// <summary>
        /// 把XML字串檔轉換成TABLE
        /// </summary>
        /// <param name="xml">XML字串</param>
        /// <returns></returns>
        public static DataTable XmlToTable(string xml)
        {
            StringReader xmlReader = null;
            try
            {
                xmlReader = new StringReader(xml);
                DataSet ds = new DataSet();
                ds.ReadXml(xmlReader);
                return ds.Tables[0];
            }
            catch (Exception)
            {
                return null;
            }
            finally
            {
                if (xmlReader != null)
                {
                    xmlReader.Close();
                }
            }
        }

        /// <summary>
        /// 把Table轉換成XML
        /// </summary>
        /// <param name="dt">數據表</param>
        /// <returns></returns>
        public static string TableToXml(DataTable dt)
        {
            MemoryStream stream = null;
            XmlTextWriter writer = null;
            try
            {
                if (string.IsNullOrEmpty(dt.TableName))
                {
                    dt.TableName = "table";
                }
                stream = new MemoryStream();
                writer = new XmlTextWriter(stream, Encoding.UTF8);
                dt.WriteXml(writer);
                int count = (int)stream.Length;
                byte[] arr = new byte[count];
                stream.Seek(0, SeekOrigin.Begin);
                stream.Read(arr, 0, count);
                UTF8Encoding utf = new UTF8Encoding();
                string xml = utf.GetString(arr).Trim();
                xml = xml.Substring(18);
                xml = xml.Substring(0, xml.Length - 18);
                xml = "<root>" + xml + "</root>";
                return xml;
            }
            catch
            {
                return String.Empty;
            }
            finally
            {
                if (writer != null) writer.Close();
            }

        }
    }
}

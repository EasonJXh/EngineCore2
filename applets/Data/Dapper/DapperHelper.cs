using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using Oracle.ManagedDataAccess.Client;
using System.Configuration;
using Data.Provider;
using System.Data.Common;

namespace Data.Dapper
{
    /// <summary>
    /// 数据访问基础类(基于Oracle)
    /// </summary>
    public class DapperHelper
    {
        #region DB配置
        private static string _connStringName = "DefaultConn";        
        /// <summary>
        /// 给静态变量传值
        /// </summary>
        public static string connStringName
        {
            get {                
                return "data source=(DESCRIPTION=(ADDRESS=(PROTOCOL = TCP)(HOST = localhost)(PORT=1521))(CONNECT_DATA =(SERVER = DEDICATED)(SERVICE_NAME=jxhdata)));user id=jxh;password=Jxh.123456";
            }
        }

        private static OracleServerClient DBClient = new OracleServerClient();
        #endregion

        #region 執行增刪改操作
        /// <summary>
        /// 執行一條DML（可以不用事物），有超過一條DML操作的請用ExecuteSqls方法
        /// </summary>
        /// <param name="cmdText">sql語句</param>
        /// <param name="param">參數</param>
        /// <param name="connStringName">数据库连接字符串的名字</param>
        /// <returns>返回是否成功</returns>
        public static bool ExecuteSql(string cmdText, object param = null)
        {
            _connStringName = connStringName.ToString();
            using (IDbConnection conn = new OracleConnection(_connStringName))
            {
                try
                {
                    conn.Open();
                    return conn.Execute(cmdText, param, null, null, null) > 0;
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }
        }

        /// <summary>
        /// 批量執行DML SQL語句并實現事務
        /// </summary>
        /// <param name="sqlArray">sql數組</param>
        /// <param name="paramArray">參數數組(跟sql對應)</param>
        /// <param name="connStringName">数据库连接字符串的名字</param>
        /// <returns>是否執行成功</returns>
        public static bool ExecuteSqls(string[] sqlArray, object[] paramArray)
        {
            bool flag = false;
            _connStringName = connStringName;
            using (IDbConnection conn = new OracleConnection(_connStringName))
            {
                conn.Open();
                using (IDbTransaction transaction = conn.BeginTransaction())
                {
                    int total = 0;
                    try
                    {
                        if (sqlArray.Length == paramArray.Length && sqlArray.Length > 0)
                        {
                            for (int i = 0; i < sqlArray.Length; i++)
                            {
                                total += conn.Execute(sqlArray[i], paramArray[i], transaction, null, null);
                            }
                            transaction.Commit();
                            flag = total > 0;
                        }
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        throw new Exception(ex.Message);
                    }
                }
            }
            return flag;
        }
        /// <summary>
        /// 批量執行DML SQL語句并實現事務（一條sql語句的批量執行）
        /// </summary>
        /// <param name="sql">一條sql</param>
        /// <param name="list">參數數組(跟sql對應)</param>
        /// <param name="connStringName">数据库连接字符串的名字</param>
        /// <returns>是否執行成功</returns>
        public static bool ExecuteSqls<T>(string sql, List<T> list) where T : class
        {
            bool flag = false;
            _connStringName = connStringName.ToString();
            using (IDbConnection conn = new OracleConnection(_connStringName))
            {
                conn.Open();
                using (IDbTransaction transaction = conn.BeginTransaction())
                {
                    int total = 0;
                    try
                    {
                        foreach (var item in list)
                        {
                            total += conn.Execute(sql, item, transaction, null, null);
                        }
                        transaction.Commit();
                        flag = total > 0;
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        throw new Exception(ex.Message);
                    }
                }
            }
            return flag;
        }

        #endregion

        #region GetSingle
        /// <summary>
        /// 查詢第一行第一列的數據（返回object,其他類型需自己手動轉換）
        /// </summary>
        /// <param name="cmdText">sql</param>
        /// <param name="param">參數</param>
        /// <param name="connStringName">数据库连接字符串的名字</param>
        /// <returns>返回第一行第一列的數據</returns>
        public static object GetSingle(string cmdText, object param = null)
        {
            _connStringName = connStringName.ToString();
            using (IDbConnection conn = new OracleConnection(_connStringName))
            {
                try
                {
                    conn.Open();
                    return conn.ExecuteScalar(cmdText, param);
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }
        }
        #endregion

        #region QuerySingle
        /// <summary>
        /// 執行查詢SQL
        /// </summary>
        /// <typeparam name="T">實體</typeparam>
        /// <param name="cmdText">sql</param>
        /// <param name="param">參數</param>
        /// <param name="connStringName">数据库连接字符串的名字</param>
        /// <returns>T對應的實體</returns>
        public static T QuerySingle<T>(string cmdText, object param = null) where T : class
        {
            try
            {
                return GetList<T>(cmdText, param).SingleOrDefault();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        #endregion

        #region GetList
        /// <summary>
        /// 執行查詢SQL
        /// </summary>
        /// <typeparam name="T">實體</typeparam>
        /// <param name="cmdText">sql</param>
        /// <param name="param">參數</param>
        /// <param name="connStringName">数据库连接字符串的名字</param>
        /// <returns>T對應的集合</returns>
        public static IEnumerable<T> GetList<T>(string cmdText, object param = null)
        {
            _connStringName = connStringName.ToString();
            using (IDbConnection conn = new OracleConnection(_connStringName))
            {
                try
                {
                    conn.Open();
                    return conn.Query<T>(cmdText, param);
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }
        }
        ///// <summary>
        ///// 分頁
        ///// </summary>
        ///// <typeparam name="T">實體</typeparam>
        ///// <param name="cmdText">sql</param>
        ///// <param name="pageIndex">第幾頁</param>
        ///// <param name="pageSize">一頁顯示多條</param>
        ///// <param name="param">參數</param>
        ///// <param name="connStringName">数据库连接字符串的名字</param>
        ///// <returns>數據集合，總數</returns>
        //public static PagedList<T> GetPage<T>(string cmdText, int pageIndex, int pageSize, object param = null)
        //{
        //    _connStringName = connStringName.ToString();
        //    //總數
        //    string countSql = DBClient.GetCountSql(cmdText);
        //    int count = Convert.ToInt32(GetSingle(countSql, param, connStringName));
        //    //分頁查詢
        //    cmdText = DBClient.GetPagingSql(cmdText, pageIndex, pageSize);
        //    var list = GetList<T>(cmdText, param, connStringName);
        //    return new PagedList<T>(list, count, pageIndex, pageSize);
        //}
        #endregion

        #region 執行存儲過程
        /// <summary>
        /// 調用存儲過程（若要判斷存儲過程執行成功必須是該方法執行成功同時存儲過程執行成功）
        /// </summary>
        /// <param name="storeName">存儲過程名稱</param>
        /// <param name="dicIn">輸入參數</param>
        /// <param name="dicOut">輸出參數（約束：有一個參數表示存儲過程執行是否成功）</param>
        /// <param name="connStringName">数据库连接字符串的名字</param>
        /// <returns>false:僅是調用該方法失敗 true:僅是調用該方法成功 若要判斷存儲過程執行成功必須是該方法執行成功同時存儲過程執行成功</returns>
        public static bool ExecuteStoredProcedure(string storeName, Dictionary<string, object> dicIn, Dictionary<string, object> dicOut = null)
        {
            bool flag = false;
            _connStringName = connStringName.ToString();
            using (IDbConnection con = new OracleConnection(_connStringName))
            {
                con.Open();
                using (IDbCommand cmd = con.CreateCommand())
                {
                    try
                    {
                        DynamicParameters dp = new DynamicParameters();
                        if (dicIn != null && dicIn.Count > 0)
                        {
                            foreach (string key in dicIn.Keys)
                            {
                                dp.Add(key, dicIn[key]);
                            }
                        }
                        if (dicOut != null && dicOut.Count > 0)
                        {
                            foreach (string key in dicOut.Keys)
                            {
                                dp.Add(key, "", DbType.String, ParameterDirection.Output);
                            }
                        }
                        con.Execute(storeName, dp, null, null, CommandType.StoredProcedure);
                        if (dicOut != null && dicOut.Count > 0)
                        {
                            string[] keys = dicOut.Keys.ToArray();
                            for (int i = 0; i < keys.Length; i++)
                            {
                                dicOut[keys[i]] = dp.Get<string>(keys[i]);
                            }
                        }
                        flag = true;
                    }
                    catch (Exception ex)
                    {
                        throw new Exception(ex.Message);
                    }
                }
            }
            return flag;
        }

        /// <summary>
        /// 調用存儲過程，返回結果集
        /// </summary>
        /// <typeparam name="T">實體</typeparam>
        /// <param name="storeName">存儲過程名稱</param>
        /// <param name="dicIn">輸入參數</param>
        /// <param name="cursorResultName">遊標的名稱</param>
        /// <param name="connStringName">数据库连接字符串的名字</param>
        /// <returns>結果集</returns>
        public static IEnumerable<T> ExecuteStoredProcedure<T>(string storeName, Dictionary<string, object> dicIn, string cursorResultName)
        {
            _connStringName = connStringName.ToString();
            using (IDbConnection con = new OracleConnection(_connStringName))
            {
                con.Open();
                using (IDbCommand cmd = con.CreateCommand())
                {
                    try
                    {
                        OracleDynamicParameters dp = new OracleDynamicParameters();
                        if (dicIn != null && dicIn.Count > 0)
                        {
                            foreach (string key in dicIn.Keys)
                            {
                                dp.Add(key, dicIn[key]);
                            }
                        }
                        dp.Add(cursorResultName, OracleDbType.RefCursor, ParameterDirection.Output);
                        return con.Query<T>(storeName, param: dp, commandType: CommandType.StoredProcedure);
                    }
                    catch (Exception ex)
                    {
                        throw new Exception(ex.Message);
                    }
                }
            }
        }
        #endregion

        #region Table
        /// <summary>
        /// 查詢，返回Table.
        /// </summary>
        /// <param name="cmdText">sql語句</param>
        /// <param name="param">參數</param>
        /// <param name="connStringName">数据库连接字符串的名字</param>
        /// <returns>Table</returns>
        public static DataTable Table(string cmdText, object param = null)
        {
            _connStringName = connStringName.ToString();
            using (IDbConnection conn = new OracleConnection(_connStringName))
            {
                try
                {
                    conn.Open();
                    return conn.Table(cmdText, param);
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }
        }
        #endregion
    }
}

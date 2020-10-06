/*
 * Update by peng:For support ExecuteScalar(獲取第一行第一列的數據) [2017/07/04]
 */
using System;
using System.Data;

namespace Data.Dapper
{
    partial class SqlMapper
    {
        /// <summary>
        /// Execute parameterized SQL that selects a single value.
        /// </summary>
        public static object ExecuteScalar(this IDbConnection cnn, string sql, object param = null, IDbTransaction transaction = null, bool buffered = true, int? commandTimeout = null, CommandType? commandType = null)
        {
            var identity = new Identity(sql, commandType, cnn, typeof(object), param == null ? null : param.GetType(), null);
            var info = GetCacheInfo(identity);
            using (var cmd = SetupCommand(cnn, transaction, sql, info.ParamReader, param, commandTimeout, commandType))
            {
                object o = cmd.ExecuteScalar();
                SetQueryCache(identity, info);
                return o;
            }
        }

        /// <summary>
        /// 返回Data
        /// </summary>
        public static DataTable Table(this IDbConnection cnn, string sql, object param = null, IDbTransaction transaction = null, bool buffered = true, int? commandTimeout = null, CommandType? commandType = null)
        {
            var identity = new Identity(sql, commandType, cnn, typeof(object), param == null ? null : param.GetType(), null);
            var info = GetCacheInfo(identity);
            using (var cmd = SetupCommand(cnn, transaction, sql, info.ParamReader, param, commandTimeout, commandType))
            {
                IDataReader o = cmd.ExecuteReader();
                SetQueryCache(identity, info);
                return IDataReaderToDataTable(o);
            }
        }

        /// <summary>
        /// 把idatareader轉換成datatable
        /// </summary>
        /// <param name="reader"></param>
        /// <returns></returns>
        private static DataTable IDataReaderToDataTable(IDataReader reader)
        {

            DataTable objDataTable = new DataTable();

            int intFieldCount = reader.FieldCount;
            for (int intCounter = 0; intCounter < intFieldCount; ++intCounter)
            {
                objDataTable.Columns.Add(reader.GetName(intCounter), typeof(string));
            }

            objDataTable.BeginLoadData();
            object[] objValues = new object[intFieldCount];


            while (reader.Read())
            {
                reader.GetValues(objValues);
                objDataTable.LoadDataRow(objValues, true);
            }
            reader.Close();
            objDataTable.EndLoadData();

            return objDataTable;
        }
    }
}
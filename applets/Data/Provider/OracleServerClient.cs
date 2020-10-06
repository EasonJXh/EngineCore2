using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Oracle.ManagedDataAccess.Client;

namespace Data.Provider
{
    internal class OracleServerClient
    {
        public DbConnection GetDbConnection(string connectionString)
        {
            return new OracleConnection(connectionString);
        }

        public DbCommand GetDbCommand(string cmdText)
        {
            return new OracleCommand(cmdText) { BindByName = true };
        }

        public DbDataAdapter GetDbDataAdappter()
        {
            return new OracleDataAdapter();
        }

        public DbParameter GetDbParameter()
        {
            return new OracleParameter();
        }

        public string GetCountSql(string cmdText)
        {
            cmdText = string.Format("SELECT COUNT(*) FROM ({0})", cmdText);
            return cmdText;
        }

        public string GetPagingSql(string cmdText, int pageIndex, int pageSize)
        {
            int startIndex = (pageIndex - 1) * pageSize;
            int endIndex = pageIndex * pageSize;
            cmdText = string.Format(@"SELECT * FROM (SELECT PAGERTABLE.*,ROWNUM NO FROM ({0}) PAGERTABLE WHERE ROWNUM <= {1})  WHERE NO > {2}", cmdText, endIndex, startIndex);
            return cmdText;
        }
    }

}

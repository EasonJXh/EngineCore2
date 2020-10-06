using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Data.Dapper;
using System.Data;
using ControlCenterApp.Entity;

namespace ControlCenterApp.Service
{
    /// <summary>
    /// 與數據庫交互,將業務數據進行各種操作
    /// </summary>
    public class MainService
    {
        /// <summary>
        /// 獲取相關代碼
        /// </summary>
        /// <returns></returns>
        public static IEnumerable<string> getAllFundCode(int fType)
        {
            string sql = null;
            if (fType == 0)
            {
                sql = @"select t.fundcode from  FUNDBASEINFO t where t.ftype<>'指數' order by t.flevel desc,t.assetsize desc,t.fundcode";
                //sql = @"select t.fundcode from  FUNDBASEINFO t where t.ftype<>'指數' and t.fundcode in ('009571','009548') order by t.flevel desc,t.assetsize desc,t.fundcode";
            }
            else {
                sql = @"select t.fundcode from  FUNDBASEINFO t where t.ftype='指數' order by t.flevel desc,t.assetsize desc,t.fundcode";
                //sql = @"select t.fundcode from  FUNDBASEINFO t where t.ftype='指數' and t.fundcode='sz510050' and 1<>1 order by t.flevel desc,t.assetsize desc,t.fundcode";
            }
            return DapperHelper.GetList<string>(sql);
        }

        /// <summary>
        /// 記錄FUNDPRICE_RECORDS數據
        /// </summary>
        /// <param name="model">採集的數據模型</param>
        /// <returns></returns>
        public static bool insertFundPrice(FUNDPRICE_RECORDS[] model)
        {
            List<string> sqlList = new List<string> { };
            List<object> paraList = new List<object> { };
            foreach (var i in model)
            {
                string sqlCount = @"select count(1) from FUNDPRICE_RECORDS t where t.fundcode=:FUNDCODE and t.rdate=:RDATE";
                decimal count = Convert.ToDecimal(DapperHelper.GetSingle(sqlCount, new { FUNDCODE = i.FUNDCODE, RDATE = i.RDATE }));
                string tempSql = null;
                if (count > 0)
                {
                    tempSql = @"update FUNDPRICE_RECORDS t
                                       set t.price      = :PRICE,
                                           t.canbuy     = :CANBUY,
                                           t.cansale    = :CANSALE,
                                           t.updatedate = sysdate,
                                           t.grownrate=:GROWNRATE
                                     where t.fundcode = :FUNDCODE
                                       and t.rdate = :RDATE";
                }
                else
                {
                    tempSql = @"insert into FUNDPRICE_RECORDS t
                                    (t.fundcode,t.price,t.rdate,t.grownrate,t.canbuy,t.cansale,t.creator)
                                    values
                                    (:FUNDCODE,:PRICE,:RDATE,:GROWNRATE,:CANBUY,:CANSALE,:CREATOR)";
                }
                sqlList.Add(tempSql);
                paraList.Add(i);
            }
            return DapperHelper.ExecuteSqls(sqlList.ToArray(),paraList.ToArray());
        }

        /// <summary>
        /// 新增任務
        /// </summary>
        /// <param name="model">相關信息</param>
        /// <returns></returns>
        public static bool addNewTask(TASK_RECORDS model)
        {
            bool isSuccess = false;
            string sqlCount = @"select count(1) from task_records t where t.taskname=:TASKNAME";
            string sqlInsert = @"insert into task_records t
                                    (t.taskname,t.ttype,t.priority,t.desmeo,t.sdate,t.edate,t.status,t.creator)
                                    values
                                    (:TASKNAME,:TTYPE,:PRIORITY,:DESMEO,:SDATE,:EDATE,:STATUS,:CREATOR)";
            string sqlUpdate = @"update FUNDPRICE_RECORDS t
                                       set t.desmeo = :DESMEO, t.sdate = :SDATE, t.edate = :EDATE
                                     where t.taskname = :TASKNAME
                                       and t.status = 1";
            decimal num = Convert.ToDecimal(DapperHelper.GetSingle(sqlCount, new { TASKNAME = model.TASKNAME }));
            if (num < 1)
            {
                isSuccess = DapperHelper.ExecuteSql(sqlInsert, model);
            }
            else
            {
                isSuccess = DapperHelper.ExecuteSql(sqlUpdate, model);
            }
            return isSuccess;
        }
    }
}

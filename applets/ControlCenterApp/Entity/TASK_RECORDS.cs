using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ControlCenterApp.Entity
{
    /// <summary>
    /// 任務屬性模型
    /// </summary>
    public class TASK_RECORDS
    {
        public string ID { get; set; }
        public string TASKNAME { get; set; }
        public string TTYPE { get; set; }
        public decimal PRIORITY { get; set; }
        public string DESMEO { get; set; }
        public DateTime SDATE { get; set; }
        public DateTime EDATE { get; set; }
        public decimal STATUS { get; set; }
        public string CREATOR { get; set; }
        public DateTime CREATEDATE { get; set; }
        public DateTime LASTDATE { get; set; }
        public string FREQUENT { get; set; }
    }
}

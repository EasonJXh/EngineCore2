using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ControlCenterApp.Entity
{
    /// <summary>
    /// FUNDPRICE_RECORDS模型屬性
    /// </summary>
    public class FUNDPRICE_RECORDS
    { 
        public string FUNDCODE { get; set; }
        public string PRICE { get; set; }
        public DateTime RDATE { get; set; }
        public decimal FRANK { get; set; }
        public string ISOVER { get; set; }
        public string MPOSITION { get; set; }
        public string MANAGER { get; set; }
        public DateTime CREATEDATE { get; set; }
        public string CREATOR { get; set; }
        public string MEMO { get; set; }
        public string GROWNRATE { get; set; }
        public DateTime UPDATEDATE { get; set; }
        public string CANBUY { get; set; }
        public string CANSALE { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace ControlCenterApp.Utils
{
    /// <summary>
    /// 常用的特殊处理函数
    /// </summary>
    public class Common
    {
        /// <summary>
        /// 查找某个字符串里某个字符第n次出现的位置
        /// </summary>
        /// <param name="str"></param>
        /// <param name="mod"></param>
        /// <param name="index"></param>
        /// <returns></returns>
        public static decimal Getstrindexof(string str, char mod, int index)
        {
            int count = 0;
            int k = 0;

            for (int i = 0; i < str.Length; i++)
            {
                if (mod == str[i])
                {
                    count++;
                }
                if (index == count)
                {
                    k = i;
                    break;
                }
            }
            return k;

        }

        /// <summary>
        /// 獲取本機IP地址
        /// </summary>
        /// <returns></returns>
        public static string getLocalHost()
        {
            string AddressIP = string.Empty;
            try
            {
                foreach (IPAddress _IPAddress in Dns.GetHostEntry(Dns.GetHostName()).AddressList)
                {
                    if (_IPAddress.AddressFamily.ToString() == "InterNetwork")
                    {
                        AddressIP = _IPAddress.ToString();
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
            return AddressIP;
        }

        /// <summary>
        /// 將字符串轉換成日期格式
        /// </summary>
        /// <param name="strDate">字符串日期</param>
        /// <param name="format">日期格式</param>
        /// <returns></returns>
        public static DateTime trasToDataTime(string strDate, string format)
        {
            if (string.IsNullOrEmpty(strDate)) return DateTime.Now;
            DateTimeFormatInfo dtFormat = new DateTimeFormatInfo();
            dtFormat.ShortDatePattern = format;
            return Convert.ToDateTime(strDate, dtFormat);
        }
    }
}

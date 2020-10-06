using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ControlCenterApp.Utils
{
    /// <summary>
    /// 日志管理类
    /// </summary>
    public class LogHelper
    {
        /// <summary>
        /// 向日誌文件寫入操作結果
        /// </summary>
        /// <param name="flag">0開始啟動 1成功 2失敗</param>
        /// <param name="content"></param>
        /// <returns></returns>
        public static bool WriteLog(int flag, string content)
        {
            bool bResult = false;
            try
            {
                string message = "";
                if (flag == 0)
                    message = "啟動運行時間：" + DateTime.Now.ToString();
                else if (flag == 1)
                    message = "結束運行時間：" + DateTime.Now.ToString() + "，結果：成功，備註：" + content;
                else if (flag == 2)
                    message = "結束運行時間：" + DateTime.Now.ToString() + "，結果：失敗，備註：" + content;
                else if (flag == 3)
                    message = "" + DateTime.Now.ToString() + "，備註：" + content;

                string fileName = "runlog_" + DateTime.Now.Year.ToString() + ".txt";
                string logPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, fileName);

                if (!File.Exists(logPath))
                {
                    FileStream fs = new FileStream(logPath, FileMode.Create);
                    fs.Close();
                }

                StreamWriter sw = new StreamWriter(logPath, true);
                sw.WriteLine(message);
                sw.Close();

                bResult = true;
            }
            catch
            {
                bResult = false;
            }

            return bResult;
        }
    }
}

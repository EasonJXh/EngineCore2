using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using System.IO;

namespace ControlCenterApp.Utils
{
    public class HttpRequest
    {
        /// <summary>
        /// 以post方式調用api接口
        /// </summary>
        /// <param name="url">地址</param>
        /// <param name="body">表單內容</param>
        /// <returns></returns>
        public static string HttpPost(string url, string body)
        {
            byte[] data = Encoding.UTF8.GetBytes(body);
            HttpWebRequest webrequest = (HttpWebRequest)WebRequest.Create(url);
            webrequest.Method = "POST";
            webrequest.Accept = "text/html, application/xhtml+xml, */*";
            webrequest.ContentType = "application/json;charset=UTF-8";
            webrequest.ContentLength = data.Length;
            Stream stream = webrequest.GetRequestStream();
            stream.Write(data, 0, data.Length);
            stream.Close();

            //接受服務端的響應
            HttpWebResponse webresponse = (HttpWebResponse)webrequest.GetResponse();
            StreamReader sr = new StreamReader(webresponse.GetResponseStream(), Encoding.UTF8);
            string msg = sr.ReadToEnd();
            return msg;
        }

        public static string HttpGet(string url)
        {
            HttpWebRequest webrequest = (HttpWebRequest)WebRequest.Create(url);
            webrequest.Method = "GET";
            webrequest.Accept = "text/html, application/xhtml+xml, */*";
            webrequest.ContentType = "application/json;charset=UTF-8";

            //接受服務端的響應
            HttpWebResponse webresponse = (HttpWebResponse)webrequest.GetResponse();
            StreamReader sr = new StreamReader(webresponse.GetResponseStream(), Encoding.UTF8);
            string msg = sr.ReadToEnd();
            return msg;
        }
    }
}

using System;
using System.Xml;
using System.IO;

namespace ControlCenterApp.Utils
{
    /// <summary>
    ///配置管理类
    /// </summary>
    public class ConfigurationManager
    {
        /// <summary>
        /// 获取实例连接配置
        /// </summary>
        /// <returns>数据库连接字符串</returns>
        public static string getConnectString(string configKey)
        {
            string strConn = null;
            try
            {
                string configPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "App.config");

                XmlDocument xmlDoc = new XmlDocument();
                xmlDoc.Load(configPath);
                XmlNodeList nodeList = xmlDoc.SelectSingleNode("configuration/appSettings").ChildNodes;
                foreach (XmlNode node in nodeList)
                {
                    string key = node.Attributes["key"].Value;
                    string value = node.Attributes["value"].Value;
                    if (key == configKey)
                    {
                        strConn = value;
                    }
                }
            }
            catch (Exception e)
            {
                LogHelper.WriteLog(2, "读取配置异常：" + e.Message);
                Console.WriteLine("读取配置异常：" + e.Message);
                Console.ReadLine();
            }
            return strConn;
        }
    }
}

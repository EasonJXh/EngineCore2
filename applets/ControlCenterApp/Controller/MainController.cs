using ControlCenterApp.Entity;
using ControlCenterApp.Service;
using ControlCenterApp.Utils;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using Winista.Text.HtmlParser;
using Winista.Text.HtmlParser.Filters;
using Winista.Text.HtmlParser.Util;

namespace ControlCenterApp.Controller
{
    public class MainController
    {
        /// <summary>
        /// 執行系統任務
        /// </summary>
        /// <param name="taskName">任務名稱</param>
        /// <returns></returns>
        public static string Execute_Task(string taskName, bool isHistory)
        {
            //消息容器
            string msg = null;
            /*數據採集應用*/
            if (taskName == "datacollect_sys")
            {
                //接口地址
                string url = null;
                string baseUrl = null;
                string startDate = null;
                string endDate = null;
                string indexBaseUrl = ConfigurationManager.getConnectString("indexnow_url");
                //FUNDPRICE數據容器
                List<FUNDPRICE_RECORDS> priceData = new List<FUNDPRICE_RECORDS>();
                //獲取所有非指數和指數代碼（分開查詢因為WebApi的地址和格式不統一，需分開處理）
                IEnumerable<string> code = MainService.getAllFundCode(0);
                IEnumerable<string> indexCode = MainService.getAllFundCode(1);
                //獲得歷史數據
                if (isHistory)
                {
                    startDate = DateTime.Now.AddDays(-15).ToString("yyyy-MM-dd");
                    endDate = DateTime.Now.ToString("yyyy-MM-dd");

                    baseUrl = ConfigurationManager.getConnectString("fundhistory_url");
                    string type = "lsjz";
                    decimal page = 1;
                    decimal per = 49;
                    decimal pageSize = 0;
                    //三年數據
                    //string sdate = DateTime.Now.AddDays(-(3 * 366)).ToString("yyyy-MM-dd");
                    //半月數據
                    string sdate = DateTime.Now.AddDays(-(15)).ToString("yyyy-MM-dd");
                    string edate = DateTime.Now.AddDays(-1).ToString("yyyy-MM-dd");
                    foreach (var i in code)
                    {
                        try
                        {
                            url = baseUrl + "?" + "type=" + type + "&code=" + i.ToString() + "&page=" + page + "&sdate=" + sdate
                                + "&edate=" + edate + "&per=" + per;
                            //請求數據
                            string tempData = HttpRequest.HttpGet(url);
                            tempData = tempData.Replace("var apidata=", "");
                            tempData = tempData.Replace(";", "");
                            JObject json = (JObject)JsonConvert.DeserializeObject(tempData);
                            pageSize = Convert.ToInt32(json["pages"].ToString());
                            for (int x = 1; x <= pageSize; x++)
                            {
                                page = x;
                                url = baseUrl + "?" + "type=" + type + "&code=" + i.ToString() + "&page=" + page + "&sdate=" + sdate
                                + "&edate=" + edate + "&per=" + per;
                                tempData = HttpRequest.HttpGet(url);
                                tempData = tempData.Replace("var apidata=", "");
                                tempData = tempData.Replace(";", "");
                                json = (JObject)JsonConvert.DeserializeObject(tempData);
                                //格式化數據
                                string htmlData = json["content"].ToString();
                                //開始解析數據
                                Parser parser = Parser.CreateParser(htmlData, "utf-8");
                                //筛选要查找的对象 这里查找td，封装成过滤器
                                NodeFilter trFilter = new TagNameFilter("tr");
                                //NodeFilter thFilter = new TagNameFilter("th");
                                //将过滤器导入筛选，得到对象列表
                                NodeList nodes = parser.Parse(trFilter);
                                //j=1將表格第一行表頭過濾掉
                                for (int j = 1; j < nodes.Size(); j++)
                                {
                                    FUNDPRICE_RECORDS model = new FUNDPRICE_RECORDS();
                                    INode textnode = nodes[j];
                                    ITag tag = getTag(textnode.FirstChild);
                                    string id = tag.GetAttribute("value");
                                    model.FUNDCODE = i.ToString();
                                    model.RDATE = Common.trasToDataTime(textnode.Children[0].ToPlainTextString(), "yyyy-MM-dd");
                                    model.PRICE = textnode.Children[1].ToPlainTextString();
                                    model.GROWNRATE = textnode.Children[3].ToPlainTextString();
                                    model.CANBUY = textnode.Children[4].ToPlainTextString();
                                    model.CANSALE = textnode.Children[5].ToPlainTextString();
                                    model.CREATOR = "SYS";
                                    priceData.Add(model);
                                }
                            }
                            msg += "\r\n" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + ":Fundcode-" + i.ToString() + "'s Data has been goten between " + sdate + " and " + edate;
                        }
                        catch (Exception e)
                        {
                            msg += "\r\n" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + ":發生異常," + e.Message;
                        }
                    }

                }

                //當天最新數據
                else
                {
                    startDate = DateTime.Now.ToString("yyyy-MM-dd");
                    endDate = DateTime.Now.ToString("yyyy-MM-dd");

                    baseUrl = ConfigurationManager.getConnectString("fundnow_url");
                    decimal rt = 1463558676006;
                    foreach (var i in code)
                    {
                        FUNDPRICE_RECORDS model = new FUNDPRICE_RECORDS();
                        try
                        {
                            url = baseUrl + i.ToString() + ".js?rt=" + rt;
                            //請求數據
                            string tempData = HttpRequest.HttpGet(url);
                            tempData = tempData.Replace("jsonpgz(", "");
                            tempData = tempData.Replace(");", "");
                            JObject json = (JObject)JsonConvert.DeserializeObject(tempData);
                            model.FUNDCODE = i.ToString();
                            model.RDATE = Common.trasToDataTime(json["gztime"].ToString().Substring(0, 10), "yyyy-MM-dd");
                            model.PRICE = json["gsz"].ToString();
                            model.GROWNRATE = json["gszzl"].ToString() + "%";
                            model.CREATOR = "SYS";
                            priceData.Add(model);
                            msg += "\r\n" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + ":Fundcode-" + i.ToString() + "'s Data has been goten in today!";
                        }
                        catch (Exception e)
                        {
                            msg += "\r\n" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + ":抓取"+i+"項目時,發生異常," + e.Message+"（最有可能的原因為當天暫無數據）";
                        }
                    }
                }
                //處理指數每天的數據
                foreach (var j in indexCode)
                {
                    try
                    {
                        baseUrl = indexBaseUrl+ "get?param=" + j + ",day," + startDate + "," + endDate + ",10000,qfq";
                        //請求數據
                        string tempData = HttpRequest.HttpGet(baseUrl);
                        JObject json = (JObject)JsonConvert.DeserializeObject(tempData);
                        json = (JObject)JsonConvert.DeserializeObject(json["data"].ToString());
                        json = (JObject)JsonConvert.DeserializeObject(json[j].ToString());
                        List<List<string>> dayData = json["day"].ToObject<List<List<string>>>();
                        foreach (var item in dayData)
                        {
                            FUNDPRICE_RECORDS e = new FUNDPRICE_RECORDS();
                            e.FUNDCODE = j.ToString();
                            e.RDATE = Common.trasToDataTime(item[0], "yyyy-MM-dd");
                            e.PRICE = item[2];
                            double sPrice = Convert.ToDouble(item[1]);
                            double ePrice = Convert.ToDouble(item[2]);
                            e.GROWNRATE = ePrice == 0 ? "0%" : Math.Round(((ePrice-sPrice) / sPrice)*100,2) + "%";
                            e.CREATOR = "SYS";
                            priceData.Add(e);
                        }
                        msg += "\r\n" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + ":指數-" + j + "'s Data has been goten between "+startDate+" and "+endDate;
                    }
                    catch (Exception e) {
                        msg += "\r\n" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + ":抓取" + j+ "項目時,發生異常," + e.Message + "（最有可能的原因為當天暫無數據）";
                    }
                }

                bool isSuccess = MainService.insertFundPrice(priceData.ToArray());
                if (isSuccess)
                {
                    msg += "\r\n" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + ":All Funds Data has been insert into DB!";
                }
                else
                {
                    msg += "\r\n" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + ": Insert Error!";
                }
            }
            else if (taskName == "tipnote_sys")
            {

            }
            else if (taskName == "delcache_sys")
            {
                Process proc = new Process();
                string targetDir = ConfigurationManager.getConnectString("shutdown_app");

                proc.StartInfo.WorkingDirectory = targetDir;
                proc.StartInfo.FileName = "clean.bat";
                proc.StartInfo.Arguments = string.Format("10");

                proc.Start();
                proc.WaitForExit();
                msg += "\r\n" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + ":系統清理緩存成功!";
            }
            else
            {

            }
            return msg;
        }

        #region 公用方法
        /// <summary>
        /// 獲取標籤
        /// </summary>
        /// <param name="node">節點</param>
        /// <returns></returns>
        private static ITag getTag(INode node)
        {
            if (node == null)
                return null;
            return node is ITag ? node as ITag : null;
        }
        #endregion
    }
}

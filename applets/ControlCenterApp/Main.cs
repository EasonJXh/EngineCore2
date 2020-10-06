using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ControlCenterApp.Utils;
using System.Windows.Forms;
using ControlCenterApp.Controller;
using ControlCenterApp.Service;
using ControlCenterApp.Entity;
using System.Threading;
using System.Diagnostics;

namespace ControlCenterApp
{
    public partial class Main : Form
    {
        //全局靜態數據
        private static string[] appAndSysName =
            {"datacollect_sys","tipnote_sys","delcache_sys","task_sys","chrome_app","ie_app","mail_app","plsql_app",
            "vscode_app","eclipse_app","cmd_app","shutdown_app","note_app","chat_app","excel_app","git_app",
            "mongo_app","rubbish_app","set_app","distince_app","net_app","win_app","compute_app","wall_app"};
        private static string[] freTypeName =
            {"eachmonth","eachweek","eachday","eachfivemins"};
        //設置代理
        private delegate void setPosFundData(string msg);
        private delegate void setPosProcessShow(int ipos);
        public Main()
        {
            InitializeComponent();
        }

        /// <summary>
        /// 程序啟動初始化後初始化動作
        /// </summary>
        /// <param name="sender">控件類型</param>
        /// <param name="e">事件類型</param>
        private void Main_Load(object sender, EventArgs e)
        {
            //啟動fund數據獲取服務
            Execute_Task(datacollect_sys, e);
            //清除系統垃圾
            //Execute_Task(delcache_sys, e);
        }

        #region 執行動作,被調用子方法
        /// <summary>
        /// 開啟引用程序
        /// </summary>
        /// <param name="sender">控件類型</param>
        /// <param name="e">事件</param>
        private void OpenApp(object sender, EventArgs e)
        {
            string appName = null;
            string sType = sender.GetType().ToString();
            if (sType == "string")
            {
                appName = (string)sender;
            }
            else
            {
                appName = (sender as PictureBox).Name;
            }
            string appPath = ConfigurationManager.getConnectString(appName);
            if (appName == "shutdown_app")
            {
                Process proc = new Process();

                proc.StartInfo.WorkingDirectory = appPath;
                proc.StartInfo.FileName = "shutdown.bat";
                proc.StartInfo.Arguments = string.Format("10");

                proc.Start();
                proc.WaitForExit();
            }
            else
            {
                System.Diagnostics.Process.Start(appPath);
            }            
            log.Text += "\r\n"+DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + ":已打開應用" + appName;            
        }

        /// <summary>
        /// 執行系統任務
        /// </summary>
        /// <param name="sender">控件類型</param>
        /// <param name="e">事件</param>
        private void Execute_Task(object sender, EventArgs e)
        {
            string taskName = null;
            string sType = sender.GetType().ToString();
            if (sType == "string")
            {
                taskName = (string)sender;
            }
            else
            {
                taskName = (sender as PictureBox).Name;
            }
            //分配多個線程執行任務
            Thread barThread = new Thread(new ThreadStart(SleepT));
            barThread.Start();

            //日誌框顯示已抓取信息
            Thread msgThread = new Thread(new ParameterizedThreadStart(collectFundData));
            msgThread.Start(taskName);
        }

        /// <summary>
        /// 改變應用的狀態並查詢有無定時執行任務(此動作後面做)
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void changeStatus(object sender, EventArgs e)
        {            
            var picBoxName = (sender as PictureBox).Name;
            //根據控件名找到控件類型並設置其屬性
            foreach (var i in appAndSysName)
            {
                Control control = Controls.Find(i, true)[0];
                var tempPic = (control as PictureBox);
                if (i == picBoxName)
                {
                    tempPic.BorderStyle = BorderStyle.FixedSingle;
                }
                else
                {
                    tempPic.BorderStyle = BorderStyle.None;
                }
            }
        }

        /// <summary>
        /// 設定任務並開始啟動(定時任務執行暫不開發,後續有空再開發,目前先保證能抓數據)
        /// </summary>
        /// <param name="sender">控件類型</param>
        /// <param name="e">動作或者事件類型</param>
        private void StartTask(object sender, EventArgs e)
        {
            //設定執行頻率
            Dictionary<string, decimal> _dic = new Dictionary<string, decimal>
            {
                {"eachmonth",(decimal) 30*24*60*60*1000 },
                {"eachweek",(decimal) 7*24*60*60*1000 },
                {"eachday",(decimal) 1*24*60*60*1000 },
                {"eachfivemins",(decimal) 5*60*1000 }
            };
            TASK_RECORDS model = new TASK_RECORDS();
            foreach (var i in appAndSysName)
            {
                Control control = Controls.Find(i, true)[0];
                var picBox = (control as PictureBox);
                if (picBox.BorderStyle.ToString() == "FixedSingle")
                {
                    foreach (var j in freTypeName)
                    {
                        Control ctr = Controls.Find(j, true)[0];
                        var radioBtn = (control as RadioButton);
                        if (radioBtn.Focused == true)
                        {
                            model.FREQUENT = _dic.Where(p=>p.Key==j).Select(p=>p.Value).ToString();
                        }
                    }
                    model.TASKNAME = picBox.Name;
                    model.STATUS = 1;
                    model.DESMEO = notetext.Text;
                    model.SDATE = Common.trasToDataTime(startdate.Text, "yyyy-MM-dd");
                    model.EDATE = Common.trasToDataTime(enddate.Text, "yyyy-MM-dd");
                    model.CREATOR = "SYSTEM";
                    if (model.TASKNAME.EndsWith("sys"))
                    {
                        model.PRIORITY = 2;
                        model.TTYPE = "sys";
                    }
                    else
                    {
                        model.PRIORITY = 1;
                        model.TTYPE = "app";
                    }
                    //記錄任務信息(定時任務執行暫不開發,後續有空再開發,目前先保證能抓數據)
                    MainService.addNewTask(model);
                }
            }

        }

        #endregion

        #region 代理執行方法

        /// <summary>
        /// 進度緩衝
        /// </summary>
        private void SleepT()
        {
            for (int i = 0; i <= 500; i++)
            {
                Thread.Sleep(100);
                SetTextMesssage(100 * i / 500);
            }
        }
        private void SetTextMesssage(int ipos)
        {
            try
            {
                if (this.InvokeRequired)
                {
                    setPosProcessShow setpos = new setPosProcessShow(SetTextMesssage);
                    this.Invoke(setpos, new object[] { ipos});
                }
                else
                {
                    processShow.Value = Convert.ToInt32(ipos);
                }
            }
            catch (Exception e)
            {
                log.Text +="\r\n"+ DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss") +":"+ e.Message;
            }
        }

        /// <summary>
        /// 代理執行任務
        /// </summary>
        /// <param name="taskName">任務名稱</param>
        private void collectFundData(object taskName)
        {
            string msg = null;
            try
            {
                bool isHistory = true;
                decimal hour = Convert.ToDecimal(DateTime.Now.ToString("HH"));
                if (hour >= 10)
                {
                    isHistory = false;
                }               
                //當天實時數據
                msg = MainController.Execute_Task(taskName.ToString(), isHistory);
                msg += "\r\n" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + ":" + taskName.ToString() + "系統任務執行成功!";
            }
            catch (Exception e)
            {
                msg = DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss") + "-程序執行發生異常:" + e.Message + "\r\n";
            }
            setShowFundLog(msg);
        }

        private void setShowFundLog(string msg)
        {
            if (InvokeRequired)
            {
                setPosFundData sf = new setPosFundData(setShowFundLog);
                Invoke(sf, new object[] { msg });
            }
            else
            {
                log.Text += "\r\n" + DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss") + ":" + msg;
            }
        }

        #endregion

    }
}

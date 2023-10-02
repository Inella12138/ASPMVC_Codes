using Microsoft.AspNetCore.Mvc;
using System.CodeDom.Compiler;

namespace ASPMVC_MathQtn_wksp.Controllers
{
    public class MathController : Controller
    {
        //Index页面，只用于显示内容，内容由javascript控制
        public IActionResult Index()
        {
            return View();
        }

        //RandomGene()方法，返回一个JSON数据包
        //当客户端（浏览器）请求这个方法的时候，返回随机生成的数字
        public IActionResult RandomGene()
        {
            Random rnd = new Random();
            int a = rnd.Next(0, 99);
            int b = rnd.Next(0, 99);
            int y = (a > b) ? b : a;
            int z = (a > b) ? a : b;
            //上面没在干别的事，就是确保等号左边的数小于右边
            return Json(new { y = y, z = z });
        }
        
        /*public IActionResult Check(int input)
        {
            if (input == adder)
            {
                ViewBag.Msg = "Correct! Fetching new question...";
                ViewBag.Color = "green";
                RandomGene();
                return RedirectToAction("Index");
            }
            else
            {
                ViewBag.Msg = "Incorrect! Try again!";
                ViewBag.Color = "red";
                return RedirectToAction("Index");
            }
        }*/
    }
}

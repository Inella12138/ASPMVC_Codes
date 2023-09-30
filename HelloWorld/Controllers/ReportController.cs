using HelloWorld.Models;
using Microsoft.AspNetCore.Mvc;

namespace HelloWorld.Controllers
{
    public class ReportController : Controller
    {
        public IActionResult Index()
        {
            ViewData["Message"] = "This is the message from controller.";
            return View();
        }

        public IActionResult Message() 
        {
            MessageViewModel model = new MessageViewModel
            {
                Message = "new Hello View",
                From = "new Controller Message action"
            };

            return View(model);
        }
    }
}

using Microsoft.AspNetCore.Mvc;

namespace HelloWorld.Controllers
{
    public class HelloWorldController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}

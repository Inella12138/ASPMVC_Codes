using Microsoft.AspNetCore.Mvc;
using RazorWorkshop.Models;
using System.Diagnostics;
using System.Reflection.Metadata;

namespace RazorWorkshop.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index(string? searchStr)
        {
            List<Person> persons = new List<Person>();

            string errMessage = "";

            string[] names = { "Jerry", "Hogan", "Jean", "Kelly", "John", "Kim", "Larry" };
            string[] jobtitles = { "Software Engineer", "Data Scientist", "Consultant", 
                "Software Engineer", "Consultant", "Data Scientist", "Consultant" };
            string[] genders = { "M", "M", "F", "F", "M", "F", "M" };

            for (int i = 0; i < names.Length; i++)
            {
                if (searchStr != null)
                {
                    if (jobtitles[i].ToLower() == searchStr.ToLower())
                    {
                        persons.Add(new Person
                        {
                            Name = names[i],
                            JobTitle = jobtitles[i],
                            Gender = genders[i]
                        });
                    }
                }
                else
                {
                    persons.Add(new Person
                    {
                        Name = names[i],
                        JobTitle = jobtitles[i],
                        Gender = genders[i]
                    });
                }
            }

            ViewBag.persons = persons;

            if (persons.Count == 0) errMessage = "There are no matches.";
            ViewBag.err = errMessage;

            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
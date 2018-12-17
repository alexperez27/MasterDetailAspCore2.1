using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MasterDetail.Models;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace MasterDetail.Controllers
{
    [Route("[controller]")]
    public class HomeController : Controller
    {
        [HttpGet("/")]
        [HttpGet("[action]")]
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("[action]")]
        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        [HttpGet("[action]")]
        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        [HttpGet("[action]")]
        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
        [HttpGet("[action]/{Loaded?}")]
        public IActionResult MasterDetailIndex(bool Loaded = false)
        {
            Person data = new Person()
            {
                PersonId = 123,
                Name = "Alex",
                LastName = "Pérez"
            };

            InitList();

            if (Loaded)
            {
                data.PersonInfo = new List<PersonInfo>() {
                    new PersonInfo(){ Level=1,SchoolName="data 1",Year = 111},
                    new PersonInfo(){ Level=2,SchoolName="data 2",Year = 222}
                };
            }

            return View(data);
        }

        [HttpPost("[action]")]
        public IActionResult AddDetail(PersonInfo info)
        {
            InitList();
            return PartialView("_PersonInfoView", new List<PersonInfo>() { info });
        }

        [HttpPost("[action]")]
        public IActionResult SaveDetail(List<PersonInfo> items)
        {
            InitList();
            return PartialView("_PersonInfoView", items);
        }

        private void InitList()
        {
            List<SelectListItem> LevelsList = new List<SelectListItem>()
            {
                new SelectListItem { Value = "-1", Text = "Seleccione una opción" },
                new SelectListItem { Value = "1", Text = "Basico" },
                new SelectListItem { Value = "2", Text = "Intermedio" },
                new SelectListItem { Value = "3", Text = "Avanzado"  }
            };

            ViewBag.Levels = LevelsList;
        }
    }
}

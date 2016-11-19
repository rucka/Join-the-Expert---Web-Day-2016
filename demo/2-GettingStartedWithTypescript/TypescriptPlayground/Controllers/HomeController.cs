using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TypescriptPlayground.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Hello()
        {
            return View();
        }
        public ActionResult Hi(string id)
        {
            if (string.IsNullOrWhiteSpace(id)) return Json("Hello world!", JsonRequestBehavior.AllowGet);
            return Json(string.Format("Hello {0}!", id), JsonRequestBehavior.AllowGet);
        }
        public ActionResult Who(string id)
        {
            if (string.IsNullOrWhiteSpace(id)) return Json(new WhoInfo() { Singlename = "world" }, JsonRequestBehavior.AllowGet);

            var parts = id.Split(' ');
            if (parts.Length == 2)
            {
                return Json(new WhoInfo() { Firstname = parts[0], Lastname = parts[1] }, JsonRequestBehavior.AllowGet);
            }
            return Json(new WhoInfo() { Singlename = id }, JsonRequestBehavior.AllowGet);
        }

        public class WhoInfo
        {
            public string Firstname { get; set; }
            public string Lastname { get; set; }

            public string Singlename { get; set; }
            public bool HasSinglename { get { return !string.IsNullOrWhiteSpace(Singlename); } }
        }
    }
}
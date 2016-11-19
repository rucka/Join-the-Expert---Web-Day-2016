
using System.Web.Mvc;

namespace TypescriptPlayground.Controllers
{
    public class CustomerController : Controller
    {
        static int id = 1;
        public ActionResult Register()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Register(CustomerInfo customer)
        {
            if (customer == null)
            {
                throw new System.ArgumentNullException(nameof(customer));
            }
            return View("Completed", id++);
        }
    }
    public class CustomerInfo
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string VATCode { get; set; }
        public string Website { get; set; }
        public bool Accept { get; set; }
    }
}
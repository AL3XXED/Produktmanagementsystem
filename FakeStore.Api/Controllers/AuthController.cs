using Microsoft.AspNetCore.Mvc;

namespace FakeStore.Api.Controllers
{
    public class AuthController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}

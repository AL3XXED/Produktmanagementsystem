using Microsoft.AspNetCore.Mvc;

namespace FakeStore.Api.Controllers;
[ApiController]
[Route("api/[controller]")]

public class ProduktController : Controller
{
    [HttpGet]
    public IActionResult Get()
    {
        var produkt = new[]
        {
            new { Id = 1, Name = "Shirt", Preis = 10.99 },
            new { Id = 2, Name = "Sneakers", Preis = 20.99 },
            new { Id = 3, Name = "Ring", Preis = 30.99 }
        };
        return Ok(produkt);
    }
}

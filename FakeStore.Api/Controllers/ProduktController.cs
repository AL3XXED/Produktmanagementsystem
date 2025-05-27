using FakeStore.Api.Data;
using FakeStore.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FakeStore.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly ApplicationDbContext _db;
    private readonly HttpClient _http;

    public ProductsController(ApplicationDbContext db, IHttpClientFactory httpFactory)
    {
        _db = db;
        _http = httpFactory.CreateClient();
    }

    [HttpGet]
    public async Task<IActionResult> GetCombinedProducts()
    {
        var localProducts = await _db.Products
            .Select(p => new CombinedProductDto
            {
                Id = p.Id,
                Title = p.Name,
                Category = p.Category,
                Price = p.Price, 
                Description = p.Description,
                Image = p.ImageUrl,
                Source = "local"
            })
            .ToListAsync();

        List<CombinedProductDto> externalProducts = new();
        try
        {
            var response = await _http.GetFromJsonAsync<List<FakeStoreProductDto>>("https://fakestoreapi.com/products");
            if (response != null)
            {
                externalProducts = response.Select(p => new CombinedProductDto
                {
                    Id = p.Id,
                    Title = p.Title,
                    Category = p.Category,
                    Price = p.Price,
                    Description = p.Description,
                    Image = p.Image,
                    Source = "fakestore"
                }).ToList();
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine("FakeStore API Fehler: " + ex.Message);
        }

        var combined = localProducts.Concat(externalProducts).ToList();
        return Ok(combined);
    }
}

using FakeStore.Api.Data;
using FakeStore.Api.Models;
using Microsoft.AspNetCore.Authorization;
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
                    Id = 9999 + p.Id,
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

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CreateProduct([FromBody] Product product)
    {
        _db.Products.Add(product);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetCombinedProducts), new { id = product.Id }, product);
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> UpdateProduct(int id, [FromBody] Product updated)
    {
        var existing = await _db.Products.FindAsync(id);
        if (existing == null)
            return NotFound();

        existing.Name = updated.Name;
        existing.Category = updated.Category;
        existing.Price = updated.Price;
        existing.Description = updated.Description;
        existing.ImageUrl = updated.ImageUrl;

        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        var existing = await _db.Products.FindAsync(id);
        if (existing == null)
            return NotFound();

        _db.Products.Remove(existing);
        await _db.SaveChangesAsync();
        return NoContent();
    }

}

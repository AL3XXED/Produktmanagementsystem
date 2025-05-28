using FakeStore.Api.Models;

namespace FakeStore.Api.Data;

public class SeedData
{
    public static void Seed(ApplicationDbContext context)
    {
        if (context.Products.Any()) return;

        var product = new List<Product>
        {
            new Product
            {
                Name = "Lokales Produkt A",
                Category = "Elektronik",
                Price = 49.99m,
                Description = "Ein lokal gespeichertes Testprodukt A.",
                ImageUrl = "https://static.vecteezy.com/system/resources/previews/000/582/035/original/copyright-symbol-icon-vector-illustration.jpg"
            }
        };

        context.Products.AddRange(product);
        context.SaveChanges();
    }
}

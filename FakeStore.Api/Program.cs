using FakeStore.Api.Data;
using Microsoft.EntityFrameworkCore;

namespace FakeStore.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // 1. Datenbank hinzufügen (EF Core mit SQLite)
            builder.Services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlite("Data Source=app.db"));

            // 2. HTTP Client (für fakestoreapi.com)
            builder.Services.AddHttpClient();

            // 3. CORS aktivieren (wichtig für React-Frontend!)
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins",
                    policy => policy.AllowAnyOrigin()
                                    .AllowAnyMethod()
                                    .AllowAnyHeader());
            });

            // 4. Controller + Swagger
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // 5. DB automatisch erstellen beim Start (optional, für lokale Entwicklung)
            using (var scope = app.Services.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                db.Database.EnsureCreated();
            }

            // 6. Dev-spezifisches Setup
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            // 7. HTTPS, CORS, Auth, Routing
            app.UseHttpsRedirection();

            app.UseCors("AllowAllOrigins");

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}

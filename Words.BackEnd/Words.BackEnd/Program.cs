using Infrastructure;
using Microsoft.EntityFrameworkCore;
using Words.BackEnd.Controller;

namespace Words.BackEnd {
    public class Program {
        public static void Main(string[] args) {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddAuthorization();

            builder.Services.AddDbContext<WordDbContext>(options => options.UseSqlite(builder.Configuration.GetConnectionString("ConnectionDb")));

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddControllers();

            builder.Services.AddScoped<WordController>();

            builder.Services.AddCors(options => {
                options.AddPolicy("AllowAll",
                    builder => {
                        builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                    });
            });

            var app = builder.Build();

            app.UseCors("AllowAll");

            app.UseRouting();
            app.UseAuthorization();
            app.UseEndpoints(endpoints => {
                endpoints.MapControllers();
            });

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment()) {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();


            app.Run();
        }
    }
}
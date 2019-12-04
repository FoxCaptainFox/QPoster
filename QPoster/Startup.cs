using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using QPoster.Database;
using QPoster.Database.Context;
using QPoster.Database.Models;
using QPoster.Services;
using QPoster.Services.Interfaces;
using QPoster.WebSockets;
using Swashbuckle.AspNetCore.Swagger;
using System;

namespace QPoster
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
			services.AddDbContext<DataContext>(options => options.UseSqlServer(Configuration.GetConnectionString("Connection")));

            services.AddTransient<IRepository<Transaction>, Repository<Transaction>>();
            services.AddTransient<IRepository<TransactionProducts>, Repository<TransactionProducts>>();
            services.AddTransient<ITransactionService, TransactionService>();
            services.AddSingleton<ConnectionManager>();
            services.AddSingleton<WebSocketHandler, NotificationSocketHandler>();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "QPoster Server API" });
            });
            
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, IServiceProvider serviceProvider)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }
            
            app.UseWebSockets(new WebSocketOptions()
            {
                KeepAliveInterval = TimeSpan.FromSeconds(5),
                ReceiveBufferSize = 4 * 1024
            });
            
            app.MapWebSocketManager("/ws", serviceProvider.GetService<WebSocketHandler>());

            app.UseFileServer();

            app.UseStaticFiles();

            app.UseSwagger();
            
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "QPoster Server API");
            });

            app.UseHttpsRedirection();
            app.UseMvc();

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    // spa.UseAngularCliServer(npmScript: "start");
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
                }
            });
        }
    }
}

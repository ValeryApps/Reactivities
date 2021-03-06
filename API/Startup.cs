﻿using System.Text;
using API.Middlewares;
using Application.Activities;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation.AspNetCore;
using Infrastructure.Security;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API
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
         services.AddDbContext<DataContext>(opt =>
         {
            
            opt.UseSqlServer(Configuration["ConnectionStrings:DBCS"]);
         });
         services.AddCors(opt =>
         {
            opt.AddPolicy("CorsPolicy",
               policy =>
               {
                  policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
               });
         });

         services.AddScoped<IJWTokenGenerator, JWTokenGenerator>();
         services.AddScoped<IUserAccessor, UserAccessor>();
         services.AddMediatR(typeof(List.Handler).Assembly);
         services.AddAutoMapper(typeof(List.Handler).Assembly);
         services.AddMvc(opt =>
         {
            var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
            opt.Filters.Add(new AuthorizeFilter(policy));
         })
         .AddFluentValidation(cfg => 
            cfg.RegisterValidatorsFromAssemblyContaining<Create>()).SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

         var builder = services.AddIdentityCore<AppUser>();
         var identityBuilder = new IdentityBuilder(builder.UserType, builder.Services);
         identityBuilder.AddEntityFrameworkStores<DataContext>();
         identityBuilder.AddSignInManager<SignInManager<AppUser>>();

         services.AddAuthorization(opt =>
         {
            opt.AddPolicy("IsActivityHost", policy => { policy.Requirements.Add(new IsHostRequirement()); });
         });
         services.AddTransient<IAuthorizationHandler, IsHostRequirementHandler>();
            
         var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["TokenKey"]));
         services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(opt =>
            {
               opt.TokenValidationParameters = new TokenValidationParameters
               {
                  ValidateIssuerSigningKey = true,
                  IssuerSigningKey = key,
                  ValidateAudience = false,
                  ValidateIssuer = false
               };
            });

      }

      // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
      public void Configure(IApplicationBuilder app, IHostingEnvironment env)
      {
         app.UseMiddleware<ErrorHandlingMiddleware>();
         if (env.IsDevelopment())
         {
            // app.UseDeveloperExceptionPage();
         }
         else
         {
            // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            // app.UseHsts();
         }

         app.UseAuthentication();
         app.UseCors("CorsPolicy");
         app.UseMvc();
      }
   }
}

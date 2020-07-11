using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Application.Validators;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.User
{
   public class Register
   {
      public class Command : IRequest<User>
      {
         public string DisplayName { get; set; }
         public string Username { get; set; }
         public string Email { get; set; }
         public string Password { get; set; }

      }

      public class CommandValidator : AbstractValidator<Command>
      {
         public CommandValidator()
         {
            RuleFor(x => x.DisplayName).NotEmpty();
            RuleFor(x => x.Username).NotEmpty();
            RuleFor(x => x.Email).NotEmpty();
            RuleFor(x => x.Password).Password();

         }
      }
      public class Handler : IRequestHandler<Command, User>
      {
         private readonly DataContext _context;
         private readonly UserManager<AppUser> _userManager;
         private readonly IJWTokenGenerator _jwt;

         public Handler(DataContext context, UserManager<AppUser> userManager, IJWTokenGenerator jwt)
         {
            _jwt = jwt;
            _context = context;
            _userManager = userManager;
         }
         public async Task<User> Handle(Command request, CancellationToken cancellationToken)
         {
            if (await _context.Users.AnyAsync(x => x.Email == request.Email))
               throw new RestException(HttpStatusCode.BadRequest, new { Email = "This email is already taken" });

            if (await _context.Users.AnyAsync(x => x.UserName == request.Username))
               throw new RestException(HttpStatusCode.BadRequest, new { Username = "This username is already taken" });
            var user = new AppUser
            {
               DisplayName = request.DisplayName,
               UserName = request.Username,
               Email = request.Email
            };
            var result = await _userManager.CreateAsync(user, request.Password);

            if (result.Succeeded)
            {
               return new User
               {
                  DisplayName = user.DisplayName,
                  Username = user.UserName,
                  Token = _jwt.CreatToken(user),
                  Image = null

               };
            }
            throw new Exception("Saving new changes failed");
         }
      }
   }
}
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.User
{
   public class Login
   {
      public class Query : IRequest<User>
      {
         public string Email { get; set; }
         public string Password { get; set; }
      }

      public class commandValidator : AbstractValidator<Query>
      {
         public commandValidator()
         {
            RuleFor(x => x.Email).NotEmpty();
            RuleFor(x => x.Password).NotEmpty();

         }
      }
      public class Handler : IRequestHandler<Query, User>
      {
         private readonly UserManager<AppUser> _userManager;
         private readonly SignInManager<AppUser> _signInManager;
         private readonly IJWTokenGenerator _tokenGenerator;
         public Handler(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IJWTokenGenerator tokenGenerator)
         {
            _tokenGenerator = tokenGenerator;
            _signInManager = signInManager;
            _userManager = userManager;

         }

         public async Task<User> Handle(Query request, CancellationToken cancellationToken)
         {
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null)
               throw new RestException(HttpStatusCode.Unauthorized);

            var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);
            if (result.Succeeded)
            {
               return new User
               {
                  DisplayName = user.DisplayName,
                  Username = user.UserName,
                  Token = _tokenGenerator.CreatToken(user),
                  Image = null
               };
            }
            throw new RestException(HttpStatusCode.Unauthorized);
         }
      }
   }
}

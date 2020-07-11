using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Application.Interfaces;
using Domain;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.Security
{
   public class JWTokenGenerator : IJWTokenGenerator
   {
      private readonly SymmetricSecurityKey _key;
      public JWTokenGenerator(IConfiguration config)
      {
         _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
      }

      public string CreatToken(AppUser user)
      {
         var claims = new List<Claim>
         {
            new Claim(JwtRegisteredClaimNames.NameId, user.UserName)
         };
         var cred = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);
         var tokenDescriptor = new SecurityTokenDescriptor
         {
            SigningCredentials = cred,
            Expires = DateTime.Now.AddDays(7),
            Subject = new ClaimsIdentity(claims)
         };
         var tokenHandler = new JwtSecurityTokenHandler();
         var token = tokenHandler.CreateToken(tokenDescriptor);
         return tokenHandler.WriteToken(token);
      }
   }
}
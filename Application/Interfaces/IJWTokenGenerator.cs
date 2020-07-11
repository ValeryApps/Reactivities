using Domain;

namespace Application.Interfaces
{
   public interface IJWTokenGenerator
   {
      string CreatToken(AppUser user);
   }
}
using FluentValidation;

namespace Application.Validators
{
   public static class ValidatorExtensions
   {
      public static IRuleBuilder<T, string> Password<T>(this IRuleBuilder<T, string> ruleBuilder)
      {
         var options = ruleBuilder
             .NotEmpty()
             .Matches("[A-Z]").WithMessage("Uppercase letter required")
             .Matches("[a-z]").WithMessage("Lowercase letter required")
             .Matches("[0-9]").WithMessage("At least one digit required")
             .MinimumLength(6).WithMessage("Password must be at least 6 characters long")
             .Matches("[^a-zA-Z0-9]").WithMessage("At least one nonalphabetical letter required");
         return options;
      }
   }
}
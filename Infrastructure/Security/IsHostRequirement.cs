using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
    public class IsHostRequirement:IAuthorizationRequirement
    {
        
    }

    public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly DataContext _context;

        public IsHostRequirementHandler(IHttpContextAccessor httpContextAccessor, DataContext context)
        {
            _httpContextAccessor = httpContextAccessor;
            _context = context;
        }
        protected override  Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
        {
            var currentUserName = _httpContextAccessor.HttpContext.User?.Claims
                ?.SingleOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
            var activityId = Guid.Parse(_httpContextAccessor.HttpContext.Request.HttpContext.GetRouteValue("id").ToString());
            var activity = _context.Activities.FindAsync(activityId).Result;
            var host =_context.UserActivities.FirstOrDefault(x => x.IsHost);
            var appUser = _context.Users.FirstOrDefaultAsync(x => x.Id == host.AppUserId).Result;
            if(appUser?.UserName == currentUserName)
                context.Succeed(requirement);
            return Task.CompletedTask;
        }
    }
}
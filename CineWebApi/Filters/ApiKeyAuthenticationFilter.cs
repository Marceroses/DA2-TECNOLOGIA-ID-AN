using Cine.BusinessLogic.Abstractions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Cine.Filters;

public sealed class ApiKeyAuthenticationFilter(params string[] allowedRoles) : Attribute, IAuthorizationFilter
{
    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var token = context.HttpContext.Request.Headers.Authorization.FirstOrDefault();
        if (string.IsNullOrWhiteSpace(token))
        {
            context.Result = new ObjectResult("Authorization header is needed")
            {
                StatusCode = StatusCodes.Status401Unauthorized
            };
            return;
        }

        var role = context.HttpContext.RequestServices
            .GetRequiredService<ISessionService>()
            .GetRole(token);

        if (role is null)
        {
            context.Result = new ObjectResult("The token does not correspond to a existing user")
            {
                StatusCode = StatusCodes.Status401Unauthorized
            };
            return;
        }

        if (!allowedRoles.Contains(role, StringComparer.OrdinalIgnoreCase))
        {
            context.Result = new ObjectResult("The user is not authorized for this action")
            {
                StatusCode = StatusCodes.Status403Forbidden
            };
        }
    }
}

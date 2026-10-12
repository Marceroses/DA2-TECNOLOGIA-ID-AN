using Cine.BusinessLogic.Abstractions;

namespace Cine.BusinessLogic;

public sealed class SessionService : ISessionService
{
    private static readonly Dictionary<string, string> RolesByToken = new(StringComparer.OrdinalIgnoreCase)
    {
        ["29673a65-74f1-4f90-a6d1-49a106c9d03e"] = SessionRoles.Administrador,
        ["7c9e6679-7425-40de-944b-e07fc1f90ae7"] = SessionRoles.Usuario
    };

    public string? GetRole(string token)
    {
        return RolesByToken.TryGetValue(token, out var role) ? role : null;
    }
}

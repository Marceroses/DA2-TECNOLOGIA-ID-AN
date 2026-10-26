namespace Cine.BusinessLogic.Abstractions;

public interface ISessionService
{
    string? GetRole(string token);
}

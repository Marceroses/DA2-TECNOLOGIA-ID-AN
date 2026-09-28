using Cine.Domain;

namespace Cine.BusinessLogic.Abstractions;

public interface IActorService
{
    IReadOnlyList<Actor> GetAll();
    Actor? GetById(int id);
}
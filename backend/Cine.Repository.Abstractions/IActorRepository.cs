using Cine.Domain;

namespace Cine.Repository.Abstractions;

public interface IActorRepository
{
    IReadOnlyList<Actor> GetAll();
    Actor? GetById(int id);
}
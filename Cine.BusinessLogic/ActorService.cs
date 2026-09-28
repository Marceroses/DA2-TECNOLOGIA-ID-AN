using Cine.BusinessLogic.Abstractions;
using Cine.Domain;
using Cine.Repository.Abstractions;

namespace Cine.BusinessLogic;

public sealed class ActorService(IActorRepository actorRepository) : IActorService
{
    public IReadOnlyList<Actor> GetAll() => actorRepository.GetAll();

    public Actor? GetById(int id) => actorRepository.GetById(id);
}
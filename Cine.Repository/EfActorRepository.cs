using Cine.Domain;
using Cine.Repository.Abstractions;
using Microsoft.EntityFrameworkCore;

namespace Cine.Repository;

public sealed class EfActorRepository(CineDbContext dbContext) : IActorRepository
{
    public IReadOnlyList<Actor> GetAll()
    {
        return dbContext.Actors
            .Include(actor => actor.Movies)
            .AsNoTracking()
            .ToList();
    }

    public Actor? GetById(int id)
    {
        return dbContext.Actors
            .Include(actor => actor.Movies)
            .AsNoTracking()
            .FirstOrDefault(actor => actor.Id == id);
    }
}
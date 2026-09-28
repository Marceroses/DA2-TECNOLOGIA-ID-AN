using Cine.Contracts;
using Cine.Domain;

namespace Cine.Mappings;

public static class ActorMapping
{
    public static ActorDto ToDto(this Actor actor)
    {
        return new ActorDto
        {
            Id = actor.Id,
            Name = actor.Name,
            Movies = actor.Movies
                .Select(movie => new MovieSummaryDto(movie.Id, movie.Title, movie.Stars))
                .ToArray()
        };
    }
}
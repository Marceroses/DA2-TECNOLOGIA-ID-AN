namespace Cine.Contracts;

/// <summary>Movie data returned by the API, including its actors.</summary>
public sealed record MovieDto
{
    public int Id { get; init; }
    public required string Title { get; init; }
    public double Stars { get; init; }
    /// <summary>Actors associated with this movie.</summary>
    public IReadOnlyList<ActorSummaryDto> Actors { get; init; } = Array.Empty<ActorSummaryDto>();
}

namespace Cine.Contracts;

/// <summary>Movie details included in an actor response.</summary>
public sealed record MovieSummaryDto(int Id, string Title, double Stars);
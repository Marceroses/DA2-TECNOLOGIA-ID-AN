// Mirrors Cine.Contracts.ActorDto / MovieSummaryDto from the backend.
export interface MovieSummary {
  id: number;
  title: string;
  stars: number;
}

export interface Actor {
  id: number;
  name: string;
  movies: MovieSummary[];
}

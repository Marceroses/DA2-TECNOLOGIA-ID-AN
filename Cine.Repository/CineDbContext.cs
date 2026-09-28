using Cine.Domain;
using Microsoft.EntityFrameworkCore;

namespace Cine.Repository;

public class CineDbContext(DbContextOptions<CineDbContext> options) : DbContext(options)
{
    public virtual DbSet<Movie> Movies => Set<Movie>();
    public virtual DbSet<Actor> Actors => Set<Actor>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Movie>(entity =>
        {
            entity.HasKey(m => m.Id);
            entity.Property(m => m.Id).ValueGeneratedOnAdd();
            entity.Property(m => m.Title).IsRequired();
        });

        modelBuilder.Entity<Actor>(entity =>
        {
            entity.HasKey(actor => actor.Id);
            entity.Property(actor => actor.Id).ValueGeneratedOnAdd();
            entity.Property(actor => actor.Name).IsRequired();
        });

        modelBuilder.Entity<Movie>()
            .HasMany(movie => movie.Actors)
            .WithMany(actor => actor.Movies)
            .UsingEntity<Dictionary<string, object>>(
                "MovieActor",
                join => join.HasOne<Actor>().WithMany().HasForeignKey("ActorId"),
                join => join.HasOne<Movie>().WithMany().HasForeignKey("MovieId"),
                join =>
                {
                    join.ToTable("MovieActors");
                    join.HasKey("MovieId", "ActorId");
                });

        modelBuilder.Entity<Movie>().HasData(
            new Movie { Id = 1001, Title = "Silver Meridian", Stars = 4.5 },
            new Movie { Id = 1002, Title = "Glass Harbor", Stars = 4.2 },
            new Movie { Id = 1003, Title = "The Last Signal", Stars = 4.7 },
            new Movie { Id = 1004, Title = "Paper Kingdom", Stars = 3.9 },
            new Movie { Id = 1005, Title = "Winter Circuit", Stars = 4.1 });

        modelBuilder.Entity<Actor>().HasData(
            new Actor { Id = 2001, Name = "Elena Cruz" },
            new Actor { Id = 2002, Name = "Mateo Vidal" },
            new Actor { Id = 2003, Name = "Ines Navarro" },
            new Actor { Id = 2004, Name = "Tomas Rios" },
            new Actor { Id = 2005, Name = "Lucia Mar" },
            new Actor { Id = 2006, Name = "Gabriel Soto" },
            new Actor { Id = 2007, Name = "Nora Valdez" },
            new Actor { Id = 2008, Name = "Adrian Ponce" },
            new Actor { Id = 2009, Name = "Vera Montes" },
            new Actor { Id = 2010, Name = "Bruno Salas" });

        modelBuilder.Entity("MovieActor").HasData(
            new { MovieId = 1001, ActorId = 2001 },
            new { MovieId = 1001, ActorId = 2002 },
            new { MovieId = 1001, ActorId = 2005 },
            new { MovieId = 1002, ActorId = 2002 },
            new { MovieId = 1002, ActorId = 2003 },
            new { MovieId = 1002, ActorId = 2006 },
            new { MovieId = 1003, ActorId = 2001 },
            new { MovieId = 1003, ActorId = 2004 },
            new { MovieId = 1003, ActorId = 2007 },
            new { MovieId = 1004, ActorId = 2005 },
            new { MovieId = 1004, ActorId = 2008 },
            new { MovieId = 1004, ActorId = 2010 },
            new { MovieId = 1005, ActorId = 2003 },
            new { MovieId = 1005, ActorId = 2006 },
            new { MovieId = 1005, ActorId = 2009 });
    }
}

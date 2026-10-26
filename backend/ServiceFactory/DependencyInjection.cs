using Cine.BusinessLogic.Abstractions;
using Cine.Repository.Abstractions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Cine.BusinessLogic;
using Cine.Repository;

namespace Cine.ServiceFactory;

public static class DependencyInjection
{
    public static IServiceCollection AddCineDependencies(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("CineDb")
            ?? throw new InvalidOperationException("Connection string 'CineDb' is required.");
        services.AddDbContext<CineDbContext>(options => options.UseSqlServer(connectionString));
        services.AddScoped<IMovieRepository, EfMovieRepository>();
        services.AddScoped<IActorRepository, EfActorRepository>();
        services.AddScoped<IMovieService, MovieService>();
        services.AddScoped<IActorService, ActorService>();
        services.AddScoped<ISessionService, SessionService>();

        return services;
    }
}

using Cine.BusinessLogic.Abstractions;
using Cine.Contracts;
using Cine.Controllers;
using Cine.Domain;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace Cine.Tests;

[TestClass]
public sealed class ActorsControllerTests
{
    private Mock<IActorService> _actorServiceMock = null!;
    private ActorsController _controller = null!;

    [TestInitialize]
    public void TestInitialize()
    {
        _actorServiceMock = new Mock<IActorService>(MockBehavior.Strict);
        _controller = new ActorsController(_actorServiceMock.Object);
    }

    [TestMethod]
    public void GetAll_ReturnsActorsWithMovieSummaries()
    {
        var actors = new List<Actor>
        {
            new()
            {
                Id = 1,
                Name = "Actor A",
                Movies = [new Movie { Id = 10, Title = "Movie A", Stars = 4.5 }]
            }
        };
        _actorServiceMock.Setup(service => service.GetAll()).Returns(actors);

        var response = _controller.GetAll();

        var ok = response.Result as OkObjectResult;
        Assert.IsNotNull(ok);
        var dtos = (ok.Value as IEnumerable<ActorDto>)?.ToList();
        Assert.IsNotNull(dtos);
        Assert.AreEqual(1, dtos.Count);
        Assert.AreEqual("Movie A", dtos[0].Movies.Single().Title);
        _actorServiceMock.VerifyAll();
    }

    [TestMethod]
    public void GetById_WhenNotFound_ReturnsNotFound()
    {
        _actorServiceMock.Setup(service => service.GetById(99)).Returns((Actor?)null);

        var response = _controller.GetById(99);

        Assert.IsInstanceOfType<NotFoundResult>(response.Result);
        _actorServiceMock.VerifyAll();
    }
}
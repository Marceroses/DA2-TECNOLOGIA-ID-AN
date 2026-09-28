using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Cine.Repository.Migrations
{
    /// <inheritdoc />
    public partial class AddActorsAndSampleCatalog : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Actors",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Actors", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MovieActors",
                columns: table => new
                {
                    MovieId = table.Column<int>(type: "int", nullable: false),
                    ActorId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MovieActors", x => new { x.MovieId, x.ActorId });
                    table.ForeignKey(
                        name: "FK_MovieActors_Actors_ActorId",
                        column: x => x.ActorId,
                        principalTable: "Actors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MovieActors_Movies_MovieId",
                        column: x => x.MovieId,
                        principalTable: "Movies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Actors",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 2001, "Elena Cruz" },
                    { 2002, "Mateo Vidal" },
                    { 2003, "Ines Navarro" },
                    { 2004, "Tomas Rios" },
                    { 2005, "Lucia Mar" },
                    { 2006, "Gabriel Soto" },
                    { 2007, "Nora Valdez" },
                    { 2008, "Adrian Ponce" },
                    { 2009, "Vera Montes" },
                    { 2010, "Bruno Salas" }
                });

            migrationBuilder.InsertData(
                table: "Movies",
                columns: new[] { "Id", "Stars", "Title" },
                values: new object[,]
                {
                    { 1001, 4.5, "Silver Meridian" },
                    { 1002, 4.2000000000000002, "Glass Harbor" },
                    { 1003, 4.7000000000000002, "The Last Signal" },
                    { 1004, 3.8999999999999999, "Paper Kingdom" },
                    { 1005, 4.0999999999999996, "Winter Circuit" }
                });

            migrationBuilder.InsertData(
                table: "MovieActors",
                columns: new[] { "ActorId", "MovieId" },
                values: new object[,]
                {
                    { 2001, 1001 },
                    { 2002, 1001 },
                    { 2005, 1001 },
                    { 2002, 1002 },
                    { 2003, 1002 },
                    { 2006, 1002 },
                    { 2001, 1003 },
                    { 2004, 1003 },
                    { 2007, 1003 },
                    { 2005, 1004 },
                    { 2008, 1004 },
                    { 2010, 1004 },
                    { 2003, 1005 },
                    { 2006, 1005 },
                    { 2009, 1005 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_MovieActors_ActorId",
                table: "MovieActors",
                column: "ActorId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MovieActors");

            migrationBuilder.DropTable(
                name: "Actors");

            migrationBuilder.DeleteData(
                table: "Movies",
                keyColumn: "Id",
                keyValue: 1001);

            migrationBuilder.DeleteData(
                table: "Movies",
                keyColumn: "Id",
                keyValue: 1002);

            migrationBuilder.DeleteData(
                table: "Movies",
                keyColumn: "Id",
                keyValue: 1003);

            migrationBuilder.DeleteData(
                table: "Movies",
                keyColumn: "Id",
                keyValue: 1004);

            migrationBuilder.DeleteData(
                table: "Movies",
                keyColumn: "Id",
                keyValue: 1005);
        }
    }
}

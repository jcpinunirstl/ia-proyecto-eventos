using Microsoft.EntityFrameworkCore;
using IaProyectoEventos.Models;

namespace IaProyectoEventos.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<Evento> Eventos { get; set; }
        public DbSet<IaProyectoEventos.Models.TipoEvento> TipoEventos { get; set; }
    }
}

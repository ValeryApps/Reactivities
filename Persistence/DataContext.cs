using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions options):base(options){ }

        public DbSet<Value> Values { get; set; }
        public DbSet<Activity> Activities { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Value>()
                .HasData(
                    new Value {Id = 001, Name = "Value 001"},
                    new Value {Id = 002, Name = "Value 002"},
                    new Value {Id = 003, Name = "Value 003"},
                    new Value {Id = 004, Name = "Value 004"},
                    new Value {Id = 005, Name = "Value 005"}
                );
        }
    }
}

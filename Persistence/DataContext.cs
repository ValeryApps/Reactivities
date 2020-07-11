using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
   public class DataContext : IdentityDbContext<AppUser>
   {
      public DataContext(DbContextOptions options) : base(options) { }

      public DbSet<Value> Values { get; set; }
      public DbSet<Activity> Activities { get; set; }
      public DbSet<UserActivity> UserActivities { get; set; }

      protected override void OnModelCreating(ModelBuilder modelBuilder)
      {
         base.OnModelCreating(modelBuilder);
         modelBuilder.Entity<Value>()
             .HasData(
                 new Value { Id = 001, Name = "Value 001" },
                 new Value { Id = 002, Name = "Value 002" },
                 new Value { Id = 003, Name = "Value 003" },
                 new Value { Id = 004, Name = "Value 004" },
                 new Value { Id = 005, Name = "Value 005" }
             );
         modelBuilder.Entity<UserActivity>(x => x.HasKey(ua => new { ua.AppUserId, ua.ActivityId }));

         modelBuilder.Entity<UserActivity>()
             .HasOne(x => x.AppUser)
             .WithMany(ua => ua.UserActivities)
             .HasForeignKey(key => key.AppUserId);

         modelBuilder.Entity<UserActivity>()
             .HasOne(a => a.Activity)
             .WithMany(ua => ua.UserActivities)
             .HasForeignKey(key => key.ActivityId);
      }
   }
}

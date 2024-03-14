using Domain;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure {
    public class WordDbContext : DbContext {
        public DbSet<Word> Words { get; set; }

        public WordDbContext(DbContextOptions<WordDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            base.OnModelCreating(modelBuilder);
        }
    }
}

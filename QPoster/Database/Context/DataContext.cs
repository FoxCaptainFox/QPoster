using Microsoft.EntityFrameworkCore;
using QPoster.Database.Models;

namespace QPoster.Database.Context
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Transaction> Transactions { get; set; }
        public virtual DbSet<TransactionProducts> TransactionProducts { get; set; }
    }
}

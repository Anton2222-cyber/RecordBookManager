﻿using Microsoft.EntityFrameworkCore;
using RecordDataBook.Entities;

namespace RecordDataBook.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Record> Records { get; set; }
    }
}

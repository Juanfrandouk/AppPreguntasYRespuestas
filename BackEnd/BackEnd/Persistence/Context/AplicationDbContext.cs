﻿using BackEnd.Domain.Models;

using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Persistence.Context
{
    public class AplicationDbContext : DbContext
    {

        public DbSet<Usuario> Usuario { get; set; }

        public DbSet<Pregunta> Pregunta { get; set; }

        public DbSet<Cuestionario> Cuestionario { get; set; }

        public DbSet<Respuesta> Respuesta { get; set; }

        public DbSet<RespuestaCuestionario> RespuestaCuestionario { get; set; }

        public DbSet<RespuestaCuestionarioDetalle> RespuestaCuestionarioDetalle { get; set; }


        public AplicationDbContext(DbContextOptions<AplicationDbContext> options) : base(options)
        {

        }

        public AplicationDbContext()
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)

        {
            //modelBuilder.Entity<RespuestaCuestionarioDetalle>()

            //  .HasOne(c => c.RespuestaCuestionario)

            //  .WithMany(c => c.ListRtaCuestionarioDetalle)

            //  .HasForeignKey(c => c.RespuestaCuestionarioId)

            //  .OnDelete(DeleteBehavior.Restrict);

        }


    }
}

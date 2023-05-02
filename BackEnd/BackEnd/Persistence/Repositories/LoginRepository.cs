using BackEnd.Domain.IRepositories;
using BackEnd.Domain.Models;
using BackEnd.Persistence.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Persistence.Repositories
{
    public class LoginRepository : ILoginRepository
    {
        private readonly AplicationDbContext _context;


        public LoginRepository(AplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Usuario> ValidateUser(Usuario usuario)
        {

            try
            {
                var user = await _context.Usuario.Where(x => x.NombreUsuario == usuario.NombreUsuario &&
                                                    x.Password == usuario.Password).FirstOrDefaultAsync();
                return user;
            }
            catch (Exception ex)
            {
                var user = new Usuario();
                return user;
            }



        }
    }
}

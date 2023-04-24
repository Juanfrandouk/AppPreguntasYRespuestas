using BackEnd.Domain.IRepositories;
using BackEnd.Domain.IServices;
using BackEnd.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Services
{
    public class RespuestaCuestionarioService : IRespuestaCuestionarioService
    {
        private readonly IRespuestaCuestionarioRepository _rtaCuestionarioRepository;
        public RespuestaCuestionarioService(IRespuestaCuestionarioRepository rtaCuestionarioRepository)
        {
            _rtaCuestionarioRepository = rtaCuestionarioRepository;
        }


        public async Task SaveRespuestaCuestionario(RespuestaCuestionario respuestaCuestionario)
        {
            await _rtaCuestionarioRepository.SaveRespuestaCuestionario(respuestaCuestionario);
        }

        public async Task<List<RespuestaCuestionario>> ListRespuestaCuestionario(int idCuestionario, int idUsuario)
        {
            return await _rtaCuestionarioRepository.ListRespuestaCuestionario(idCuestionario, idUsuario);
        }

        public async Task<RespuestaCuestionario> BuscarRespuestaCuestionario(int idRtaCuestionario, int idUsuario)
        {
            return await _rtaCuestionarioRepository.BuscarRespuestaCuestionario(idRtaCuestionario, idUsuario);

        }

        public async Task EliminarRespuestaCuestionario(RespuestaCuestionario respuestaCuestionario)
        {
            await _rtaCuestionarioRepository.EliminarRespuestaCuestionario(respuestaCuestionario);
        }





        public async Task<int> GetIdCuestionarioByIdRespuesta(int idRespuestaCuestionario)
        {
            return await _rtaCuestionarioRepository.GetIdCuestionarioByIdRespuesta(idRespuestaCuestionario);
        }

        public async Task<List<RespuestaCuestionarioDetalle>> GetListRespuestas(int idRespuestaCuestionario)
        {
            return await _rtaCuestionarioRepository.GetListRespuestas(idRespuestaCuestionario);
        }
    }
}

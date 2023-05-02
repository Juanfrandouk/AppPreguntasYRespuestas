using BackEnd.Domain.IServices;
using BackEnd.Domain.Models;
using BackEnd.Utils;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CuestionarioController : ControllerBase
    {
        private readonly ICuestionarioService _cuestionarioService;
        private readonly ILogger _ilogger;
        public CuestionarioController(ICuestionarioService cuestionarioService,
                                      ILogger<CuestionarioController> ilogger)
        {
            _cuestionarioService = cuestionarioService;
            _ilogger = ilogger;
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Post([FromBody] Cuestionario cuestionario)
        {
            try
            {
                _ilogger.LogInformation("Cuestionario log");
                Serilog.Log.Information("Called BackEnd");
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                int idUsuario = JwtConfigurator.GetTokenIdUsuario(identity);
                cuestionario.UsuarioId = idUsuario;
                cuestionario.Activo = 1;
                cuestionario.FechaCreacion = DateTime.Now;
                await _cuestionarioService.CreateCuestionario(cuestionario);
                return Ok(new { message = "Cuestionario registrado con exito" });
            }
            catch (Exception ex)
            {
                _ilogger.LogWarning("Cuetionario Post" + ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [Route("GetListCuestionarioByUser")]
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetListCuestionarioByUser()
        {
            try
            {
                _ilogger.LogInformation("Cuestionario log");
                Serilog.Log.Information("Called BackEnd");
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                int idUsuario = JwtConfigurator.GetTokenIdUsuario(identity);
                var listCuestionarios = await _cuestionarioService.GetListCuestionarioByUser(idUsuario);
                //if (listCuestionarios.Count == 0)
                //{
                //    return BadRequest(new { message = "No existe cuestionario registrado para el usuario indicado" });
                //}
                return Ok(listCuestionarios);
            }
            catch (Exception ex)
            {
                _ilogger.LogWarning("Cuetionario Post" + ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("{idCuestionario}")]
        //  [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Get(int idCuestionario)
        {
            try
            {

                var cuestionario = await _cuestionarioService.GetCuestionario(idCuestionario);

                return Ok(cuestionario);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{idCuestionario}")]
        public async Task<IActionResult> Delete(int idCuestionario)
        {
            try
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                int idUsuario = JwtConfigurator.GetTokenIdUsuario(identity);

                var cuestionario = await _cuestionarioService.BuscarCuestionario(idCuestionario, idUsuario);
                if (cuestionario == null)
                {
                    return BadRequest(new { message = "Cuestionario no encontrado" });
                }

                await _cuestionarioService.EliminarCuestionario(cuestionario);
                return Ok(new { message = "Cuestionario Eliminado satisfactoriamente" });
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
        [Route("GetListCuestionarios")]
        [HttpGet]
        public async Task<IActionResult> GetListCuestionarios()
        {
            Serilog.Log.Information("Called BackEnd => GetListCuestionarios");

            try
            {
                List<Cuestionario> listCuestionarios = await _cuestionarioService.GetListCuestionarios();
                if (listCuestionarios.Count == 0)
                {

                    return BadRequest(new { message = "No existe cuestionario registrado en este momento" });
                }
                return Ok(listCuestionarios);

            }
            catch (Exception ex)
            {
                Serilog.Log.Error("Error Called BackEnd => GetListCuestionarios error details: {0}", ex);
                return BadRequest(new { message = "Cuestionario no encontrado" });
            }
        }


    }
}

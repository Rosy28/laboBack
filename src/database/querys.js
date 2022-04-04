let queryP = "select analisis_pedidos.idpedido as idpedido, paciente.nombre || ' ' ||  paciente.apellidos as paciente, recepcionista.nombre || ' ' || recepcionista.apellidos as recepcionista,";
    queryP += " laboratorista.nombre || ' ' || laboratorista.apellidos as laboratorista, tipo_analisis.nombre as analisis,";
    queryP += " estado.estado as estado, analisis_pedidos.fechacreacion as fecha";
    queryP += " from analisis_pedidos";
    queryP += " left join paciente on analisis_pedidos.idpaciente = paciente.idpaciente";
    queryP += " left join recepcionista on analisis_pedidos.idrecepcionista = recepcionista.idrecepcionista";
    queryP += " left join laboratorista on analisis_pedidos.idlaboratorista = laboratorista.idlaboratorista";
    queryP += " left join tipo_analisis on analisis_pedidos.idanalisis = tipo_analisis.idanalisis";
    queryP += " left join estado on analisis_pedidos.idestado = estado.idestado";
    queryP += " where analisis_pedidos.idPaciente = $1;";


let queryL = "select analisis_pedidos.idpedido as idpedido, paciente.nombre || ' ' ||  paciente.apellidos as paciente, recepcionista.nombre || ' ' || recepcionista.apellidos as recepcionista,";
    queryL += " laboratorista.nombre || ' ' || laboratorista.apellidos as laboratorista, tipo_analisis.nombre as analisis,";
    queryL += " estado.estado as estado, analisis_pedidos.fechacreacion as fecha";
    queryL += " from analisis_pedidos";
    queryL += " left join paciente on analisis_pedidos.idpaciente = paciente.idpaciente";
    queryL += " left join recepcionista on analisis_pedidos.idrecepcionista = recepcionista.idrecepcionista";
    queryL += " left join laboratorista on analisis_pedidos.idlaboratorista = laboratorista.idlaboratorista";
    queryL += " left join tipo_analisis on analisis_pedidos.idanalisis = tipo_analisis.idanalisis";
    queryL += " left join estado on analisis_pedidos.idestado = estado.idestado";
    queryL += " where analisis_pedidos.idLaboratorista = $1 and analisis_pedidos.idestado !=3;";

module.exports = {
    queryP,
    queryL
};
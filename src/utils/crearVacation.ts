import Vacacion from "../Model/VacacionModel";

export async function crearVacacion(

    solicitud: any,
    id:any
  ) {
    const fechaActual = new Date();
    const añoActual = fechaActual.getFullYear();
    await Vacacion.create({
        fecha_inicio:solicitud.fecha_desde ,
        fecha_reingreso:solicitud.fecha_reintegro ,
        fecha_culminacion:solicitud.fecha_hasta,
        id_auditor_responsable:id ,
        year:añoActual
      })
  
    return ;
  }


  export async function deleteVacacion(

    solicitud: any,
  ) {
    const fechaActual = new Date();
    console.log(solicitud);
      await Vacacion.destroy({
        where: { id_vacacion: solicitud.id_vacacion },
      });
  
    return ;
  }
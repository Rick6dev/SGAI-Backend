import GerenciaAuditoria from "../Model/GrcAudit";
import Rol from "../Model/RolModel";

export async function asignarAreaTrabajoGrc(
  user: any,
  supervisorGAT: any,
  supervisorGAOF: any
) {
  const ciEmpleado = user[0].ci_empleado;
  let areaTrabajoGr: any = "";
  let noUserGrc: boolean = false;
  if (
    ciEmpleado === supervisorGAT[0].ci_supervisor ||
    ciEmpleado === supervisorGAOF[0].ci_supervisor
  ) {
    areaTrabajoGr =
      ciEmpleado === supervisorGAT[0].ci_supervisor
        ? await areaTrabajoSelect(1)
        : await areaTrabajoSelect(2);
  } else {
    noUserGrc = true;
  }

  return { areaTrabajoGr, noUserGrc };
}

export async function asignarAreaTrabajoAuditor(
  auditor: any,
  supervisorGAT: any,
  supervisorGAOF: any
) {
  let areaTrabajoAud: any = "";
  let noUserAud = false;

  if (auditor[0].id_sup === supervisorGAT[0].id_supervisor) {
    areaTrabajoAud = await areaTrabajoSelect(1);
  } else if (auditor[0].id_sup === supervisorGAOF[0].id_supervisor) {
    areaTrabajoAud = await areaTrabajoSelect(2);
  } else {
    noUserAud = true;
  }

  return { areaTrabajoAud, noUserAud }; // NoUser is not returned, as it's not used later
}

export async function RolVP(): Promise<number | undefined> {
  try {
    const [rol]: any = await Rol.findAll({
      where: {
        id_rol: 1,
        activo: 1,
      },
    });

    if (rol) {
      return rol.id_rol;
    } else {
      console.warn(
        "No se ha encontrado ningún rol con rol 'Vicepresidente' y activo = 1"
      );
      return undefined;
    }
  } catch (error) {
    console.error("Error al buscar el rol:", error);
    throw error;
  }
}

export async function RolGr(): Promise<number | undefined> {
  try {
    const [rol]: any = await Rol.findAll({
      where: {
        rol: "gerente",
        activo: 1,
      },
    });

    if (rol) {
      return rol.id_rol;
    } else {
      console.warn(
        "No se ha encontrado ningún rol con rol 'superAdmin' y activo = 1"
      );
      return undefined;
    }
  } catch (error) {
    console.error("Error al buscar el rol:", error);
    throw error;
  }
}

export async function RolAud(): Promise<number | undefined> {
  try {
    const [rol]: any = await Rol.findAll({
      where: {
        rol: "auditor",
        activo: 1,
      },
    });

    if (rol) {
      return rol.id_rol;
    } else {
      console.warn(
        "No se ha encontrado ningún rol con rol 'superAdmin' y activo = 1"
      );
      return undefined;
    }
  } catch (error) {
    console.error("Error al buscar el rol:", error);
    throw error;
  }
}

export async function areaTrabajoSelect(
  id: number
): Promise<number | undefined> {
  try {
    const gerenciaEncargada: any = await GerenciaAuditoria.findOne({
      where: {
        id_gerencia_encargada: id,
      },
    });

    if (gerenciaEncargada) {
      return gerenciaEncargada.gerencia_encargada;
    } else {
      console.warn("No se ha encontrado ningún area de Trabajo");
      return undefined;
    }
  } catch (error) {
    console.error("Error al buscar el Area de Trabajo:", error);
    throw error;
  }
}

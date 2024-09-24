import Auditor from "../Model/AuditModel";
import EmpleadosModel from "../Model/EmpleadoModel";

export async function ExtractEmpleadoComentr(): Promise<string> {
  const empleados: any = await Auditor.findAll({
    attributes: ["id_auditor_responsable", "nombre", "apellido"],
  });
  return empleados;
}

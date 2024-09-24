import {
  RolAud,
  RolGr,
  RolVP,
  asignarAreaTrabajoAuditor,
  asignarAreaTrabajoGrc,
} from "./asignacionRol";
import { ExtractAuditor, ExtractUsuario, formatEmail } from "./extractAuditor";
import {
  ExtracSupOneGAOF,
  ExtracSupOneGAT,
  ExtracSupVp,
} from "./extractSupervisor";

export async function determineUserAccess(username: any) {
  let noUser = false;
  let rol: any = 0;
  let areaTrabajo = "";
  let mail = formatEmail(username);
  let user: any = await ExtractUsuario(mail);
  const supervisorGAT: any = await ExtracSupOneGAT();
  const supervisorGAOF: any = await ExtracSupOneGAOF();
  const vicepresidente: any = await ExtracSupVp();
  const auditor: any = await ExtractAuditor(mail);

  switch (user[0].id_cargo) {
    case 3:
      if (user[0].ci_empleado === vicepresidente[0].ci_supervisor) {
        areaTrabajo = "GAT/GAOF";
        rol = await RolVP();
      } else {
        noUser = true;
      }
      break;
    case 4:
      try {
        const { areaTrabajoGr, noUserGrc } = await asignarAreaTrabajoGrc(
          user,
          supervisorGAT,
          supervisorGAOF
        );
        areaTrabajo = areaTrabajoGr;
        rol = await RolGr();
        noUser = noUserGrc;
      } catch (error) {
        console.error(
          "Error assigning area for Grupo de Riesgos Contractuales:",
          error
        );
      }
      break;
    case 11:
      try {
        const { areaTrabajoAud, noUserAud } = await asignarAreaTrabajoAuditor(
          user,
          supervisorGAT,
          supervisorGAOF
        );
        rol = await RolAud();
        user = auditor;
        areaTrabajo = areaTrabajoAud;
        noUser = noUserAud;
      } catch (error) {
        console.error("Error assigning area for Auditor:", error);
      }
      break;
    default:
      noUser = true;
  }
  return { rol, user, areaTrabajo, noUser };
}

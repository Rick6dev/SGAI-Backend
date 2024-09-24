import Auditor from "../Model/AuditModel";
import EmpleadosModel from "../Model/EmpleadoModel";

export async function ExtractAuditor(mail: string): Promise<string> {
  const empleados: any = await EmpleadosModel.findAll({
    where: {
      id_status: 1,
      id_cargo: 11,
      mail: mail,
    },
  });
  return empleados;
}

export async function ExtractUsuario(mail: string): Promise<string> {
  const empleados: any = await EmpleadosModel.findAll({
    where: {
      id_status: 1,

      mail: mail,
    },
  });
  return empleados;
}

export async function ExtractUsuarioAuditor(mail: string): Promise<string> {
  const auditor: any = await Auditor.findAll({
    where: {
      mail: mail,
    },
  });
  return auditor;
}

export function formatEmail(email: string) {
  let mail = email;
  mail = mail.trimStart();
  mail = mail.trimEnd();
  // Si el correo electrónico ya tiene el dominio, devuélvelo como está.
  if (
    mail.indexOf("@credicard.com.ve") > -1 ||
    mail.indexOf("@CREDICARD.COM.VE") > -1
  ) {
    return mail;
  }

  return mail + "@credicard.com.ve";
}

export async function ExtractAuditorVP(mail: string): Promise<string> {
  const empleados: any = await EmpleadosModel.findAll({
    where: {
      id_status: 1,
      id_cargo: 3,
      mail: mail,
    },
  });
  return empleados;
}

export async function ExtractAuditorGrc(mail: string): Promise<string> {
  const empleados: any = await EmpleadosModel.findAll({
    where: {
      id_status: 1,
      id_cargo: 4,
      mail: mail,
    },
  });
  return empleados;
}

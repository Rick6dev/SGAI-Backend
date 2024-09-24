import IntraSupervisor from "../Model/SupervisorModel";


  export async function ExtracSup(): Promise<string> {
      const supervisor:any = await IntraSupervisor.findAll({
        attributes: ["id_supervisor", "ci_supervisor","nombre_sup1","apellido_sup1","id_cargo","id_dpto","id_gerencia","id_vp","id_vpe","id_pe","id_status"],
        where: {
            id_status: 1,
          },
      });
      return supervisor
  
    }

    export async function ExtracSupOneGAT(): Promise<string> {
        const supervisor:any = await IntraSupervisor.findAll({
          attributes: ["id_supervisor", "ci_supervisor","nombre_sup1","apellido_sup1","id_cargo","id_dpto","id_gerencia","id_vp","id_vpe","id_pe","id_status"],
          where: {
            id_gerencia: 58,
            },
        });
        return supervisor
    
      }


      export async function ExtracSupOneGAOF(): Promise<string> {
        const supervisor:any = await IntraSupervisor.findAll({
          attributes: ["id_supervisor", "ci_supervisor","nombre_sup1","apellido_sup1","id_cargo","id_dpto","id_gerencia","id_vp","id_vpe","id_pe","id_status"],
          where: {
            id_gerencia: 57,
            },
        });
        return supervisor
    
      }

      export async function ExtracSupVp(): Promise<string> {
        const supervisor:any = await IntraSupervisor.findAll({
          attributes: ["id_supervisor", "ci_supervisor","nombre_sup1","apellido_sup1","id_cargo","id_dpto","id_gerencia","id_vp","id_vpe","id_pe","id_status"],
          where: {
            id_vp:13
            },
        });
        return supervisor
    
      }
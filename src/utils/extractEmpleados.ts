import EmpleadosModel from "../Model/EmpleadoModel";

    export async function ExtractEmpleado(): Promise<string> {
  
        const empleados:any=await EmpleadosModel.findAll(     {
            where: {
              id_status: 1,
            },
          }   
            );
          return empleados
      
        }
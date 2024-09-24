import VpeModel from "../Model/VPEModel";
import VpModel from "../Model/VPModel";

export async function extractVpe(id: any): Promise<string> {
  const vpes: any = await VpeModel.findAll({
    where: { status: true, id_vpe: id },
    attributes: ["id_vpe", "nombre_vpe"],
  });

  return vpes;
}

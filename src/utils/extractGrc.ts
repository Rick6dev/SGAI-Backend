import GrcModel from "../Model/GrcModel";
import VpeModel from "../Model/VPEModel";
import VpModel from "../Model/VPModel";

export async function ExtracGrc(): Promise<string> {
  const gerencias: any = await GrcModel.findAll({
    include: [
      {
        model: VpModel,
        attributes: ["nombre_vp"],
        include: [
          {
            model: VpeModel,
            attributes: ["id_vpe", "nombre_vpe"],
          },
        ],
      },
    ],
  });
  return gerencias;
}
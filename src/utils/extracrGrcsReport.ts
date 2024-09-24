import GrcModel from "../Model/GrcModel";
import VpModel from "../Model/VPModel";

export async function ExtractsAllGerencia(id: any): Promise<string> {
  const grcs: any = await GrcModel.findAll({
    where: {
      status: 1,
      id_vp: id,
    },
  });

  return grcs;
}

import VpModel from "../Model/VPModel";

export async function extractVp(id: any): Promise<string> {
  const vps: any = await VpModel.findAll({
    where: {
      status: 1,
      id_vpe: id,
    },
  });

  return vps;
}

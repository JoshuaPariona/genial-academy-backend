import { AreaEntity } from "../entities/AreaEntity";
import { BaseService } from "./base/BaseService";

export class AreaService extends BaseService<AreaEntity> {
  constructor() {
    super(AreaEntity);
  }

  // SPIKE: Es posible q se pueda agregar a la llamada de universidades 
  // y no hacer esta llamada externa, pero areas debe devolvers solo esta 
  // data en select
  public findAll(uniId: string): Promise<AreaEntity[]> {
    const isNumeric = !isNaN(Number(uniId));
    return this.repository.find({
      where: {
        university: isNumeric ? { id: Number(uniId) } : { slug: uniId },
      },
      select: ["id", "slug", "thumbnail", "name", "largeName"],
      loadEagerRelations: false,
    });
  }

  public find(uniId: string, areaId: string): Promise<AreaEntity | null> {
    const isNumericAreaId = !isNaN(Number(areaId));
    const isNumericUniId = !isNaN(Number(uniId));
    return this.repository.findOneBy({
      ...(isNumericAreaId ? { id: Number(areaId) } : { slug: areaId }),
      university: isNumericUniId ? { id: Number(uniId) } : { slug: uniId },
    });
  }
}

import { Controller, Get, Param, Query } from "@nestjs/common";
// import { CatalogItemDTO } from "../dtos/catalog-item.dto";
import { CatalogResponseDTO } from "./dtos/catalog-response.dto";
import { CatalogService } from "./catalog.service";
import { CatalogItemDTO } from "./dtos/catalog-item.dto";
import { Ip } from "@nestjs/common/decorators/http/route-params.decorator";



@Controller('catalog')
export class CatalogController {

  constructor(private readonly catalogService: CatalogService) {}

  @Get('index/:id')
  getPage(@Param('id') id = 0): Promise<CatalogResponseDTO> {
    return this.catalogService.getPage(+id);
  }

  @Get('get')
  getItems( @Query('ids') ids: number[] ): Promise<CatalogItemDTO[]> {
    return this.catalogService.getItems(ids);
  }
}
import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async search(@Query('q') query: string) {
    if (!query?.trim()) {
      return {
        music: [],
        artists: [],
        albums: [],
      };
    }

    return this.searchService.search(query);
  }
}

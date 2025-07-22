import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchResult } from './dto/search.dto';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async search(@Query('q') query: string): Promise<SearchResult> {
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

// src/pages/controller.ts
import {
  JsonController,
  Get,
  Param,
  Body,
  Put,
  Post,
  HttpCode
} from "routing-controllers";
import pagesById, { Page } from "./data";

type PageList = { pages: Page[] };

@JsonController()
export default class PageController {
  @Get("/pages/:id")
  getPage(@Param("id") id: number): Page {
    return pagesById[id];
  }
  @Get("/pages")
  allPages(): PageList {
    return { pages: Object.values(pagesById) };
  }
  @Put("/pages/:id")
  updatePage(@Param("id") id: number, @Body() body: Partial<Page>): Page {
    console.log(`Incoming PUT body param:`, body);
    return pagesById[id];
  }
  @Post("/pages")
  @HttpCode(201)
  createPage(@Body() body: Page): Page {
    console.log(`Incoming POST body param:`, body);
    return body;
  }
}

// @JsonController() this makes sure a class is marked as controller that always returns JSON
// perfect for our REST API
// @Get()this markes a method as endpoint
// in this case it responds to any GET /pages/:id
// @Param('id') request with :id being a variable parameter
// this decorator retrieves the ID parameter from the url
// type PageList = { pages: Page[] };

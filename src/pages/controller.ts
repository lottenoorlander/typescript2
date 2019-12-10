// src/pages/controller.ts
import Page from "./entity";

import {
  JsonController,
  Get,
  Param,
  Body,
  Put,
  Post,
  HttpCode,
  NotFoundError,
  Authorized
} from "routing-controllers";
// import pagesById, { Page } from "./data";

type PageList = { pages: Page[] };

@JsonController()
export default class PageController {
  @Get("/pages/:id")
  getPage(@Param("id") id: number) {
    return Page.findOne(id);
  }
  @Get("/pages")
  async allPages(): Promise<PageList> {
    const result = await Page.find();
    return { pages: result };
  }
  @Authorized()
  @Put("/pages/:id")
  async updatePage(@Param("id") id: number, @Body() update: Partial<Page>) {
    const page = await Page.findOne(id);
    if (!page) throw new NotFoundError("Cannot find page");

    return Page.merge(page, update).save();
  }
  @Authorized()
  @Post("/pages")
  @HttpCode(201)
  createPage(@Body() page: Page) {
    return page.save();
  }
}

// @JsonController() this makes sure a class is marked as controller that always returns JSON
// perfect for our REST API
// @Get()this markes a method as endpoint
// in this case it responds to any GET /pages/:id
// @Param('id') request with :id being a variable parameter
// this decorator retrieves the ID parameter from the url
// type PageList = { pages: Page[] };

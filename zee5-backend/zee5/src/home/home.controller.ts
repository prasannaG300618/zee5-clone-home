import { Controller, Get, Param, Query, Search } from '@nestjs/common';
import { HomeService } from './home.service';
import { UseGuards } from '@nestjs/common';
import { HomeGuard } from './guards/home.guard';

@Controller('home')
export class HomeController {
    constructor(private homeService:HomeService){}
    @Get("shows")
    getShows(@Query() pagination:{limit:number, offset:number}){
        return this.homeService.getShows(pagination)
    }
    
    @Get("carousel")
    getCarousel(){
        return this.homeService.getCarousel()
    }

    @Get("search")
    searchShows(@Query('find')search:string){
        return this.homeService.searchShows(search)
    }

    @Get("play")
    @UseGuards(HomeGuard)
     play(@Query() accessId:string){
       return  this.homeService.play(accessId)
    }

}

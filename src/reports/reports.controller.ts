import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { CreateReportDto } from './dtos/create-report.dto'
import { ReportsService } from './reports.service'
import { AuthGuard } from '../guards/auth.guard'
import { AdminGuard } from '../guards/admin.guard'
import { CurrentUser } from '../users/decorators/current-user.decorator'
import { User } from '../users/user.entity'
import { Serialize } from '../interceptors/serialize.interceptor'
import { ReportDto } from './dtos/report.dto'
import { ApproveReportDto } from './dtos/approve-report.dto'
import { GetEstimateDto } from './dtos/get-estimate.dto'

@Controller('reports')
export class ReportsController {
  constructor(private reportService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(@Body() reportDto: CreateReportDto, @CurrentUser() user: User) {
    return this.reportService.create(reportDto, user)
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    return this.reportService.changeApproval(+id, body.approved)
  }

  @Get('/estimate')
  getEstimate(@Query() query: GetEstimateDto) {
    return this.reportService.createEstimate(query)
  }
}

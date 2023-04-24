import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentDto } from './dto/students.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  create(@Body() studentDto:StudentDto) {
    return this.studentsService.create(studentDto);
  }

  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.studentsService.findOne(id);
  }

  @Put()
  update(@Body() studentDto:StudentDto) {
    return this.studentsService.update(studentDto);
  }

  @Delete()
  remove(@Body() studentDto:StudentDto) {
    return this.studentsService.remove(studentDto.student_id);
  }
}

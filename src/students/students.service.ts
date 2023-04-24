import { Injectable } from '@nestjs/common';
import { StudentDto } from './dto/students.dto';
import { connect } from '../mysql/database';
@Injectable()
export class StudentsService {



  private conection;
  constructor(){
      connect()
      .then((con)=>{
          this.conection = con
      })
      .catch(err=>console.log(err));
  }

  async create(studentDto:StudentDto):Promise<any> {
    
    const {first_name, last_name,group_id} = studentDto;

    const sql:string = `INSERT INTO students 
                        (first_name, last_name, group_id) 
                        VALUES (?, ?, ?);`

    const promise = await this.conection.execute(sql,[first_name,last_name,group_id])

    return promise;
  }

  async findAll():Promise<StudentDto[]> {
    const sql:string = `SELECT * FROM students`
    const promise = await this.conection.execute(sql)
    return promise[0];
  }

  async findOne(id: number) {
    const sql:string = `SELECT * FROM students WHERE student_id = ?`
    const promise = await this.conection.execute(sql,[id])
    return promise[0];
  }

  async update(studentDto:StudentDto) {

    const {student_id,first_name, last_name,group_id} = studentDto;

    const sql:string =  `UPDATE students 
                        SET first_name = COALESCE(?,first_name), 
                        last_name = COALESCE(?,last_name), 
                        group_id = COALESCE(?,group_id)
                        WHERE student_id = ?;`
    
    const params = [
      first_name? first_name: null,
      last_name? last_name: null,
      group_id? group_id: null,
      student_id
    ]

    const promise = await this.conection.execute(sql,params);

    return promise;
  }

  async remove(id: number) {

    const sql:string = `DELETE FROM students WHERE (student_id = ?);`

    const promise = await this.conection.execute(sql,[id]);

    return promise;
  }
}

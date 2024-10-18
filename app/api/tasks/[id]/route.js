import { connectMongo } from '@/lib/mongodb';
import Task from '@/models/tasks';
import { NextResponse } from 'next/server';

export async function PUT(req, { params }) {
    try {
        const { id } = params;
        console.log(id);

        await connectMongo()
    
        const { title, task } = await req.json()

        console.log(title,task);
    
        const _task = await Task.findOne({ _id: id })
    
        if (_task) {

            console.log(_task);
    
          await Task.findByIdAndUpdate(id, { title, task })
          console.log(_task);
    
          return NextResponse.json({ message: "Task updated"}, { status: 200 });
        }
    
        return NextResponse.json({ message: "Task not found" }, { status: 400 });
    
      } catch (error) {
    
        console.log(error);
        return NextResponse.json({ message: 'Error while deleting task' }, { status: 500 });
      }

}



export async function GET(req,{ params }) {
    try {

      console.log("Hello")
        const { id } = params;

        console.log(id);

        await connectMongo()

        const task = await Task.findOne({ _id: id })

        console.log(task)

        if (task) {
            return NextResponse.json(task, { status: 200 });
        }

        return NextResponse.json("task not found", { status: 400 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Error while fetching  task' }, { status: 500 });
    }
  }
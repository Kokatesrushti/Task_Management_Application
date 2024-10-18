import { connectMongo } from '@/lib/mongodb';
import Task from '@/models/tasks';
import User from '@/models/user';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'; 


export async function POST(req) {
  try {

    const { id, title, task } = await req.json();
    console.log(id, title, task);

    await connectMongo();

    const _task = await Task.findOne({ title: title, task: task }).exec();

    if (_task) {
      return NextResponse.json({ message: 'Task Already Involved' }, { status: 400 });
    }

    const new_task = new Task({
      owner: id,
      title,
      task,
    });

    await new_task.save();

    console.log(new_task._id)

    if (new_task) {
      const updateResult = await User.updateOne(
        { _id: id },
        { $push: { tasks: new_task._id } }
      );

      console.log('Update Result:', updateResult);

      if (updateResult.modifiedCount === 0) {
        console.error('User document not updated.');
      }
    }

    return NextResponse.json({ message: 'Task Added' }, { status: 201 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Error while adding task' }, { status: 500 });
  }
}

// export async function GET() {
//   try {

//     await connectMongo();

//     const tasks=await Task.find().exec()

//     console.log(tasks);

//     return NextResponse.json(tasks , { status: 201 });
//   } catch (error) {
//     console.log(error)
//     return NextResponse.json({ message: 'Error while adding task' }, { status: 500 });
//   }
// }

export async function GET() {
  try {
    await connectMongo();

    const tasks = await Task.find().populate('owner', 'name').sort({ createdAt: -1 }).exec();

    const transformedTasks = tasks.map(task => {
      return {
        id: task._id,
        owner: task.owner.name,
        title: task.title,
        task: task.task,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      };
    });

    console.log(transformedTasks);

    return NextResponse.json({ tasks: transformedTasks }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error while getting task' }, { status: 500 });
  }
}


export async function DELETE(req) {

  try {
    const id = req.nextUrl.searchParams.get("id")

    await connectMongo()

    const task = await Task.findOne({ _id: id })

    if (task) {
      const owner_id = await task.owner;
      const user = await User.findById(owner_id)

      if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
      }

      user.tasks.pull(id);

      await user.save();
      console.log(user);
    }

    await Task.findByIdAndDelete(id);

    return NextResponse.json({ message: "Task deleted" }, { status: 200 });

  } catch (error) {

    console.log(error);
    return NextResponse.json({ message: 'Error while deleting task' }, { status: 500 });
  }

}

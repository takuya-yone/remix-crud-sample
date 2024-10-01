import type { MetaFunction } from "@remix-run/node";

import { Form } from "@remix-run/react";

import {
  typedjson,
  useTypedLoaderData,
  useTypedActionData,
} from "remix-typedjson";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { useState } from "react";

import { json } from "@remix-run/node";
import { useLoaderData, useActionData } from "@remix-run/react";
import { PrismaClient } from "@prisma/client";
import type { TodoItem } from "@prisma/client";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // console.log(request);
  const prisma = new PrismaClient();
  const todoItems = await prisma.todoItem.findMany();
  await prisma.$disconnect();

  return typedjson(todoItems);
};

export const action = async ({ request }: ActionFunctionArgs) => {
  // console.log(request);
  // Formのデータを取得
  const formData = await request.formData();

  const prisma = new PrismaClient();

  // if (!formData.get("id")) return;
  console.log(formData);

  const newTodoItem = {
    id: String(formData.get("id")),
    title: String(formData.get("title")),
    comment: String(formData.get("comment")),
    complete: String(formData.get("completed")) === "on",
  };

  const result = await prisma.todoItem.update({
    where: { id: newTodoItem.id },
    data: newTodoItem,
  });
  await prisma.$disconnect();
  console.log(newTodoItem);

  console.log(result);

  return json({ aaa: "bbb" });
};

export const TodoItemForm = (props: { item: TodoItem }) => {
  const [completed, setCompleted] = useState(props.item.complete);

  return (
    <div>
      <Form method="post" navigate={false}>
        <input type="hidden" id="Id" name="id" value={props.item.id} />

        {/* <TextField
          required
          label="Title"
          defaultValue={props.item.title}
          name="title"
        />
        <TextField
          label="Comment"
          defaultValue={props.item.comment}
          name="comment"
        />
        <Switch name="completed" defaultChecked={completed} />

        <Button
          type="submit"
          color="success"
          value="truaaae"
          variant="contained"
        >
          Submit
        </Button> */}
      </Form>
    </div>
  );
};

export default function Index() {
  const todoItems = useTypedLoaderData<typeof loader>();

  return (
    <div className="flex  items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header key="header" className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            Welcome to <span className="sr-only">Remix</span>
          </h1>
        </header>
        {/* <Typography color="black">{JSON.stringify(todoItems)}</Typography> */}
        {todoItems.map((item, index) => {
          return (
            <div key={item.id}>
              <TodoItemForm item={item} />
            </div>
          );
        })}
        <div className="h-[144px] w-[434px]">
          <img
            src="/logo-light.png"
            alt="Remix"
            className="block w-full dark:hidden"
          />
          <img
            src="/logo-dark.png"
            alt="Remix"
            className="hidden w-full dark:block"
          />
        </div>
        <nav className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
          <p className="leading-6 text-gray-700 dark:text-gray-200">
            What&apos;s next?
          </p>
        </nav>
      </div>
    </div>
  );
}

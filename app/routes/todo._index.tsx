import type { MetaFunction } from "@remix-run/node";

import { Form } from "@remix-run/react";

import {
  typedjson,
  useTypedLoaderData,
  useTypedActionData,
} from "remix-typedjson";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";

import { json } from "@remix-run/node";
import { useLoaderData, useActionData } from "@remix-run/react";
import { PrismaClient } from "@prisma/client";
import type { TodoItem } from "@prisma/client";
import { Typography, TextField, Button } from "@mui/material";

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

  return typedjson(todoItems);
};

export const action = async ({ request }: ActionFunctionArgs) => {
  console.log(request);
  // Formのデータを取得
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("email"));

  return json({ aaa: "aaa" });
};

export const TodoItemForm = (props: { item: TodoItem }) => {
  return (
    // <Typography>{props.item.title}</Typography>
    <div>
      <Form method="post" name="form3" id="form3" className="remix__form">
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue={props.item.title}
        />
        <Button type="submit" color="success" variant="contained">
          Submitttt
        </Button>
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
        <Typography color="black">{JSON.stringify(todoItems)}</Typography>
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

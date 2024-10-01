import type { MetaFunction } from "@remix-run/node";

import { blue } from "@ant-design/colors";
import { PrismaClient } from "@prisma/client";
import type { TodoItem } from "@prisma/client";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { FormProps } from "antd";
import { Button, Card, Form, Input, Switch, Typography } from "antd";
import { typedjson, useTypedActionData, useTypedLoaderData } from "remix-typedjson";

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
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

type FieldType = {
  title: string;
  comment: string;
  complete: boolean;
};

export const TodoItemForm = (props: { item: TodoItem }) => {
  const [form] = Form.useForm();
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const aaa = useTypedActionData<typeof action>();

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    // <Typography>{props.item.title}</Typography>
    <Card style={{ backgroundColor: blue[0] }}>
      <Form
        name={props.item.id}
        form={form}
        method="post"
        // labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        // initialValues={{ remember: true }}
        // onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        initialValues={{
          title: props.item.title,
          comment: props.item.comment,
          complete: props.item.complete,
          id: props.item.id,
        }}
      >
        <Form.Item<FieldType>
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input Title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Comment"
          name="comment"
          // rules={[{ required: true, message: "Please input !" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType> name="complete" label="complete" wrapperCol={{ offset: 8, span: 16 }}>
          <Switch />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
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
        <Typography.Text code>{JSON.stringify(todoItems)}</Typography.Text>
        {todoItems.map((item, index) => {
          return (
            <div key={item.id}>
              <TodoItemForm item={item} />
            </div>
          );
        })}
        <div className="h-[144px] w-[434px]">
          <img src="/logo-light.png" alt="Remix" className="block w-full dark:hidden" />
          <img src="/logo-dark.png" alt="Remix" className="hidden w-full dark:block" />
        </div>
        <nav className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
          <p className="leading-6 text-gray-700 dark:text-gray-200">What&apos;s next?</p>
        </nav>
      </div>
    </div>
  );
}

import type { MetaFunction } from "@remix-run/node";
import {
  DatePicker,
  Typography,
  Form,
  Input,
  Button,
  Checkbox,
  Card,
  Switch,
} from "antd";
import { blue } from "@ant-design/colors";

import type { FormProps } from "antd";
import { typedjson, useTypedLoaderData } from "remix-typedjson";

import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { PrismaClient } from "@prisma/client";
import { TodoItem } from "@prisma/client";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  const prisma = new PrismaClient();

  const todoItems = await prisma.todoItem.findMany();

  return typedjson(todoItems);
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

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    // <Typography>{props.item.title}</Typography>
    <Card style={{ backgroundColor: blue[0] }}>
      <Form
        name={props.item.id}
        form={form}
        // labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        // initialValues={{ remember: true }}
        onFinish={onFinish}
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

        <Form.Item<FieldType>
          name="complete"
          label="complete"
          wrapperCol={{ offset: 8, span: 16 }}
        >
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
          <Typography.Text code>{JSON.stringify(todoItems)}</Typography.Text>
          {todoItems.map((item, index) => {
            return (
              <div key={item.id}>
                <TodoItemForm item={item} />
              </div>
            );
          })}
          <div className="h-[144px] w-[434px]">
            <DatePicker />
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
        </header>
        <nav className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
          <p className="leading-6 text-gray-700 dark:text-gray-200">
            What&apos;s next?
          </p>
        </nav>
      </div>
    </div>
  );
}

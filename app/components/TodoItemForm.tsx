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
import {
  typedjson,
  useTypedLoaderData,
  useTypedActionData,
} from "remix-typedjson";
import { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";

import { json } from "@remix-run/node";
import { useLoaderData, useActionData } from "@remix-run/react";
import { PrismaClient } from "@prisma/client";
import { TodoItem } from "@prisma/client";

type FieldType = {
  title: string;
  comment: string;
  complete: boolean;
};

export const TodoItemForm = (props: { item: TodoItem }) => {
  return (
    <div>
      {/* <TodoList todos={data} />
       */}

      {props.item.title}
      <Form method="post" action="/home">
        <input type="text" name="title" />
        <button type="submit">Create Todo</button>
      </Form>
    </div>
  );
};

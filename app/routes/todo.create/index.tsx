import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useEffect, useRef } from "react";

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
};
export async function action({ request }: ActionFunctionArgs) {
  //   let formData = await request.formData();
  //   let title = formData.get("title");
  //   console.log(title);
  //   //db
  //   const prisma = new PrismaClient();
  //   const result = await prisma.task.create({
  //     data: {
  //       title: title,
  //       content: "",
  //       userId: 0,
  //     },
  //   });
  //   await prisma.$disconnect();
  console.log("sadfasdf");
  return json({ result: "OK" });
}
export default function Page() {
  //   let data = useActionData();
  //   console.log(data);
  //console.log(cfg.OK_CODE);

  return (
    <div className="remix__page">
      <main>
        <h2>Task - Create</h2>
        <hr />
        <Form method="post" name="form3" id="form3" className="remix__form">
          <label>
            <div>title:</div>
            <input name="title" id="title" type="text" />
          </label>
          <div>
            <button type="submit">Submit</button>
          </div>
        </Form>
      </main>
    </div>
  );
}

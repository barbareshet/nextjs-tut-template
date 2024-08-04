import { Separator } from "@/components/ui/separator";
import CreateInvoice from "@/components/createInvoice/CreateInvoice";
import ListInvoice from "@/components/listInvoice/ListInvoice";

import {connectDB} from "@/db/db";

import CreateClient from "@/components/createClient/CreateClient";
import {getCustomers} from "@/actions/customerActions";

export default async function Customers({ searchParams }) {
    const search = searchParams?.search || "";
    const page = searchParams?.page || "";

    const res = await getCustomers({ search, page, limit: 5})
    const customers = JSON.parse(res) || [];
    console.log(customers)
  return (
    <div className="flex justify-center min-h-[82vh]">
      <section className="w-full px-2 max-w-[1200px]">
            <div className="flex justify-between">
                <h3 className="text-2xl font-semibold text-color-black">
                    Your Customers
                </h3>
                <div className="flex justify-end space-x-2">
                    <CreateInvoice />
                    <CreateClient />
                </div>
            </div>
          <Separator className="my-2 border-b-[2px] border-color-dark-blue" />
          {/*<ListInvoice*/}
          {/*    total={customers.totalItems}*/}
          {/*    pageNumber={customers.pageCount}*/}
          {/*    customers={customers.data}*/}
          {/*/>*/}
      </section>
    </div>
  );
}

import { Separator } from "@/components/ui/separator";
import CreateInvoice from "@/components/createInvoice/CreateInvoice";
import ListInvoice from "@/components/listInvoice/ListInvoice";

import {connectDB} from "@/db/db";
import {getInvoices} from "@/actions/invoiceActions";
import CreateClient from "@/components/createClient/CreateClient";

export default async function Home({ searchParams }) {
    const search = searchParams?.search || "";
    const page = searchParams?.page || "";

    const res = await getInvoices({ search, page, limit: 5})
    const invoices = JSON.parse(res) || [];
    // console.log(invoices)
  return (
    <div className="flex justify-center min-h-[82vh]">
      <section className="w-full px-2 max-w-[1000px]">
            <div className="flex justify-between">
                <h3 className="text-2xl font-semibold text-color-black">
                    Your Invoices
                </h3>
                <div className="flex justify-end space-x-2">
                    <CreateInvoice />
                    <CreateClient />
                </div>
            </div>
          <Separator className="my-2 border-b-[2px] border-color-dark-blue" />
          <ListInvoice
              total={invoices.totalItems}
              pageNumber={invoices.pageCount}
              invoices={invoices.data}
          />
      </section>
    </div>
  );
}

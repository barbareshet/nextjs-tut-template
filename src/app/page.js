import { Separator } from "@/components/ui/separator";
import CreateInvoice from "@/components/createInvoice/CreateInvoice";
import ListInvoice from "@/components/listInvoice/ListInvoice";

import {connectDB} from "@/db/db";

export default function Home() {
  return (
    <div className="flex justify-center min-h-[82vh]">
      <section className="w-full px-2 max-w-[1000px]">
            <div className="flex justify-between">
                <h3 className="text-2xl font-semibold">
                    Invoice Manager
                </h3>
                <CreateInvoice />
            </div>
          <Separator className="my-2 border-b-[2px] border-color-dark-blue" />
          <ListInvoice/>
      </section>
    </div>
  );
}

import TrackOrderIcon from "@/icons/TrackOrderIcon";
import ReturnOrderIcon from "@/icons/ReturnOrderIcon";
import { Mail, Phone, ChevronRight } from "lucide-react";
import Link from "next/link";

const CONTACTS = [
  {
    label: "TRACK ORDER",
    desc: "View status of the order",
    icon: TrackOrderIcon,
    href: "/track-order",
  },
  {
    label: "Return Order",
    desc: "Return and view the items in order",
    icon: ReturnOrderIcon,
    href: "/account/orders",
  },
];

export default function ContactUsPage() {
  return (
    <div className="border border-[#F59A1180] flex flex-col rounded-2xl bg-white w-full h-full overflow-auto">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-900">Contact Us</h2>
      </div>
      <hr className="border-[#F59A1180] mb-4" />

      <div className="flex flex-col">
        <div className="flex flex-col gap-2 flex-grow">
          {CONTACTS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-between group px-2 py-3 hover:bg-[#FEF5E7] transition-colors cursor-pointer w-full"
              >
                <div className="flex items-center gap-4 pl-6 flex-1">
                  <span className="inline-block">
                    <Icon className="h-10 w-10" />
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="font-bold text-[16px] text-gray-900">
                      {item.label}
                    </span>
                    <span className="text-gray-500 text-[12px]">
                      {item.desc}
                    </span>
                  </span>
                </div>
                <ChevronRight className="text-[#F59A11] group-hover:translate-x-1 transition-transform flex-shrink-0" />
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex flex-1 px-8 py-6 flex-col justify-end">
        <div className="font-bold text-lg text-gray-800 mb-1">GET IN TOUCH</div>
        <div className="text-gray-500 text-[15px] mb-4">
          If you have any inquiries, feel free to
        </div>
        <div className="flex flex-col gap-2">
          <a
            href="tel:18005723575"
            className="flex items-center gap-2 text-[#0B5C6A] text-[16px] hover:underline underline-offset-2 transition"
          >
            <Phone className="h-5 w-5" />
            <span>
              Call us at{" "}
              <span className="font-bold text-black pl-1">1800-5723-575</span>
            </span>
          </a>
          <a
            href="mailto:support@petcaart.com"
            className="flex items-center gap-2 text-[#0B5C6A] text-[16px] hover:underline underline-offset-2 transition"
          >
            <Mail className="h-5 w-5" />
            <span className="">
              Email us at{" "}
              <span className="font-bold text-black pl-1">support@petcaart.com</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

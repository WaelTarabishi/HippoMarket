"use client";

import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface PaymentStatusProps {
  orderEmail: string;
  orderId: string;
  isPaid: boolean;
}
const PaymentStatus = ({ orderEmail, orderId, isPaid }: PaymentStatusProps) => {
  const router = useRouter();
  const { data } = trpc.payment.pollOrderStatus.useQuery(
    { orderId },
    {
      enabled: isPaid === false,
      refetchInterval: (data) => (data?.isPaid ? false : 1000),
    }
  );

  useEffect(() => {
    if (data?.isPaid) router.refresh();
  }, [data?.isPaid, router]);
  return (
    <div className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-800">
      <div>
        <p className="font-medium text-gray-900">Shipping to</p>
        <p>{orderEmail}</p>
      </div>
      <div>
        <p className="font-medium text-gray-900">Order Status</p>
        <p>{isPaid ? "Pyament successful" : "Pending payment"}</p>
      </div>
    </div>
  );
};

export default PaymentStatus;

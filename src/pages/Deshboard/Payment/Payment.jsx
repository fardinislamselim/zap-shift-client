import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

const Payment = () => {
  const { parcelId } = useParams();

  const axiosSecure = useAxiosSecure();

  const { data: parcel, isLoading } = useQuery({
    queryKey: ["parcel", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcel/${parcelId}`);
      return res.data;
    },
  });

  const handleMakePayment = async () => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.name,
    };
    const res = await axiosSecure.post("/creat-chakout-session", paymentInfo);
    if (res.data && res.data.url) {
      window.location.href = res.data.url;
    } else {
      console.error("Backend did not return a valid checkout URL.", res.data);
      alert("Error: Could not start checkout session.");
    }
  };

  // Handle Loading State
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  }

  if (!parcel) {
    return (
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold">Parcel Not Found</h1>
        <p>Could not retrieve details for Parcel ID: {parcelId}</p>
      </div>
    );
  }

  const isPaymentRequired = parcel.paymentStatus === "unpaid";
  const buttonText = `Pay $${parcel.cost || "N/A"}`;

  return (
    <div className="p-8 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Payment for Parcel ID: {parcelId}
      </h1>

      <div className="space-y-4">
        <p className="text-lg">
          <span className="font-semibold">Recipient:</span>{" "}
          {parcel.recipientName}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Delivery Fee:</span> **$
          {parcel.cost || "N/A"}**
        </p>
        <p className="text-lg">
          <span className="font-semibold">Parcel Status:</span>{" "}
          <span
            className={`font-bold ${
              isPaymentRequired ? "text-red-600" : "text-green-600"
            }`}
          >
            {parcel.status}
          </span>
        </p>
      </div>

      <hr className="my-6" />

      {isPaymentRequired ? (
        <button
          onClick={handleMakePayment}
          className="w-full py-3 text-white bg-blue-600 cursor-pointer hover:bg-blue-700 font-semibold rounded-lg shadow-md transition duration-300 disabled:bg-gray-400"
          disabled={!parcel.cost}
        >
          💳 {buttonText}
        </button>
      ) : (
        <div className="text-center p-4 bg-green-100 text-green-800 rounded-lg">
          <p className="font-semibold">✅ This parcel is already paid.</p>
        </div>
      )}
    </div>
  );
};

export default Payment;


import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: parcels = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["myParcels", user?.email],

    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your parcels request has been remove.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  // Placeholder for the Pay button handler
  // const handlePay = (parcel) => {
  //   // In a real application, this would redirect the user to a payment page (e.g., Stripe, PayPal)
  //   // or open a payment modal with the parcel's price and details.
  //   console.log(
  //     "Initiating payment for parcel:",
  //     parcel._id,
  //     "Price:",
  //     parcel.price
  //   );
  //   alert(
  //     `Redirecting to payment for Parcel ID: ${parcel._id} (Price: $${parcel.price})`
  //   );

  //   // After successful payment, you would call refetch() to update the table data.
  //   // e.g., if (paymentSuccess) { refetch(); }
  // };

  // --- Conditional Rendering ---

  // 3. Handle Loading State
  if (isLoading) {
    return (
      <div className="text-center p-4">
        <span className="loading loading-spinner loading-lg"></span>
        <p>Loading parcels data...</p>
      </div>
    );
  }

  // 4. Handle Error State
  if (isError) {
    console.error("Parcel fetching error:", error);
    return (
      <div className="text-red-600 p-4 border border-red-300 bg-red-50">
        <h3 className="font-bold">Error Loading Data</h3>
        <p>
          There was a problem fetching your parcels. Please try again later.
        </p>
      </div>
    );
  }

  // 5. Handle Empty Data State
  if (parcels.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500 bg-gray-50 border rounded-lg">
        <p className="text-xl font-semibold">
          No parcels found for {user?.email || "this user"}.
        </p>
        <p>You haven't booked any parcels yet.</p>
      </div>
    );
  }

  // --- Render Data Table ---

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-accent">
        📦 My Parcels ({parcels.length})
      </h2>

      <div className="overflow-x-auto bg-white shadow-xl rounded-lg">
        <table className="table w-full">
          {/* Table Head */}
          <thead>
            <tr className="bg-accent text-white text-sm uppercase tracking-wider">
              <th>#</th>
              <th>Parcel Name</th>
              <th>Cost</th>
              <th>Delivarey Status</th>
              <th>Payment Status</th>
              <th>Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {parcels.map((parcel, index) => (
              <tr
                key={parcel._id}
                className="hover:bg-gray-50 transition duration-150"
              >
                <th>{index + 1}</th>
                <td className="font-medium">{parcel.parcelName || "N/A"}</td>
                <td className="font-semibold text-green-700">
                  ${(parcel.cost || 0).toFixed(2)}
                </td>
                <td>
                  <span
                    className={`badge ${
                      parcel.status === "Delivered"
                        ? "badge-success"
                        : parcel.status === "Cancelled"
                        ? "badge-error"
                        : "badge-warning"
                    } text-white`}
                  >
                    {parcel.status || "Pending"}
                  </span>
                </td>
                <td>
                  
                  {parcel.paymentStatus === "paid" ? (
                    <span className="font-semibold text-green-600">Paid</span>
                  ) : (
                    <Link to={`/deshboard/payment/${parcel._id}`}
                      // onClick={() => handlePay(parcel)}
                      className="btn btn-sm bg-green-500 hover:bg-green-600 text-white"
                    >
                      Pay
                    </Link>
                  )}
                </td>
                <td>
                  <button
                    // onClick={() => handleEdit(parcel)}
                    className="btn btn-sm btn-info text-white tooltip"
                    data-tip="Edit Parcel"
                  >
                    <FiEdit className="text-lg" />{" "}
                  </button>
                  {/* Cancel/Delete Button */}{" "}
                  <button
                    onClick={() => handleDelete(parcel._id)}
                    className="btn btn-sm btn-error text-white tooltip"
                    data-tip="Cancel Parcel"
                  >
                    <MdDelete className="text-lg" />{" "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;

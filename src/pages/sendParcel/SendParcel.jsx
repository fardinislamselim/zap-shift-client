import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SendParcel = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    control,
    reset,
  } = useForm({
    defaultValues: {
      parcelType: "non-document",
    },
  });

  const axiosSecure = useAxiosSecure();
  const serviceCenters = useLoaderData();

  // Handle unique regions
  const regionDuplicate = serviceCenters ? serviceCenters.map((c) => c.region) : [];
  const regions = [...new Set(regionDuplicate)];

  // Watch inputs
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });
  
  // 🔥 Parcel Type
  const parcelType = useWatch({ control, name: "parcelType" });

  const districtByRegion = (region) => {
    if (!region || !serviceCenters) return [];
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    return regionDistricts.map((d) => d.district);
  };

  const handleSendParcel = async (data) => {
    const isDocument = data.parcelType === "document";
    const isSameDistricts = data.senderDistrict === data.receiverDistrict;
    
    // যদি ডকুমেন্ট হয়, ওয়েট ০ ধরবে, না হলে ইনপুট থেকে নেবে
    const parcelWeight = isDocument ? 0 : parseFloat(data.parcelWeight);

    // 1. Calculate Cost
    let cost = 0;
    if (isDocument) {
      cost = isSameDistricts ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistricts ? 110 : 150;
      } else {
        const minimumCost = isSameDistricts ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistricts
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minimumCost + extraCharge;
      }
    }

    // 2. Prepare Final Data Object
    const parcelData = {
      ...data,
      parcelWeight: parcelWeight, 
      cost: cost,
      bookingDate: new Date().toISOString(),
      status: 'pending',
      senderEmail: user?.email
    };

    // 3. Confirm and Send
    Swal.fire({
      title: "Agree with the cost?",
      text: `You will be charged ${cost} taka!`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "I agree!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/parcels", parcelData)
          .then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                title: "Success!",
                text: "Your parcel has been booked successfully.",
                icon: "success",
              });
              reset();
            }
          })
          .catch((error) => {
            console.error(error);
            Swal.fire({
              title: "Error!",
              text: "Something went wrong.",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="p-10 bg-white rounded-2xl shadow-md">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-5">Book a Parcel</h2>
        <div className="divider"></div>
        
        <form onSubmit={handleSubmit(handleSendParcel)} className="space-y-6">
          
          {/* Parcel Type Radio Buttons */}
          <div className="flex gap-6 justify-center">
            <label className="cursor-pointer label gap-2">
              <input
                type="radio"
                value="non-document"
                {...register("parcelType", { required: true })}
                className="radio radio-primary"
              />
              <span className="label-text text-lg font-medium">Non Document</span>
            </label>
            <label className="cursor-pointer label gap-2">
              <input
                type="radio"
                value="document"
                {...register("parcelType", { required: true })}
                className="radio radio-primary"
              />
              <span className="label-text text-lg font-medium">Document</span>
            </label>
          </div>

          {/* Parcel Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label font-bold">Parcel Name</label>
              <input
                type="text"
                {...register("parcelName", { required: true })}
                className="input input-bordered w-full"
                placeholder="Ex: Gift Box"
              />
            </div>

            {parcelType === 'non-document' && (
              <div className="form-control">
                <label className="label font-bold">Parcel Weight (KG)</label>
                <input
                  type="number"
                  step="0.1"
                  {...register("parcelWeight", { required: true, min: 0 })}
                  className="input input-bordered w-full"
                  placeholder="Ex: 2.5"
                />
              </div>
            )}
            
          </div>

          <div className="divider"></div>

          {/* Sender & Receiver Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Sender Details */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-2xl font-bold mb-4 ">Sender Details</h4>
              
              <div className="form-control mb-3">
                <label className="label">Name</label>
                <input
                value={user?.displayName || ""}
                  type="text"
                  {...register("senderName", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>
              
              <div className="form-control mb-3">
                <label className="label">Email</label>
                <input
                  value={user?.email || ""}
                  readOnly
                  type="text"
                  {...register("senderEmail")}
                  className="input input-bordered w-full bg-gray-200"
                />
              </div>

              <div className="form-control mb-3">
                <label className="label">Region</label>
                <select
                  className="select select-bordered w-full"
                  {...register("senderRegion", { required: true })}
                >
                  <option value="">Select a Region</option>
                  {regions.map((r, i) => (
                    <option value={r} key={i}>{r}</option>
                  ))}
                </select>
              </div>

              <div className="form-control mb-3">
                <label className="label">District</label>
                <select
                  className="select select-bordered w-full"
                  {...register("senderDistrict", { required: true })}
                  disabled={!senderRegion}
                >
                  <option value="">Select a District</option>
                  {districtByRegion(senderRegion).map((d, i) => (
                    <option value={d} key={i}>{d}</option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">Full Address</label>
                <input
                  type="text"
                  {...register("senderAddress", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            {/* Receiver Details */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-2xl font-bold mb-4 text-secondary">Receiver Details</h4>
              
              <div className="form-control mb-3">
                <label className="label">Name</label>
                <input
                  type="text"
                  {...register("receiverName", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control mb-3">
                <label className="label">Email</label>
                <input
                  type="email"
                  {...register("receiverEmail", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control mb-3">
                <label className="label">Region</label>
                <select
                  className="select select-bordered w-full"
                  {...register("receiverRegion", { required: true })}
                >
                  <option value="">Select a Region</option>
                  {regions.map((r, i) => (
                    <option value={r} key={i}>{r}</option>
                  ))}
                </select>
              </div>

              <div className="form-control mb-3">
                <label className="label">District</label>
                <select
                  className="select select-bordered w-full"
                  {...register("receiverDistrict", { required: true })}
                  disabled={!receiverRegion}
                >
                  <option value="">Select a District</option>
                  {districtByRegion(receiverRegion).map((d, i) => (
                    <option value={d} key={i}>{d}</option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">Full Address</label>
                <input
                  type="text"
                  {...register("receiverAddress", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <input
              type="submit"
              value="Calculate & Send"
              className="btn btn-primary btn-wide text-black text-lg"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendParcel;
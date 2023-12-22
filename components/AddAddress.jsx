"use client";
import React, { useEffect, useState } from "react";
import AppButton from "./AppButton";
import { IoMdCloseCircle } from "react-icons/io";
import { listToStrings, stringsToList } from "@/utils/helpers";

export default function AddAddress({ address, onClose, onSave }) {
  const [addressList, setAddressList] = useState([]);
  useEffect(() => {
    if (!address) {
      setAddressList([
        {
          number: "",
          street: "",
          city: "",
          localGovt: "",
          state: "",
          country: "",
        },
      ]);
    } else {
      const values = stringsToList(address);
      const addressValues = values.map((value) => {
        const details = stringsToList(value, " ");
        const number = details[0];
        const street = details[1];
        const city = details[2];
        const localGovt = details[3];
        const state = details[4];
        const country = details[5];
        return {
          number,
          street,
          city,
          localGovt,
          state,
          country,
        };
      });
      setAddressList(addressValues);
    }
  }, [address]);
  function addNewAddress() {
    setAddressList((prev) => [
      ...prev,
      {
        number: "",
        street: "",
        city: "",
        localGovt: "",
        state: "",
        country: "",
      },
    ]);
  }
  function updateAddress(index, key, value) {
    setAddressList((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    );
  }
  function removeAddress(index) {
    setAddressList((prev) => prev.filter((item, i) => i !== index));
  }
  function convertToAddressString() {
    return listToStrings(
      addressList.map(
        (address) =>
          `${address.number} ${address.street} ${address.city} ${address.localGovt} ${address.state} ${address.country}`
      )
    );
  }
  return (
    <div
      className="left-0 right-0 bg-gray-300/50 absolute w-full h-full flex flex-col items-center justify-center"
      onClick={() => {
        onClose();
      }}
    >
      <div
        className="bg-white flex flex-col items-center justify-center gap-5 px-3 md:px-5 py-4 rounded-lg w-full md:w-[70%] min-h-[50%]"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2 className="font-bold text-lg text-center">Add Address</h2>
        <ul className="w-full flex flex-col gap-6 md:gap-3 overflow-y-auto">
          {addressList.map((address, i) => (
            <div
              key={address}
              className="flex flex-col md:flex-row gap-2 group"
            >
              <div className="flex flex-col items-center">
                <div className="flex w-full flex-wrap text-center">
                  <input
                    className="w-[50%] md:w-[16%] text-center"
                    type="text"
                    placeholder="House Number"
                    value={address.number}
                    onChange={(e) => {
                      const textOnlyRegex = /^[A-Za-z0-9\s]+$/;
                      if (
                        textOnlyRegex.test(e.target.value) ||
                        e.target.value === ""
                      ) {
                        updateAddress(i, "number", e.target.value);
                      }
                    }}
                  />
                  <input
                    className="w-[50%] md:w-[16%] text-center"
                    type="text"
                    placeholder="Street"
                    value={address.street}
                    onChange={(e) => {
                      const textOnlyRegex = /^[A-Za-z\s]+$/;
                      if (
                        textOnlyRegex.test(e.target.value) ||
                        e.target.value === ""
                      ) {
                        updateAddress(i, "street", e.target.value);
                      }
                    }}
                  />
                  <input
                    className="w-[50%] md:w-[16%] text-center"
                    type="text"
                    placeholder="City"
                    value={address.city}
                    onChange={(e) => {
                      const textOnlyRegex = /^[A-Za-z\s]+$/;
                      if (
                        textOnlyRegex.test(e.target.value) ||
                        e.target.value === ""
                      ) {
                        updateAddress(i, "city", e.target.value);
                      }
                    }}
                  />
                  <input
                    className="w-[50%] md:w-[16%] text-center"
                    type="text"
                    placeholder="Local Govt"
                    value={address.localGovt}
                    onChange={(e) => {
                      const textOnlyRegex = /^[A-Za-z\s]+$/;
                      if (
                        textOnlyRegex.test(e.target.value) ||
                        e.target.value === ""
                      ) {
                        updateAddress(i, "localGovt", e.target.value);
                      }
                    }}
                  />
                  <input
                    className="w-[50%] md:w-[16%] text-center"
                    type="text"
                    placeholder="State"
                    value={address.state}
                    onChange={(e) => {
                      const textOnlyRegex = /^[A-Za-z\s]+$/;
                      if (
                        textOnlyRegex.test(e.target.value) ||
                        e.target.value === ""
                      ) {
                        updateAddress(i, "state", e.target.value);
                      }
                    }}
                  />
                  <input
                    className="w-[50%] md:w-[16%] text-center"
                    type="text"
                    placeholder="Country"
                    value={address.country}
                    onChange={(e) => {
                      const textOnlyRegex = /^[A-Za-z\s]+$/;
                      if (
                        textOnlyRegex.test(e.target.value) ||
                        e.target.value === ""
                      ) {
                        updateAddress(i, "country", e.target.value);
                      }
                    }}
                  />
                </div>

                <IoMdCloseCircle
                  className="hidden group-hover:block text-lg duration-300 ease-in-out transition-all"
                  onClick={() => {
                    removeAddress(i);
                  }}
                />
              </div>
            </div>
          ))}
        </ul>
        <div className="w-full flex justify-evenly items-center">
          <AppButton
            outline={true}
            onClick={() => {
              onClose();
            }}
          >
            Cancel
          </AppButton>
          <AppButton
            outline={true}
            onClick={() => {
              addNewAddress();
            }}
          >
            Add
          </AppButton>

          <AppButton
            onClick={() => {
              const addressString = convertToAddressString();
              if (addressString != address) {
                onSave(addressString);
              }
              onClose();
            }}
          >
            Done
          </AppButton>
        </div>
      </div>
    </div>
  );
}

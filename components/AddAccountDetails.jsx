"use client";
import React, { useEffect, useState } from "react";
import AppButton from "./AppButton";
import { allBanks } from "@/app/banks";
import { IoMdCloseCircle } from "react-icons/io";
import { listToStrings, stringsToList } from "@/utils/helpers";

export default function AddAccountDetails({ accountDetails, onClose, onSave }) {
  const [accountDetailsList, setAccountDetailsList] = useState([]);
  useEffect(() => {
    if (!accountDetails) {
      setAccountDetailsList([
        {
          bank: "",
          accountName: "",
          accountNumber: "",
        },
      ]);
    } else {
      const values = stringsToList(accountDetails);
      const accountDetailsValues = values.map((value) => {
        const details = stringsToList(value, "-");
        const bank = details[0];
        const accountName = details[1];
        const accountNumber = details[2];
        return {
          bank,
          accountName,
          accountNumber,
        };
      });
      setAccountDetailsList(accountDetailsValues);
    }
  }, [accountDetails]);
  function updateAccountDetails(index, key, value) {
    setAccountDetailsList((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    );
  }
  function addNewAccountDetails() {
    setAccountDetailsList((prev) => [
      ...prev,
      {
        bank: "",
        accountName: "",
        accountNumber: "",
      },
    ]);
  }
  function removeAccountDetails(index) {
    setAccountDetailsList((prev) => prev.filter((item, i) => i !== index));
  }
  function convertToAccountDetailsString() {
    return listToStrings(
      accountDetailsList.map(
        (details) =>
          `${details.bank}-${details.accountName}-${details.accountNumber}`
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
        <h2 className="font-bold text-lg text-center">Add Account Details</h2>
        <ul className="w-full flex flex-col gap-6 md:gap-3 overflow-y-auto">
          {accountDetailsList.map((details, i) => (
            <div key={details} className="w-full flex items-center gap-2 group">
              <select
                className="flex-1 w-full"
                value={details.bank}
                onChange={(e) => {
                  updateAccountDetails(i, "bank", e.target.value);
                }}
              >
                {allBanks.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              <input
                className="flex-1 w-full"
                type="text"
                placeholder="Account Name"
                value={details.accountName}
                onChange={(e) => {
                  const textOnlyRegex = /^[A-Za-z\s]+$/;

                  if (
                    textOnlyRegex.test(e.target.value) ||
                    e.target.value === ""
                  ) {
                    updateAccountDetails(i, "accountName", e.target.value);
                  }
                }}
              />
              <input
                className="flex-1 w-full"
                type="number"
                placeholder="Account Number"
                value={details.accountNumber}
                onChange={(e) => {
                  updateAccountDetails(i, "accountNumber", e.target.value);
                }}
              />
              <IoMdCloseCircle
                className="hidden group-hover:block text-lg duration-300 ease-in-out transition-all"
                onClick={() => {
                  removeAccountDetails(i);
                }}
              />
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
              addNewAccountDetails();
            }}
          >
            Add
          </AppButton>

          <AppButton
            onClick={() => {
              const accountDetailsString = convertToAccountDetailsString();
              if (accountDetailsString != accountDetails) {
                onSave(accountDetailsString);
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

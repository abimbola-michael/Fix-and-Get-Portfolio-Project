"use client";
import React, { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import AppButton from "./AppButton";
import HoursChooser from "./HoursChooser";
import { listToStrings, stringsToList } from "@/utils/helpers";

const times = Array.from({ length: 24 }, (_, i) => {
  const hour = i % 12 || 12;
  return `${hour}:00${i < 12 ? "AM" : "PM"}`;
});
const days = Array.from({ length: 7 }, (_, i) => {
  if (i === 0) return "Monday";
  if (i === 1) return "Tuesday";
  if (i === 2) return "Wednesday";
  if (i === 3) return "Thursday";
  if (i === 4) return "Friday";
  if (i === 5) return "Saturday";
  if (i === 6) return "Sunday";
});
export default function SelectWorkHours({
  businessOpenHours,
  onClose,
  onSave,
}) {
  const [hours, setHours] = useState([]);
  useEffect(() => {
    if (!businessOpenHours) {
      setHours([
        {
          startDay: "",
          endDay: "",
          startTime: "",
          endTime: "",
        },
      ]);
    } else {
      const values = stringsToList(businessOpenHours);
      const hoursValues = values.map((value) => {
        const daysTimes = stringsToList(value, " ");
        const days = stringsToList(daysTimes[0], "-");
        const times = stringsToList(daysTimes[1], "-");
        const startDay = days[0];
        const endDay = days[1] ?? "";
        const startTime = times[0];
        const endTime = times[1];

        return {
          startDay,
          endDay,
          startTime,
          endTime,
        };
      });
      setHours(hoursValues);
    }
  }, [businessOpenHours]);
  function getPreviouslyUnSelectedDays(index) {
    const list = hours.slice(0, index);
    let prevSelDays = [];
    list.forEach((hour) => {
      const startIndex = days.indexOf(hour.startDay);
      const endIndex = hour.endDay ? days.indexOf(hour.endDay) : startIndex;
      const possibleDays = days.slice(startIndex, endIndex + 1);
      prevSelDays = [...prevSelDays, ...possibleDays];
    });
    return days.filter((day, i) => !prevSelDays.includes(day));
  }
  function removeWorkingHour(index) {
    setHours((hours) => hours.filter((hour, i) => i !== index));
  }
  function addNewWorkingHour() {
    setHours((hours) => [
      ...hours,
      { startDay: "", endDay: "", startTime: "", endTime: "" },
    ]);
  }
  function updateWorkingHours(type, index, value) {
    // if (type === "startDay" || type === "endDay") {
    //   setSelectedDays((seldays) => {
    //     if (
    //       seldays.length > 0 &&
    //       days.indexOf(value) > days.indexOf(seldays[seldays.length - 1])
    //     ) {
    //       return [
    //         ...seldays,
    //         ...days.slice(
    //           days.indexOf(seldays[seldays.length - 1]) + 1,
    //           days.indexOf(value) + 1
    //         ),
    //       ];
    //     }
    //     return [...seldays, value];
    //   });
    // }
    setHours((hours) => {
      const newHours = hours.map((hour, i) => {
        if (i === index) {
          return { ...hour, [type]: value };
        } else {
          return hour;
        }
      });
      return newHours;
    });
  }

  function convertToBusinessHours() {
    const hoursStrings = hours.map((hour) => {
      const startDay = hour.startDay;
      const endDay = hour.endDay;
      const startTime = hour.startTime;
      const endTime = hour.endTime;
      return `${startDay}${endDay !== "" ? `-${endDay}` : ""} ${startTime}${
        endTime !== "" ? `-${endTime}` : ""
      }`;
    });
    return listToStrings(hoursStrings);
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
        <h2 className="font-bold text-lg text-center">Select Work Hours</h2>
        <ul className="w-full flex flex-col gap-6 md:gap-3 overflow-y-auto">
          {hours.map((hour, i) => (
            <div
              key={i}
              className="w-full flex flex-col gap-3 md:gap-0 md:flex-row items-center justify-evenly px-2 group"
            >
              <div className="flex items-center">
                <HoursChooser
                  title={"Start Day"}
                  list={getPreviouslyUnSelectedDays(i)}
                  value={hour.startDay}
                  onChange={(value) => {
                    updateWorkingHours("startDay", i, value);
                  }}
                />
                <HoursChooser
                  title={"End Day"}
                  list={getPreviouslyUnSelectedDays(i)}
                  value={hour.endDay}
                  onChange={(value) => {
                    updateWorkingHours("endDay", i, value);
                  }}
                />
              </div>

              <div className="flex items-center">
                <HoursChooser
                  title={"Start Time"}
                  list={times}
                  value={hour.startTime}
                  onChange={(value) => {
                    updateWorkingHours("startTime", i, value);
                  }}
                />
                <HoursChooser
                  title={"End Time"}
                  list={times}
                  value={hour.endTime}
                  onChange={(value) => {
                    updateWorkingHours("endTime", i, value);
                  }}
                />
              </div>

              <IoMdCloseCircle
                className="hidden group-hover:block text-lg duration-300 ease-in-out transition-all"
                onClick={() => {
                  removeWorkingHour(i);
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
              if (getPreviouslyUnSelectedDays(hours.length).length > 0) {
                addNewWorkingHour();
              } else {
                alert("All days are covered");
              }
            }}
          >
            Add
          </AppButton>

          <AppButton
            onClick={() => {
              const businessHourString = convertToBusinessHours();
              if (businessHourString != businessOpenHours) {
                onSave(businessHourString);
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

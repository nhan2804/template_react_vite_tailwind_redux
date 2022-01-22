import { Skeleton } from "antd";
import React, { useEffect } from "react";
import { memo } from "react";
import useClassification from "./hooks/useClassification";
const Classification = ({ file }) => {
  const {
    mutate: classi,
    data: dataClass,
    isLoading: isLoadingClass,
  } = useClassification();
  const onClass = () => {
    const formData = new FormData();
    formData.append("file", file);
    classi(formData, {
      onSuccess: (d) => {
        console.log(d);
      },
    });
  };
  useEffect(() => {
    onClass();
  }, []);
  const mapping = {
    dog: "Dog",
    cat: "Cat",
  };
  if (isLoadingClass) {
    return (
      <div>
        <Skeleton active></Skeleton>
      </div>
    );
  }
  return (
    <div>
      <div>
        <div className="relative ">
          <div className="absolute top-0 right-0 !m-0 text-3xl text-white px-4 py-2 bg-blue-500">
            {mapping?.[dataClass] || "Unknown"}
          </div>
          <img
            className="w-full h-[200px]"
            alt="ll"
            src={URL.createObjectURL(file)}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(Classification);

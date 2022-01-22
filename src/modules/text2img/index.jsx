import { Button, Col, Row, Select, Space, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import useExtraText from "./hooks/useExtraText";
import useSharp from "./hooks/useSharp";
import useClassification from "./hooks/useClassification";
import Classification from "./Classification";
const { Option } = Select;
function Text2Img(props) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const [file, setstate] = useState();
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <img className="h-20 w-full" alt="d" src={URL.createObjectURL(file)} />
    </li>
  ));
  useEffect(() => {
    setstate(acceptedFiles?.[0]);
  }, [acceptedFiles]);
  const { mutate, data, isLoading } = useExtraText();
  const {
    mutate: sharp,
    data: dataSharp,
    isLoading: isLoadingSharp,
  } = useSharp();
  const {
    mutate: classi,
    data: dataClass,
    isLoading: isLoadingClass,
  } = useClassification();
  const onExtra = () => {
    const formData = new FormData();
    formData.append("file", acceptedFiles?.[0]);
    mutate(formData, {
      onSuccess: (d) => {
        console.log(d);
      },
    });
  };
  const onClass = () => {
    const formData = new FormData();
    formData.append("file", acceptedFiles?.[0]);
    classi(formData, {
      onSuccess: (d) => {
        console.log(d);
      },
    });
  };
  const [type, setType] = useState("");
  const onSharp = () => {
    const formData = new FormData();
    formData.append("file", acceptedFiles?.[0]);

    sharp(
      { type, formData },
      {
        onSuccess: (d) => {
          console.log(d);
        },
      }
    );
  };
  const mappig = {
    dog: "Dog",
    cat: "Cat",
  };
  const [isClass, setisClass] = useState(false);

  const handleChange = (type) => {
    setType(type);
  };
  return (
    <>
      <Row>
        <Col span={12} className="flex justify-center items-center mt-40">
          <section className="container flex justify-center spacing-2 items-center">
            <div className="">
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <p
                  className={
                    "flex border w-80 h-60 p-2 text-center items-center justify-center text-2xl font-semibold"
                  }
                >
                  Choose a image
                </p>
              </div>
            </div>
          </section>
          {file && <h4 className="ml-12">Files</h4>}
          <ul className="grid grid-cols-6 gap-4 p-2 ml-10">{files}</ul>
          <div className="flex justify-center">
            <div className="flex space-x-3">
              <Button
                onClick={onExtra}
                style={{ margin: 4 }}
                color="primary"
                type="primary"
                loading={isLoading}
              >
                Extract Text
              </Button>
              <Space>
                <Select
                  defaultValue="sharp"
                  style={{ width: 120 }}
                  onChange={handleChange}
                >
                  <Option value="sharp">Sharp</Option>
                  <Option value="gaussian">Gaussian</Option>
                  <Option value="embossing">Embossing</Option>
                  <Option value="negative">Negative</Option>
                  <Option value="blur">Blur</Option>
                </Select>

                <Button
                  onClick={onSharp}
                  style={{ margin: 4 }}
                  type="ghost"
                  loading={isLoadingSharp}
                >
                  Sharpen Image
                </Button>
              </Space>
              <Button
                onClick={() => setisClass(true)}
                style={{ margin: 4 }}
                loading={isLoadingClass}
                danger
              >
                Classification Image
              </Button>
            </div>
          </div>
        </Col>
        <Col span={12}>
          {data && <h1 className="text-center text-3xl">Extract Text</h1>}
          <div className="flex justify-center">
            {data && (
              <div className="flex">
                {data && (
                  <textarea rows={10} cols={80}>
                    {data}
                  </textarea>
                )}
              </div>
            )}
          </div>

          {dataSharp && (
            <h1 className="text-center text-3xl">
              {" "}
              {type?.toUpperCase()} IMAGE
            </h1>
          )}
          <div className="flex justify-center mr-14">
            {dataSharp && (
              <div className="flex space-x-1">
                <div>
                  <h1 className="text-center text-2xl">Before</h1>
                  <img
                    className="w-[500px]"
                    alt="ll"
                    src={URL.createObjectURL(file)}
                  />
                </div>
                <div>
                  <h1 className="text-center text-2xl">Alter</h1>
                  <img className="w-[500px]" alt="ll" src={dataSharp} />
                </div>
              </div>
            )}
          </div>
          {/* <div className="flex justify-center">
            {dataClass && (
              <div className="flex">
                <div>
                  <h1 className="text-center text-2xl">Result</h1>
                  <div className="relative ">
                    <div className="absolute top-0 right-0 !m-0 text-3xl text-white px-4 py-2 bg-blue-500">
                      {mappig?.[dataClass] || "Unknown"}
                    </div>
                    <img
                      className="w-[500px]"
                      alt="ll"
                      src={URL.createObjectURL(file)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div> */}
          {isClass && (
            <div className="grid grid-cols-4 gap-2 mt-2">
              {acceptedFiles?.map((e) => {
                return <Classification file={e} />;
              })}
            </div>
          )}
        </Col>
      </Row>
    </>
  );
}
export default Text2Img;

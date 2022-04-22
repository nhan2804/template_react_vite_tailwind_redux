import {
  Button,
  Col,
  Form,
  Row,
  Select,
  Skeleton,
  Slider,
  Space,
  Switch,
  Tag,
} from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useRef } from "react";
import { useDropzone } from "react-dropzone";
import { useQueryClient } from "react-query";
import useImageProcessing, { typeIP } from "../hooks/useImageProcessing";
const { Option } = Select;
function ImageProcessing(props) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const [file, setstate] = useState();
  const [model, setMode] = useState(false);
  const [filter, SetFilter] = useState();
  // const files = acceptedFiles.map((file) => (
  //   <li key={file.path}>
  //     {file.path} - {file.size} bytes
  //     <img className="h-20 w-full" alt="d" src={URL.createObjectURL(file)} />
  //   </li>
  // ));
  useEffect(() => {
    setstate(acceptedFiles?.[0]);
  }, [acceptedFiles]);

  const [type, setType] = useState("");
  const refButton = useRef();
  const [form] = Form.useForm();
  const dataFilterImage = useMemo(() => {
    switch (type) {
      case typeIP.brightNess:
        const marks = {
          0: "100",

          100: "150",
        };
        return (
          <Form.Item label="Val" name="val">
            <Slider marks={marks} defaultValue={30} min={100} max={150} />
          </Form.Item>
        );
      case typeIP.tv60:
        return (
          <>
            <Form.Item label="Val" name="val">
              <Slider defaultValue={0} min={0} max={255} />
            </Form.Item>
            <Form.Item label="Thresh" name="thresh">
              <Slider defaultValue={0} min={0} max={100} />
            </Form.Item>
          </>
        );

        break;

      default:
        break;
    }
  }, [type]);
  const {
    mutate: handleImage,
    isLoading,
    data: dataImageP,
    reset,
  } = useImageProcessing(type);

  const fileNameImgP = dataImageP?.split("/")?.[4];
  console.log({ fileNameImgP });
  const onReset = () => {
    reset();
  };
  const onHandleImage = () => {
    const formData = new FormData();
    formData.append("file", acceptedFiles?.[0]);
    if (fileNameImgP && model) {
      formData.append("last_img", "" + fileNameImgP);
    }
    Object.keys(filter).forEach((key) => formData.append(key, filter[key]));
    handleImage(formData);
    // sharp(
    //   { type, formData },
    //   {
    //     onSuccess: (d) => {
    //       console.log(d);
    //     },
    //   }
    // );
  };
  useEffect(() => {
    refButton.current.click();
  }, [filter]);

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
                  Choose image
                </p>
              </div>
            </div>
          </section>
          <Switch
            defaultChecked={model}
            onChange={(checked) => setMode(checked)}
          />
          {file && <h4 className="ml-12">Files</h4>}
          {/* <ul className="grid grid-cols-6 gap-4 p-2 ml-10">{files}</ul> */}
          <div className="flex justify-center">
            <div className="flex space-x-3">
              <Space>
                <Select
                  defaultValue="sharp"
                  style={{ width: 120 }}
                  onChange={handleChange}
                >
                  <Option value="emboss">Emboss</Option>
                  <Option value="brightness">Brightness</Option>
                  <Option value="tv-60">Tv-60</Option>
                  <Option value="sepia">Sepia</Option>
                  <Option value="duo-tone">duo-tone</Option>
                </Select>

                <Button
                  ref={refButton}
                  onClick={onHandleImage}
                  style={{ margin: 4 }}
                  loading={isLoading}
                  type="primary"
                >
                  Run
                </Button>
                <Button
                  onClick={onReset}
                  style={{ margin: 4 }}
                  danger
                  type="primary"
                >
                  Reset
                </Button>
              </Space>
            </div>
          </div>
          <div className="w-96d text-center p-4">
            <Form
              onValuesChange={(changedValues, allValues) => {
                console.log("changed");
                SetFilter((s) => allValues);
              }}
              form={form}
              layout=""
              autoComplete="off"
            >
              {dataFilterImage}
            </Form>
          </div>
        </Col>

        <Col span={12} className="mt-20">
          {dataImageP && (
            <h1 className="text-center text-3xl">
              {" "}
              {type?.toUpperCase()} IMAGE
            </h1>
          )}
          <div className="flex justify-center mr-14">
            <div className="flex space-x-1">
              <div>
                <h1 className="text-center text-2xl">Before</h1>
                <img
                  className="w-[500px]"
                  alt=""
                  src={file ? URL.createObjectURL(file) : ""}
                />
              </div>
              <div>
                <h1 className="text-center text-2xl">After</h1>
                {dataImageP ? (
                  <div className="w-[500px]">
                    <img className="w-full" alt="" src={dataImageP} />
                  </div>
                ) : (
                  <div className="w-[500px]">
                    {file ? (
                      // <Skeleton.Image paragraph={4} active loading />
                      <img
                        className="w-full"
                        alt=""
                        src={file ? URL.createObjectURL(file) : ""}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}
export default ImageProcessing;

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
  Layout,
} from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useRef } from "react";
import { useDropzone } from "react-dropzone";
import { useQueryClient } from "react-query";
import useImageProcessing, { typeIP } from "../hooks/useImageProcessing";
const { Option } = Select;
function ImageProcessing(props) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const { Header, Content, Footer } = Layout;
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
        const marksB = {
          100: {label: <strong>100</strong>,}, 
          150: {label: <strong>150</strong>,}, 
        };  
        return (
          <Form.Item label={'Val'} name="val" >
            <Slider marks={marksB} initialValue={100} min={100} max={150} />
          </Form.Item>
        );
        break;
      case typeIP.tv60:
          const marksV = {
            0: {label: <strong>0</strong>,}, 
            255: {label: <strong>255</strong>,}, 
          };  
          const marksT = {
            0: {label: <strong>0</strong>,}, 
            100: {label: <strong>100</strong>,}, 
          };  
          return (
            <>
              <Form.Item label={'Val'} name="val">
                <Slider marks={marksV} initialValue={0} min={0} max={255} />
              </Form.Item>
              <Form.Item label={'Threshold'} name="thresh">
                <Slider marks={marksT} initialValue={0} min={0} max={100} />
              </Form.Item>
            </>
          );
        break;
      case typeIP.emBoss:
        const size = {
          0: {label: <strong>0</strong>,}, 
          8: {label: <strong>8</strong>,}, 
        };  
        const sw = {
          0: {label: <strong>0</strong>,}, 
          1: {label: <strong>1</strong>,}, 
          2: {label: <strong>2</strong>,}, 
          3: {label: <strong>3</strong>,}, 
        };  
        return (
          <>
            <Form.Item label="Size" name="size">
              <Slider marks={size} initialValue={0}  min={0} max={8} />
            </Form.Item>
            <Form.Item label="0 : BL, 1 : BR, 2 : TR, 3 : BR" name="switch">
              <Slider marks={sw} initialValue={0} step={1} min={0} max={3} />
            </Form.Item>
          </>
        );
        break;
      case typeIP.duoTone:
          const exp = {
            0: {label: <strong>0</strong>,}, 
            10: {label: <strong>10</strong>,}, 
          };  
          const s1 = {
            0: {label: <strong>BLUE</strong>,}, 
            1: {label: <strong>GREEN</strong>,}, 
            2: {label: <strong>RED</strong>,}, 
          };
          const s2 = {
            0: {label: <strong>BLUE</strong>,}, 
            1: {label: <strong>GREEN</strong>,}, 
            2: {label: <strong>RED</strong>,}, 
            3: {label: <strong>NONE</strong>,}, 
          };    
          const s3 = {
            0: {label: <strong>DARK</strong>,}, 
            1: {label: <strong>LIGHT</strong>,}, 
          };  
          return (
            <>
              <Form.Item label="Exponent" name="exponent">
                <Slider marks={exp} initialValue={0}  min={0} max={10} />
              </Form.Item>
              <Form.Item label="0 : BLUE, 1 : GREEN, 2 : RED" name="s1">
                <Slider marks={s1} initialValue={0} step={1} min={0} max={2} />
              </Form.Item>
              <Form.Item label="0 : BLUE, 1 : GREEN, 2 : RED, 3 : NONE" name="s2">
                <Slider marks={s2} initialValue={0} step={1} min={0} max={3} />
              </Form.Item>
              <Form.Item label="0 : DARK, 1 : LIGHT" name="s3">
                <Slider marks={s3} initialValue={0} step={1} min={0} max={1} />
              </Form.Item>
            </>
          );
          break;
      case typeIP.sepia:
        break;
      case typeIP.negative:
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
    if(filter){
      Object.keys(filter).forEach((key) => formData.append(key, filter[key]));
    }
    handleImage(formData);
    console.log(filter);
  };
  useEffect(() => {
    refButton.current.click();
  }, [filter]);

  const handleChange = (type) => {
    setType(type);
  };
  return (
    <Layout>
    <Content style={{ padding: '0 50px' }}>
      <Row>
        <Col span={24} className="flex justify-center items-center mt-10">
          <Row>
            <Col span={12}>
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
          
          {/* {file && <h4 className="ml-12">Files</h4>} */}
          {/* <ul className="grid grid-cols-6 gap-4 p-2 ml-10">{files}</ul> */}
            </Col>
            <Col span={12}>
              <Row>
                <Col span={24}>
                  <h4>Use continous</h4> 
                   <Switch
                        defaultChecked={model}
                        onChange={(checked) => setMode(checked)}
                      />
                </Col>
              </Row>
              <Row>
              <Col span={24} className="mt-5">
              <h4>Option</h4>
              <Space>
                <Select
                  defaultValue={null}
                  style={{ width: 120 }}
                  onChange={handleChange}
                >
                  <Option value="brightness">Brightness</Option>
                  <Option value="emboss">Emboss</Option>
                  <Option value="duo-tone">DuoTone</Option>
                  <Option value="tv-60">Tv-60</Option>
                  <Option value="sepia">Sepia</Option>
                  <Option value="negative">Negative</Option>
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

              </Col>
              </Row>
              <Row>
              <Col span={24} className="mt-5">
              <Form
               layout="vertical"
                onValuesChange={(changedValues, allValues) => {
                  console.log("changed");
                  SetFilter((s) => allValues);
                }}
                form={form}
                autoComplete="off"
              >
                {dataFilterImage}
              </Form>
              </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        <Col span={24} className="mt-10 mb-20">
          {dataImageP && (
            <h1 className="text-center text-3xl">
              {" "}
              {type?.toUpperCase()} IMAGE
            </h1>
          )}
          <Row>
            <Col span={12}>
            <div>
                {file && <h1 className="text-center text-2xl">Before</h1>}
                {/* <h1 className="text-center text-2xl">Before</h1> */}
                <div className="w-full flex justify-center items-center">
                  <img
                  style={{ 
                    width:'99%'
                   }}
                  alt=""
                  src={file ? URL.createObjectURL(file) : ""}
                />
                </div>
                
              </div>
            </Col>
            <Col span={12}>
            <div>
            {file && <h1 className="text-center text-2xl">After</h1>}
                {/* <h1 className="text-center text-2xl">After</h1> */}
                {dataImageP ? (
                  <div className="w-full flex justify-center items-center">
                    <img  style={{ 
                    width:'99%'
                   }}
                    alt="" src={dataImageP} />
                  </div>
                ) : (
                  <div className="w-full flex justify-center items-center">
                    {file ? (
                      // <Skeleton.Image paragraph={4} active loading />
                      <img
                         style={{ 
                            width:'99%',
                          }}
                        alt=""
                        src={file ? URL.createObjectURL(file) : ""}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Content>
    </Layout>

  );
}
export default ImageProcessing;

import { Badge, Button, Layout, Menu } from "antd";
import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { useAppSelector } from "@hooks/reduxHook";
// import { logout } from "@modules/auth/slices";
import UserMenu from "./UserMenu";

const { Header } = Layout;

const HeaderNav = () => {
  const user = useAppSelector((store) => store?.auth?.user);
  // const dispatch = useAppDispatch();
  return (
    <Header className="flex justify-between">
      <div className="logo">
        <img
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYjEltJ_8sy7kj6gw5fuLPJIsNDvP6UpRsLA&usqp=CAU"
          }
          alt="logo"
        />
      </div>

      <Menu
        theme="dark"
        mode="horizontal"
        className="justify-center flex-grow text-white"
      >
        <Menu.Item>
          <Link to="/">Trang chủ</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/extra-text-from-image">
            {/* <Badge count={"!"}> */}
            <span className="text-white">Extra Text From Image</span>
            {/* </Badge> */}
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/sharpen-image">
            {/* <Badge count={"!"}> */}
            <span className="text-white">Filtered Image</span>
            {/* </Badge> */}
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/image-classification">
            {/* <Badge count={"!"}> */}
            <span className="text-white">Image Classification</span>
            {/* </Link></Badge> */}
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/image-processing">
            {/* <Badge count={"!"}> */}
            <span className="text-white">Image Processing</span>
            {/* </Link></Badge> */}
          </Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default HeaderNav;

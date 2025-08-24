"use client";
import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider } from "antd";
import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const Provider = ({ children }) => {
  return (
    <div>
      <ConfigProvider>
        <AntdRegistry>{children}</AntdRegistry>
      </ConfigProvider>
    </div>
  );
};

export default Provider;

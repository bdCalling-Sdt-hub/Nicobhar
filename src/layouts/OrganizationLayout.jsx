import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Layout } from 'antd';
import MainHeader from "../components/LayoutsComponents/MainHeader";
import LocationEmployeSidebar from "../components/LayoutsComponents/LocationEmployeSidebar";
import ThirdpartySidebar from "../components/LayoutsComponents/ThirdpartySidebar";
import OrganizationSidebar from "../components/LayoutsComponents/OrganizationSidebar";
import { useSelector } from "react-redux";


const { Content } = Layout;


const OrganizationLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const user = useSelector((state) => state.auth.user);


    if (!user) {
        return <Navigate to="/login" />;
    }
    if (user.role !== 'organization') {
        return <Navigate to="/login" />;
    }
    return (
        <div className=" !bg-white" style={{ backgroundColor: "white" }}>
            <Layout className=" !bg-white" style={{ backgroundColor: "white" }}>

                <OrganizationSidebar collapsed={collapsed} ></OrganizationSidebar>
                <Layout
                    style={{
                        marginLeft: collapsed ? 80 : 250,
                        transition: 'margin-left 0.2s ease',
                    }}
                    className={``}>
                    {/* my header */}
                    <MainHeader setCollapsed={setCollapsed} collapsed={collapsed}></MainHeader>
                    <Content
                        className="p-5"
                        style={{}}
                    >
                        {/* my content */}
                        <Outlet></Outlet>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default OrganizationLayout;
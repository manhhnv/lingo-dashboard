import { Fragment, useState } from "react";
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";


type DashboardLayoutProps = {
    children?: JSX.Element
}

const DashboardLayout = (props: DashboardLayoutProps) => {

    const [isMobileNavOpen, setMobileNavOpen] = useState(false);

    return (
        <Fragment>
            <DashboardNavbar
                onMobileClose={() => setMobileNavOpen(!isMobileNavOpen)}
            />
            <DashboardSidebar
                onMobileClose={() => setMobileNavOpen(!isMobileNavOpen)}
                openMobile={isMobileNavOpen}
            />
            <div
                style={{
                    display: 'flex',
                    flex: '1 1 auto',
                    overflow: 'hidden',
                    paddingTop: 64,
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flex: '1 1 auto',
                        overflow: 'hidden'
                    }}
                >
                    <div
                        style={{
                            flex: '1 1 auto',
                            height: '100%',
                            overflow: 'auto'
                        }}
                    >
                        {props.children}
                    </div>
                </div>
            </div>
        </Fragment>
    )
};

export default DashboardLayout;

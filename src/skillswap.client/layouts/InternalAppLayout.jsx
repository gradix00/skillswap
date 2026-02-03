import './InternalAppLayout.css';
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SidebarTabsContainerComponent from '../components/SidebarTabsContainerComponent';

export function InternalAppLayout() {
    const location = useLocation();
    const isSubView = location.pathname !== '/app';

    return (
        <div className={`internal-app-layout ${isSubView ? 'subview-active' : ''}`}>
            
            <aside className="internal-app-layout-sidebar">
                <SidebarTabsContainerComponent />
            </aside>

            <main className="internal-app-layout-main">
                <Outlet /> 
            </main>
            
        </div>
    );
}

export default InternalAppLayout;
import './InternalAppLayout.css';
import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarTabsContainerComponent from '../components/SidebarTabsContainerComponent';

export function InternalAppLayout() {
    return (
        <div className="internal-app-layout">
            
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
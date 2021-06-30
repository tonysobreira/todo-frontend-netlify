import React from 'react';
import HomeComponent from 'components/HomeComponent';

export const HomePage = () => {

    return (
        <div className="p-grid">
            <div className="p-col-12">
                <div className="card">
                    <h5>Home</h5>
                    <HomeComponent />
                </div>
            </div>
        </div>
    );
}

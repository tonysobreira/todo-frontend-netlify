import React from 'react';
import AboutComponent from 'components/AboutComponent';

export const AboutPage = () => {

    return (
        <div className="p-grid">
            <div className="p-col-12">
                <div className="card">
                    <h5>About</h5>
                    <AboutComponent />
                </div>
            </div>
        </div>
    );
}

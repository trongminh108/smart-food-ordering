import React from 'react';
import './loading_spinner.scss';

export default function LoadingSpinner() {
    return (
        <div className="loader">
            <div className="worm"></div>
            <div className="circleMiddle"></div>
        </div>
    );
}

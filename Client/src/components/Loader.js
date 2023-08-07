import React from 'react'

function Loader() {
    return (
        <div class="app-drawer-overlay animated fadeIn" style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%"
            
        }}>
            <div className="loader-wrapper d-flex justify-content-center align-items-center">
                <div className="loader align-items-center">
                    <div className="ball-spin-fade-loader" >
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loader;
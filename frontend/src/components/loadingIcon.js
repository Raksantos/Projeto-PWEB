import React, { Component } from 'react'

export default class LoadingIcon extends Component {
    render() {
        return (
            <div className="row justify-content-md-center" id="wrapper">
                <div class="profile-main-loader">
                    <div class="loader">
                        <svg class="circular-loader" viewBox="25 25 50 50" >
                            <circle class="loader-path" cx="50" cy="50" r="20" fill="none" stroke="#70c542" stroke-width="2" />
                        </svg>
                    </div>
                </div>
            </div>
        )
    }

}

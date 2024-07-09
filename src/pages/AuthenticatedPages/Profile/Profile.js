import React, { useState, useEffect } from 'react';
import ProfileImage from '../../../assets/images/profiledummy.jpg';
const Profile = () => {
    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 50,
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <h2 style={{marginBottom: 50}}>Profile</h2>
                <img src={ProfileImage} alt="noImage" height={190} />
                <div
                    style={{
                        marginTop: 15
                    }}>
                    <strong>Email : </strong> vivek@yopmail.com
                </div>
            </div>
        </>
    )
}

export default Profile;
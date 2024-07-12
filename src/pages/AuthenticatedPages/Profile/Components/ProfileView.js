import React from 'react';
import { ProfileWrapper } from '../styles';
import ProfileImage from '../../../../assets/images/profiledummy.jpg';

const ProfileView = ({ user }) => {
    return (
        <ProfileWrapper>
            <img src={ProfileImage} alt="noImage" height={190} />
            <div
                style={{
                    marginTop: 15
                }}>
                <strong>Name : </strong> {user?.name}
            </div>
            <div
                style={{
                    marginTop: 15
                }}>
                <strong>Email : </strong> {user?.email}
            </div>
            <div
                style={{
                    marginTop: 15
                }}>
                <strong>Phone No. : </strong> {user?.mobileNumber}
            </div>
        </ProfileWrapper>
    )
}

export default ProfileView;


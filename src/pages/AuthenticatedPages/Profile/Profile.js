import React, { useEffect, useState } from 'react';
import ProfileImage from '../../../assets/images/profiledummy.jpg';
import useGet from '../../../hooks/useGet';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../features/User/myslice';
const Profile = () => {
    const { user} = useSelector((state) => state.user);
    const [Users, setUsers] = useState(user);
    const { mutateAsync: UserGet } = useGet();
    const dispatch = useDispatch();
    const CompanyId = localStorage.getItem('companyId');
    const fetchData = () => {
        UserGet({
          url: `users/user-details/${CompanyId}`,
          type: 'details',
          token: true
        })
          .then((res) => {
            // console.log(res,'Users');
            setUsers(res);
            dispatch(getUser({ user: res }));
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      };
      useEffect(() => {
        fetchData();
      }, []);
    
      useEffect(() => {
        setUsers(user);
      }, [user]);
    // console.log('Users',Users)
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
                <img src={ProfileImage} alt="noImage" height={190} />
                <div
                    style={{
                        marginTop: 15
                    }}>
                    <strong>Name : </strong> {Users?.name}
                </div>
                <div
                    style={{
                        marginTop: 15
                    }}>
                    <strong>Email : </strong> {Users?.email}
                </div>
            </div>
        </>
    )
}

export default Profile;
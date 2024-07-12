import React, { useEffect, useState } from 'react';
import useGet from '../../../hooks/useGet';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../features/User/myslice';
import { Tabs } from 'antd';
import ProfileView from './Components/ProfileView';
import UpdateProfile from './Components/UpdateProfile';
import UpdatePassword from './Components/UpdatePassword';

const Profile = () => {
    
    const { user } = useSelector((state) => state.user);
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
            <Tabs
                type="card"
                items={[
                    {
                        label: `Profile`,
                        key: 1,
                        children: <ProfileView user={Users} />,
                    },
                    {
                        label: `Update Profile`,
                        key: 2,
                        children: <UpdateProfile user={Users} fetchData={() => fetchData()} />
                    },
                    {
                        label: `Update Password`,
                        key: 3,
                        children: <UpdatePassword user={Users} />,
                    }
                ]}

            />
        </>
    )
}

export default Profile;
import React, { useEffect, useState } from 'react';
import ProfileImage from '../../../assets/images/profiledummy.jpg';
import useGet from '../../../hooks/useGet';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../features/User/myslice';
import { BoxInput } from './styles';
import { Input, Button } from 'antd';
import usePatch from 'hooks/usePatch';
import { toast } from 'react-hot-toast';

const Profile = () => {
    const { mutateAsync: UserPasswordPatch } = usePatch();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errors, setErrors] = useState({ username: '' });
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
    const handleUpdatePassword = (e) => {
        e.preventDefault();

        let valid = true;
        let errors = { oldPassword: '', newPassword: '' };

        if (!oldPassword) {
            errors.oldPassword = '* Require';
            valid = false;
        } if (!newPassword) {
            errors.newPassword = '* Require';
            valid = false;
        }

        setErrors(errors);

        if (valid) {
            const payload = {
                id: Users.id,
                oldPassword,
                newPassword
            };

            UserPasswordPatch({
                url: `users/change-password`,
                type: 'details',
                payload: payload,
                token: true
            })
                .then((res) => {
                    toast.success('Password Successfully Updated.');
                    console.log(res);
                })
                .catch((err) => {
                    console.error(err);
                    toast.error('Password Update Failed.');
                });
        }
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
                <form onSubmit={handleUpdatePassword} style={{
                    marginTop: 45
                }}>
                    <BoxInput>
                        <label>Old Password {errors.oldPassword && <span style={{ color: 'red' }}>{errors.oldPassword}</span>}</label>
                        <Input
                            size="large"
                            type="text"
                            value={oldPassword}
                            onChange={(e) => {
                                setOldPassword(e.target.value);
                                if (e.target.value && errors.oldPassword) {
                                    setErrors((prev) => ({ ...prev, oldPassword: '' }));
                                }
                            }}
                            placeholder="Enter Old Password"
                        />
                    </BoxInput>
                    <BoxInput>
                        <label>New Password {errors.newPassword && <span style={{ color: 'red' }}>{errors.newPassword}</span>}</label>
                        <Input
                            size="large"
                            type="text"
                            value={newPassword}
                            onChange={(e) => {
                                setNewPassword(e.target.value);
                                if (e.target.value && errors.newPassword) {
                                    setErrors((prev) => ({ ...prev, newPassword: '' }));
                                }
                            }}
                            placeholder="Enter New Password"
                        />
                    </BoxInput>
                    <Button
                        // onClick={handleLogin}
                        type="primary"
                        size="large"
                        style={{ backgroundColor: '#003e6b', marginTop: "30px", width: "100%" }}
                        htmlType="submit"
                    >
                        Update
                    </Button>
                </form>
            </div>
        </>
    )
}

export default Profile;
import React, { useState } from 'react';
import { ProfileWrapper, BoxInput, Form } from '../styles';
import { Input, Button } from 'antd';
import usePatch from 'hooks/usePatch';
import { toast } from 'react-hot-toast';

const UpdatePassword = ({user}) => {

    const { mutateAsync: UserPasswordPatch } = usePatch();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({ username: '' });

    const handleUpdatePassword = (e) => {
        e.preventDefault();

        let valid = true;
        let errors = { oldPassword: '', newPassword: '', confirmPassword: '' };

        if (!oldPassword) {
            errors.oldPassword = '* Require';
            valid = false;
        } if (!newPassword) {
            errors.newPassword = '* Require';
            valid = false;
        } if (!confirmPassword) {
            errors.confirmPassword = '* Require';
            valid = false;
        }
        if (newPassword != confirmPassword) {
            toast.error('Password & Confirm Password are not matching.');
            valid = false;
        }

        setErrors(errors);

        if (valid) {
            const payload = {
                id: user.id,
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
                    setConfirmPassword('');
                    setOldPassword('');
                    setNewPassword('');
                    console.log(res);
                })
                .catch((err) => {
                    console.error(err);
                    toast.error('Password Update Failed.');
                });
        }
    };
    return (
        <ProfileWrapper>
            <Form onSubmit={handleUpdatePassword} >
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
                <BoxInput>
                    <label>Confirm New Password {errors.confirmPassword && <span style={{ color: 'red' }}>{errors.confirmPassword}</span>}</label>
                    <Input
                        size="large"
                        type="text"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            if (e.target.value && errors.confirmPassword) {
                                setErrors((prev) => ({ ...prev, confirmPassword: '' }));
                            }
                        }}
                        placeholder="Confirm New Password"
                    />
                </BoxInput>
                <Button
                    type="primary"
                    size="large"
                    style={{ backgroundColor: '#003e6b', marginTop: "30px", width: "100%" }}
                    htmlType="submit"
                >
                    Update
                </Button>
            </Form>
        </ProfileWrapper>
    )
}

export default UpdatePassword;


import React, { useState } from 'react';
import { ProfileWrapper, BoxInput, Form } from '../styles';
import ProfileImage from '../../../../assets/images/profiledummy.jpg';
import usePatch from 'hooks/usePatch';
import { toast } from 'react-hot-toast';
import { Input, Button } from 'antd';

const UpdateProfile = ({ user, fetchData }) => {
    const { mutateAsync: UserProfilePatch } = usePatch();
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [file, setFile] = useState(null);
    const [blob, setBlob] = useState(user?.profilePic || null);
    const [mobileNum, setMobileNum] = useState(user.mobileNumber);

    const onFileUpload = (e) => {
       setFile(e.target.files[0]);
       if(e.target.files[0])
       setBlob(URL?.createObjectURL(e.target.files[0]))
    }
    const handleUpdateProfile = (e) => {
        e.preventDefault();
            const payload = {
                id: user.id,
                name,
                email,
                mobileNumber: mobileNum,
            };
            const formData = new FormData();
            for (const key in payload) {
                formData.append(key, payload[key])
            }
            formData.append('profilePic', file)

            UserProfilePatch({
                url: `users/update-profile`,
                type: 'details',
                payload: formData,
                token: true,
                file: true
            })
                .then((res) => {
                    toast.success('Profile Successfully Updated.');
                    fetchData();
                })
                .catch((err) => {
                    console.error(err);
                    toast.error('Profile Update Failed.');
                });
    };
    return (
        <ProfileWrapper>
            <Form onSubmit={handleUpdateProfile} >
                <img src={blob ? blob : ProfileImage} alt="noImage" width={220} height={200} />
                <BoxInput>
                    <label>Update Profile Image</label>
                    <input type="file" accept=".png, .jpg, .jpeg" onChange={onFileUpload} />
                </BoxInput>
                <BoxInput>
                    <label>Name</label>
                    <Input
                        size="large"
                        type="text"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        placeholder="Name"
                    />
                </BoxInput>
                <BoxInput>
                    <label>Email</label>
                    <Input
                        size="large"
                        type="text"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        placeholder="Email"
                    />
                </BoxInput>
                <BoxInput>
                    <label>Mobile Number </label>
                    <Input
                        size="large"
                        type="text"
                        value={mobileNum}
                        onChange={(e) => {
                            setMobileNum(e.target.value);
                        }}
                        placeholder="Mobile Number"
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

export default UpdateProfile;


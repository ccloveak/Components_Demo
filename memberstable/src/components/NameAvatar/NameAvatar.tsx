import React, { FC } from 'react';
import { Avatar } from 'antd';

interface NameAvatarProp {
    name?: string;
    photoUrl?: string;
    size?: number;
    bordered?: boolean;
}

const NameAvatar: FC<NameAvatarProp> = (props) => {
    const getAvatarName = (username?: string) => {
        if (!username) {
            return 'U';
        }
        const [lastName, firstName] = username.split(' ');
        if (lastName && firstName) {
            return lastName.substring(0, 1) + firstName.substring(0, 1);
        }
        return lastName.substring(0, 1);
    };

    return (
        <span title={props.name}>
            <Avatar
                size={props.size}
                src={props.photoUrl}
                style={{
                    color: '#f56a00',
                    backgroundColor: '#fff5ee',
                    border: props.bordered ? '1px solid #f1c19c' : '',
                }}
            >
                {getAvatarName(props.name)}
            </Avatar>
        </span>
    );
};

export default NameAvatar;

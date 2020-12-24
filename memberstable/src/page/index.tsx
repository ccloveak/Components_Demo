import React, { FC, useCallback } from 'react';
import { Store } from 'antd/lib/form/interface';
import MemberTable from '../template/index';

interface MemberTablePageProps {
    readonly?: boolean;
}
type MemeberStatusType = 'beforeJoining' | 'enrolled' | 'resigned';
export interface Member {
    id: string;
    mail: string;
    name: string;
    kana?: string;
    photoUrl?: string;
    primaryOrgId?: string;
    positionCode?: string;
    status: MemeberStatusType;
}

const MemberTablePage: FC<MemberTablePageProps> = (props) => {
    const memberValues:Member[] = require('../mock/memberInfo.json')
    const sections = require('../mock/sectionInfo.json')

    const handleChange = useCallback(
        async (page: number, pageSize: number, sortParam: string) => {
            console.log("call handleChange")
            //do soming
        },
        [],
    );

    const handleSearch = useCallback(
        async (values: Store) => {
            console.log("call handleSearch")
            //do soming
        },
        [],
    );

    const handleDelete = async (member: Member) => {
        console.log("call handleDelete")
        //do soming
    };

    return (
        <>
            <MemberTable
                loading={false}
                readonly={false}
                members={memberValues || []}
                sections={sections}
                searchMembers={handleSearch}
                deleteMember={handleDelete}
                handleChange={handleChange}
                membersTotal={20}
                pageDataStart={1}
                pageDataEnd={20}
                currentPage={1}
                pageSize={20}
                //从url中获取搜索关键字传给template
                // searchQueryParams={urlKeywords}
                //从url中获取排序传给template
                // urlSort={urlSort}
            />
        </>
    );
};

export default MemberTablePage;

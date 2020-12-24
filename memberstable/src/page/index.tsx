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

enum SectionStatus {
    'active',
    'disabled',
}

interface SectionItem {
    id: string;
    code?: string;
    name: string;
    kana: string;
    status?: SectionStatus;
    parentId?: string;
    leaderId?: string;
    localeNames?: {
        ja: string;
        en: string;
    };
    leaderName?: string;
    photoUrl?: string;
    _fieldForSearch?: string;
    sort?: string;
    children?: SectionItem[];
}


const MemberTablePage: FC<MemberTablePageProps> = (props) => {
     const memberValues:Member[] = [
        {
            "id": "M013",
            "mail": "uchino.naoko@example.com",
            "name": "内野 奈緒子",
            "kana": "ウチノ ナオコ",
            "photoUrl": "https://smartcompanydev.blob.core.windows.net/photos/model_f06.png",
            "primaryOrgId": "SYSTENENGINEERING_JIGYOUHONNBU",
            "positionCode": "",
            "status": "enrolled"
        },
        {
            "id": "M018",
            "mail": "ootomo.yasuhiro@example.com",
            "name": "大友 康博",
            "kana": "オオトモ ヤスヒロ",
            "photoUrl": "https://smartcompanydev.blob.core.windows.net/photos/model_m09.png",
            "primaryOrgId": "SEIHINNKAIHATUBU_BU",
            "positionCode": "",
            "status": "enrolled"
        },
        {
            "id": "M012",
            "mail": "ogura.keiji@example.com",
            "name": "小倉 慶治",
            "kana": "オグラ ケイジ",
            "photoUrl": "https://smartcompanydev.blob.core.windows.net/photos/model_m06.png",
            "primaryOrgId": "KANRI_HONNBU",
            "positionCode": "",
            "status": "enrolled"
        },
        {
            "id": "M019",
            "mail": "onoda.kazuyuki@example.com",
            "name": "小野田 和幸",
            "kana": "オノダ カズユキ",
            "photoUrl": "https://smartcompanydev.blob.core.windows.net/photos/model_m10.png",
            "primaryOrgId": "GIJYUTUKAIHATU_BU",
            "positionCode": "",
            "status": "enrolled"
        },
        {
            "id": "2034",
            "mail": "jia.yukun@example-g.co.jp",
            "name": "賈 兄",
            "kana": "カ ギョクコン",
            "photoUrl": "https://examplescidev.blob.core.windows.net/photos/2034.jpg?photoversion=wvHuraMdGd",
            "primaryOrgId": "SHINNGIJYUTUKAIHATU_SHITU",
            "positionCode": "",
            "status": "enrolled"
        },
        {
            "id": "M017",
            "mail": "kageyama.ayumi@example.com",
            "name": "影山 歩美",
            "kana": "カゲヤマ アユミ",
            "photoUrl": "https://smartcompanydev.blob.core.windows.net/photos/model_f08.png",
            "primaryOrgId": "HOUJINNEIGYOU_BU",
            "positionCode": "",
            "status": "enrolled"
        },
        {
            "id": "M003",
            "mail": "kamiyama.yoshiji@example.com",
            "name": "上山 良治",
            "kana": "カミヤマ ヨシジ",
            "photoUrl": "https://smartcompanydev.blob.core.windows.net/photos/model_m02.png",
            "primaryOrgId": "SYSTENENGINEERING_JIGYOUHONNBU",
            "positionCode": "",
            "status": "enrolled"
        },
        {
            "id": "M020",
            "mail": "kawaguchi.ayano@example.com",
            "name": "川口 文乃",
            "kana": "カワグチ アヤノ",
            "photoUrl": "https://smartcompanydev.blob.core.windows.net/photos/model_f09.png",
            "primaryOrgId": "SHINNSHUUGYOU_KA",
            "positionCode": "",
            "status": "enrolled"
        },
        {
            "id": "M020-test",
            "mail": "kawaguchi.ayano@example.com",
            "name": "川口 文乃",
            "kana": "カワグチ アヤノ",
            "photoUrl": "https://smartcompanydev.blob.core.windows.net/photos/model_f09.png",
            "primaryOrgId": "SHINNSHUUGYOU_KA",
            "positionCode": "",
            "status": "enrolled"
        },
        {
            "id": "M011",
            "mail": "kawanishi.mio@example.com",
            "name": "川西 澪",
            "kana": "カワニシ ミオ",
            "photoUrl": "https://examplescidev.blob.core.windows.net/photos/M011.png?photoversion=uYWHeqnE78",
            "primaryOrgId": "SHINNGIJYUTUKAIHATU_SHITU",
            "positionCode": "",
            "status": "enrolled"
        },
        {
            "id": "2030",
            "mail": "han.yuanchi@example-g.co.jp",
            "name": "韓 兄",
            "kana": "カン ゲンチ",
            "photoUrl": "https://examplescidev.blob.core.windows.net/photos/2030.jpg?photoversion=TEq8VmyrS5",
            "primaryOrgId": "SHINNGIJYUTUKAIHATU_SHITU",
            "positionCode": "",
            "status": "enrolled"
        },
        {
            "id": "M004",
            "mail": "kitajima.yoshimi@example.com",
            "name": "北島 芳美",
            "kana": "キタジマ ヨシミ",
            "photoUrl": "https://smartcompanydev.blob.core.windows.net/photos/model_f01.png",
            "primaryOrgId": "SOLUTION_JIGYOUHONNBU",
            "positionCode": "",
            "status": "enrolled"
        },
        {
            "id": "2037",
            "mail": "huang.jianing@example-g.co.jp",
            "name": "黄 姐",
            "kana": "コウ カネイ",
            "photoUrl": "https://examplescidev.blob.core.windows.net/photos/2037.jpg?photoversion=H7dxUccxUg",
            "primaryOrgId": "SHINNGIJYUTUKAIHATU_SHITU",
            "positionCode": "",
            "status": "enrolled"
        },
        {
            "id": "NS00079",
            "mail": "cui.zicheng@example-sci.co.jp",
            "name": "崔 兄",
            "kana": "サイ ジセイ",
            "photoUrl": "https://examplescidev.blob.core.windows.net/photos/NS00079.jpg?photoversion=0TbVs6De1Y",
            "primaryOrgId": "GIJYUTUKAIHATU_BU",
            "positionCode": "",
            "status": "enrolled"
        },
        {
            "id": "M009",
            "mail": "sagawa.miki@example.com",
            "name": "佐川 美希",
            "kana": "サガワ ミキ",
            "photoUrl": "https://smartcompanydev.blob.core.windows.net/photos/model_f04.png",
            "primaryOrgId": "GIJYUTUKAIHATU_BU",
            "positionCode": "",
            "status": "enrolled"
        },
        {
            "id": "M015",
            "mail": "sanada.shinichirou@example.com",
            "name": "真田 新一郎",
            "kana": "サナダ シンイチロウ",
            "photoUrl": "https://smartcompanydev.blob.core.windows.net/photos/model_m07.png",
            "primaryOrgId": "JIGYOUSUISHINN_SHITU",
            "positionCode": "",
            "status": "enrolled"
        },
        {
            "id": "NS100088",
            "mail": "shuu.ei@example-sci.co.jp",
            "name": "祝 兄",
            "kana": "シュウ エイ",
            "photoUrl": "",
            "primaryOrgId": "SHINNGIJYUTUKAIHATU_SHITU",
            "positionCode": "",
            "status": "enrolled"
        },
        {
            "id": "UNIT001",
            "mail": "taro@example.com",
            "name": "スマート 太郎",
            "kana": "スマート タロウ",
            "photoUrl": "https://smartcompanydev.blob.core.windows.net/photos/model_m09.png",
            "primaryOrgId": "__UNIT_TEST1",
            "positionCode": "",
            "status": "enrolled"
        },
        {
            "id": "UNIT002",
            "mail": "hanako@example.com",
            "name": "スマート 花子",
            "kana": "スマート ハナコ",
            "photoUrl": "https://smartcompanydev.blob.core.windows.net/photos/model_f09.png",
            "primaryOrgId": "__UNIT_TEST2",
            "positionCode": "",
            "status": "enrolled"
        },
        {
            "id": "UNIT010",
            "mail": "manager@example.com",
            "name": "スマート マネージャー",
            "kana": "スマート マネージャー",
            "photoUrl": "",
            "primaryOrgId": "__UNIT_TEST1",
            "positionCode": "",
            "status": "enrolled"
        }
    ];
    
     const sections:SectionItem[] = [
        {
            "id": "KANRI_HONNBU",
            "code": "100",
            "name": "管理本部",
            "kana": "カンリホンブ",
            "parentId": "__ROOT",
            "leaderId": "M002"
        },
        {
            "id": "__ROOT",
            "code": "__ROOT",
            "name": "組織ルート",
            "kana": "ソシキルート",
            "parentId": "",
            "leaderId": ""
        },
        {
            "id": "ZAIMUKEIRI_BU",
            "code": "110",
            "name": "財務経理部",
            "kana": "ザイムケイリブ",
            "parentId": "KANRI_HONNBU",
            "leaderId": "M012"
        },
        {
            "id": "JINJISOUMU_BU",
            "code": "120",
            "name": "人事総務部",
            "kana": "ジンジソウムブ",
            "parentId": "KANRI_HONNBU",
            "leaderId": "M013"
        },
        {
            "id": "SYSTENENGINEERING_JIGYOUHONNBU",
            "code": "200",
            "name": "システムエンジニアリング事業本部",
            "kana": "システムエンジニアリングジギョウホンブ",
            "parentId": "__ROOT",
            "leaderId": "M003"
        },
        {
            "id": "EIGYOUSUISHINN_BU",
            "code": "210",
            "name": "営業推進部",
            "kana": "エイギョウスイシンブ",
            "parentId": "SYSTENENGINEERING_JIGYOUHONNBU",
            "leaderId": "M014"
        },
        {
            "id": "SYSTEMENGINEERING_BU",
            "code": "220",
            "name": "システムエンジニアリング部",
            "kana": "システムエンジニアリングブ",
            "parentId": "SYSTENENGINEERING_JIGYOUHONNBU",
            "leaderId": "M015"
        },
        {
            "id": "SOLUTION_JIGYOUHONNBU",
            "code": "300",
            "name": "ソリューション事業本部",
            "kana": "ソリューションジギョウホンブ",
            "parentId": "__ROOT",
            "leaderId": "M004"
        },
        {
            "id": "JIGYOUSUISHINN_SHITU",
            "code": "301",
            "name": "事業推進室",
            "kana": "ジギョウスイシンシツ",
            "parentId": "SOLUTION_JIGYOUHONNBU",
            "leaderId": "M005"
        },
        {
            "id": "MARKETING_SHITU",
            "code": "302",
            "name": "マーケッティングシツ",
            "kana": "マーケッティングシツ",
            "parentId": "SOLUTION_JIGYOUHONNBU",
            "leaderId": "M006"
        },
        {
            "id": "HOUJINNEIGYOU_BU",
            "code": "303",
            "name": "法人営業部",
            "kana": "ホウジンエイギョウブ",
            "parentId": "SOLUTION_JIGYOUHONNBU",
            "leaderId": "M007"
        },
        {
            "id": "SEIHINNKAIHATUBU_BU",
            "code": "330",
            "name": "製品開発部",
            "kana": "セイヒンカイハツブ",
            "parentId": "SOLUTION_JIGYOUHONNBU",
            "leaderId": "M008"
        },
        {
            "id": "GIJYUTUKAIHATU_BU",
            "code": "340",
            "name": "技術開発部",
            "kana": "ギジュツカイハツブ",
            "parentId": "SOLUTION_JIGYOUHONNBU",
            "leaderId": "M009"
        },
        {
            "id": "SHINNSHUUGYOU_KA",
            "code": "345",
            "name": "新就業課",
            "kana": "シンシュウギョウカ",
            "parentId": "GIJYUTUKAIHATU_BU",
            "leaderId": "M010"
        },
        {
            "id": "SHINNGIJYUTUKAIHATU_SHITU",
            "code": "346",
            "name": "新技術開発室",
            "kana": "シンギジュツカイハツシツ",
            "parentId": "GIJYUTUKAIHATU_BU",
            "leaderId": "M011"
        },
        {
            "id": "__UNUSED",
            "code": "__UNUSED",
            "name": "所属なし",
            "kana": "ショゾクナシ",
            "parentId": "",
            "leaderId": ""
        },
        {
            "id": "__UNIT_TEST1",
            "code": "09001",
            "name": "テスト推進室",
            "kana": "テストスイシンシツ",
            "parentId": "__ROOT",
            "leaderId": "UNIT010"
        },
        {
            "id": "__UNIT_TEST2",
            "code": "09002",
            "name": "自動化テストチーム",
            "kana": "ジドウカテストチーム",
            "parentId": "__UNIT_TEST1",
            "leaderId": "UNIT011"
        }
    ];

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

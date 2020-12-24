import { Button, Input, Space, Typography } from 'antd';
import { DownOutlined, PlusOutlined, UpOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import ProTable, { ColumnsState, ProColumns } from '@ant-design/pro-table';
import React, { FC, useEffect, useState } from 'react';
import { Member } from '../page/index';
import NameAvatar from '../components/NameAvatar/NameAvatar';
import PaginationTotal from '../components/PaginationTotal/PaginationTotal';
import { Store } from 'antd/lib/form/interface';
import { calcCurrentPage } from '../utils/PagingUtil';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';

export interface TableListItem {
    key: number;
    name: string;
    status: string;
    mail: string;
    employeeCode: string;
    progress: number;
    money: number;
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

interface MemberTableProp {
    loading?: boolean;
    members: Member[];
    sections?: SectionItem[];
    searchMembers?: (filters: Store) => Promise<void>;
    deleteMember?: (member: Member) => Promise<void>;
    readonly?: boolean;
    handleChange?: (page: number, pageSize: number, sortParam: string) => void;
    membersTotal?: number;
    pageDataStart?: number;
    pageDataEnd?: number;
    currentPage?: number;
    pageSize?: number;
    searchQueryParams?: string;
    urlSort?: string;
}

const defaultColConfig = {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 12,
    xl: 8,
    xxl: 6,
};

const lineColConfig = { xs: 24, sm: 24, md: 12, lg: 12, xl: 12, xxl: 12 };

const MemberTable: FC<MemberTableProp> = (props) => {
    const history = useHistory();
    const {
        readonly,
        loading,
        pageDataStart,
        pageDataEnd,
        membersTotal,
        handleChange,
        members,
        currentPage,
        pageSize,
        searchQueryParams,
        //urlSort,
    } = props;
    const searchDefaultValue = JSON.parse(searchQueryParams ? searchQueryParams : '');
    const [searchCollapsed, setSearchCollpased] = useState(true);
    const screens = useBreakpoint();
    const [columnsStateMap, setColumnsStateMap] = useState<{
        [key: string]: ColumnsState;
    }>({});

    // 根据屏幕大小控制初始是否显示多余的列，默认手机端只显示氏名那一列
    useEffect(() => {
        if (screens.xs) {
            // xs
            setColumnsStateMap({
                mail: { show: false },
                id: { show: false },
                status: { show: false },
            });
        } else if (!screens.xs && !screens.lg) {
            // sm, md
            setColumnsStateMap({
                mail: { show: false },
                id: { show: true },
                status: { show: false },
            });
        } else {
            // 大于md
            setColumnsStateMap({
                mail: { show: true },
                id: { show: true },
                status: { show: true },
            });
        }
    }, [screens]);

    const handleQwordSearch = (value: string) => {
        props.searchMembers && props.searchMembers({ q: value });
    };

    const handleDelete =
        props.deleteMember ||
        (() => {
            console.log('delete member');
        });

    const searchSubmit =
        props.searchMembers ||
        ((value: Store) => {
            console.log(value);
        });

    //设置状态的初始值，从props中获得或者默认为all
    const setStatusInitialValue = () => {
        if (searchDefaultValue['status']) {
            return searchDefaultValue['status'][0];
        } else {
            return 'all';
        }
    };

    // //设置目标url
    // const setLinkToTarget = (
    //     isInSetupPage: boolean,
    //     searchQueryParams: string | undefined,
    //     id: string,
    // ) =>{}

    // //从url判断排序顺序
    // const setDisplaySort = (columnKey: string) => {
    //     //do something
    // };

    const columns: ProColumns<Member>[] = [
        {
            title: "模糊查找",
            hideInTable: true,
            dataIndex: 'q',
            // eslint-disable-next-line react/display-name,@typescript-eslint/no-unused-vars
            renderFormItem: (_, { type, defaultRender, ...rest }) => {
                if (type === 'form') {
                    return null;
                }
                return searchCollapsed ? (
                    <Input.Search
                        {...rest}
                        placeholder="请输入名字邮箱员工号"
                        defaultValue={searchDefaultValue['q']}
                        enterButton={searchCollapsed}
                        onSearch={handleQwordSearch}
                        onPressEnter={() => {}}
                    />
                ) : (
                    <Input
                        {...rest}
                        placeholder="请输入名字邮箱员工号"
                        defaultValue={searchDefaultValue['q']}
                    />
                );
            },
        },
        {
            title: "名字",
            dataIndex: 'kana',
            width: 250,
            sorter: true,
            sortDirections: ['ascend', 'descend', 'ascend'],
            // eslint-disable-next-line react/display-name
            render: (_, row) => (
                <Space>
                    <Link
                        to="#testurl"
                        //IDがすべて数字である場合の防止
                        id={`ID_` + row.id}
                    >
                        <NameAvatar
                            size={72}
                            name={row.name}
                            photoUrl="img.url"
                        />
                    </Link>
                    <Space direction="vertical" size={2}>
                        <Typography.Text style={{ fontSize: '17px' }}>{row.name}</Typography.Text>
                        <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
                            {row.kana}
                        </Typography.Text>
                        <Typography.Text style={{ fontSize: '12px' }}>
                            {props.sections &&
                                props.sections.find((item) => row.primaryOrgId === item.id)?.name}
                        </Typography.Text>
                    </Space>
                </Space>
            ),
            hideInForm: true,
            // eslint-disable-next-line react/display-name,@typescript-eslint/no-unused-vars
            renderFormItem: (_, { type, defaultRender, ...rest }) => (
                <Input
                    {...rest}
                    defaultValue={searchDefaultValue['name CONTAINS']}
                    data-testid={'searchNameTest'}
                />
            ),
        },
        {
            title: "邮箱",
            key: 'mail',
            dataIndex: 'mail',
            width: 100,
            sorter: true,
            sortDirections: ['ascend', 'descend', 'ascend'],
            // eslint-disable-next-line react/display-name,@typescript-eslint/no-unused-vars
            renderFormItem: (_, { type, defaultRender, ...rest }) => {
                if (type === 'form') {
                    return null;
                }
                return <Input {...rest} defaultValue={searchDefaultValue['mail CONTAINS']} />;
            },
        },
        {
            title: "员工编号",
            key: 'id',
            dataIndex: 'id',
            width: 100,
            sorter: true,
            sortDirections: ['ascend', 'descend', 'ascend'],
            // eslint-disable-next-line react/display-name,@typescript-eslint/no-unused-vars
            renderFormItem: (_, { type, defaultRender, ...rest }) => {
                if (type === 'form') {
                    return null;
                }
                return <Input {...rest} defaultValue={searchDefaultValue['id CONTAINS']} />;
            },
        },
        {
            title: "状态",
            key: 'status',
            dataIndex: 'status',
            initialValue: setStatusInitialValue(),
            width: 100,
            filters: false,
            sorter: true,
            sortDirections: ['ascend', 'descend', 'ascend'],
            valueEnum: {
                all: { text: "全部", status: 'Default' },
                beforeJoining: { text: "入职前" },
                enrolled: { text: "在职中" },
                resigned: { text: "离职" },
            },
        },
    ];

    if (!readonly) {
        columns.push({
            title: "操作",
            key: 'option',
            width: 120,
            valueType: 'option',
            render: (_, row) => [
                <Button type="link" key="b" onClick={() => handleDelete(row)}>
                    删除
                </Button>,
            ],
        });
    }

    return (
        <ProTable<Member>
            columns={columns}
            columnsStateMap={columnsStateMap}
            onColumnsStateChange={(map) => setColumnsStateMap(map)}
            rowKey="id"
            pagination={{
                // eslint-disable-next-line react/display-name
                showTotal: () => {
                    return (
                        <PaginationTotal
                            total={membersTotal}
                            dataStart={pageDataStart}
                            dataEnd={pageDataEnd}
                        />
                    );
                },
                total: Number(membersTotal),
                current: calcCurrentPage(Number(pageDataStart), Number(currentPage)),
                pageSize: pageSize,
                pageSizeOptions: ['20', '50', '100'],
                showSizeChanger: true,
                locale: {
                    items_per_page: " 条/页",
                },
            }}
            onChange={(pagination, filters, sorter) => {
                pagination['current'] &&
                    pagination['pageSize'] &&
                    handleChange &&
                    handleChange(
                        pagination['current'],
                        pagination['pageSize'],
                        `{"${Object.values(sorter)[2]}": "${Object.values(sorter)[1]}"}`,
                    );
            }}
            loading={loading}
            dataSource={members}
            options={{
                density: false,
                reload: false,
                fullScreen: false,
                setting: false,
                search: false,
            }}
            showSorterTooltip={false}
            dateFormatter="string"
            headerTitle="成员一览"
            onSubmit={searchSubmit}
            search={{
                span: searchCollapsed ? lineColConfig : defaultColConfig,
                onCollapse: (collapsed) => {
                    setSearchCollpased(collapsed);
                },
                // eslint-disable-next-line react/display-name
                collapseRender: (collapsed) => {
                    return collapsed ? (
                        <div>
                            <span>详细搜索</span>
                            <DownOutlined />
                        </div>
                    ) : (
                        <div>
                            <span>收起</span>
                            <UpOutlined />
                        </div>
                    );
                },
                optionRender: (_, { form }) => {
                    return searchCollapsed
                        ? []
                        : [
                              <Button
                                  key="resetText"
                                  onClick={() => {
                                      form?.resetFields();
                                  }}
                              >
                                  重置
                              </Button>,
                              <Button
                                  type="primary"
                                  key="searchText"
                                  onClick={() => {
                                      form?.submit();
                                  }}
                                  data-testid="detailsearch"
                              >
                                  搜索
                              </Button>,
                          ];
                },
            }}
            toolBarRender={() =>
                readonly
                    ? []
                    : [
                          <Button
                              key="newButton"
                              type="primary"
                              onClick={() => history.push('/setup/add-member')}
                          >
                              <PlusOutlined />
                              新建
                          </Button>,
                      ]
            }
        />
    );
};

export default MemberTable;

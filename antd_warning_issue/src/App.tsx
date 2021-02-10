import './App.css';

import React, { FC } from 'react';
import { Button, Card, Form, Input, List } from 'antd';
import { MenuOutlined, PieChartOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import queryString from 'query-string';

interface CardListItemDataType {
    id: string;
    name: string;
    [propName: string]: string | number | boolean;
}

interface SheetItem extends CardListItemDataType {
    id: string;
    name: string;
    categoryName: string;
    memberCount: number;
}

const App: FC = () => {
    const sheets: SheetItem[] = [];
    for (let i = 0; i < 20; i++) {
        sheets[i] = {
            id: i.toString(),
            updatedAt: '2020-12-18T02:39:40Z',
            updatedByName: '木の子',
            categoryName: '資格情報',
            name: i < 10 ? '英語資格' : 'IT資格',
            sheetDefinitionId: 'NS00' + i.toString(),
            memberCount: 15,
        };
    }
    const loading = false;
    const sheetsTotal = '20';
    const membersTotal = '60';
    const handleSearch = () => {
        console.log('222');
    };
    const parsed = queryString.parse(location.search || '');
    const { filter: urlFilterStr } = parsed;
    const urlFilters: string = urlFilterStr ? String(urlFilterStr) : '{}';
    const formValueObj = JSON.parse(urlFilters);
    return (
        <div className="template_SheetList">
            <PageContainer
                content={
                    <div className="sheetListHeader">
                        <Form
                            name="searchSheet"
                            layout="inline"
                            onFinish={handleSearch}
                            fields={[{ name: ['q'], value: formValueObj['q'] }]}
                            data-testid={'searchForm'}
                        >
                            <Form.Item name="q" label="検索">
                                <Input type="search" size="large" data-testid={'inputSearch'} />
                            </Form.Item>
                        </Form>
                    </div>
                }
                extraContent={<div className="extraContent">总共 {sheetsTotal} 张表格</div>}
                title="这是表格"
            >
                <div className="cardList">
                    <List<Partial<CardListItemDataType>>
                        rowKey="id"
                        loading={loading}
                        grid={{
                            gutter: 16,
                            xs: 1,
                            sm: 2,
                            md: 3,
                            lg: 3,
                            xl: 4,
                            xxl: 4,
                        }}
                        dataSource={sheets}
                        renderItem={(item) => {
                            if (item && item.id) {
                                return (
                                    <List.Item key={item.id}>
                                        <Card
                                            hoverable
                                            className="sheetCard"
                                            title={item.name}
                                            extra={
                                                <>
                                                    <Button
                                                        size="small"
                                                        key="option2"
                                                        className="sheetButton"
                                                    >
                                                        <PieChartOutlined title="详情" />
                                                    </Button>
                                                    <Button
                                                        size="small"
                                                        key="option1"
                                                        className="sheetButton"
                                                    >
                                                        <MenuOutlined />
                                                    </Button>
                                                </>
                                            }
                                        >
                                            <Card.Meta
                                                avatar={
                                                    <div className="sheetAvatar">
                                                        <label className="sheetAvatar_data">
                                                            {item.memberCount} / {membersTotal}
                                                        </label>
                                                        <label className="sheetAvatar_text">
                                                            人
                                                        </label>
                                                    </div>
                                                }
                                                description={
                                                    <div className="sheetDescription">
                                                        <div className="descriptionLine">
                                                            <div className="icon"></div>
                                                            <div className="content">
                                                                {item.categoryName}
                                                            </div>
                                                        </div>
                                                        <div className="descriptionLine">
                                                            <div className="icon"></div>
                                                            <div className="content">
                                                                {item.updatedByName}
                                                            </div>
                                                        </div>
                                                        <div className="descriptionLine response_large"></div>
                                                    </div>
                                                }
                                            />
                                        </Card>
                                    </List.Item>
                                );
                            }
                        }}
                    />
                </div>
            </PageContainer>
        </div>
    );
};

export default App;

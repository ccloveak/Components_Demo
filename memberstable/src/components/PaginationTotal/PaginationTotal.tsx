import React, { FC } from 'react';

interface PaginationInfoProp {
    total?: number;
    dataStart?: number;
    dataEnd?: number;
}

const PaginationTotal: FC<PaginationInfoProp> = (props) => {
    const { total, dataStart, dataEnd } = props;
    return (
        <>
            {"共计"}
            {total}
            {"当前"}
            {dataStart}
            {"~"}
            {dataEnd}
            {"条"}
        </>
    );
};

export default PaginationTotal;

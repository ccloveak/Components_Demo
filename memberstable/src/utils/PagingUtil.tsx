export const calcCurrentPage = (pageDataStart?: number, currentPage?: number) => {
    // 他のページから検索場合、自動的に１ページへ戻る
    if (pageDataStart && pageDataStart === 1) {
        return 1;
    }
    if (currentPage) {
        return currentPage;
    } else {
        // undefinedを返す場合　Pro-tableは実際データの状況でページ数を表示
        return undefined;
    }
};

export const calcPageRange = (page: number, pageSize?: number | undefined) => {
    if (pageSize) {
        return `[${(page - 1) * pageSize},${page * pageSize}]`;
    }
};

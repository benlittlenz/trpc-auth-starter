import { ParsedUrlQuery } from "querystring";

export const getPaginationParams = (query: ParsedUrlQuery) => {
    const { pageSize, page, sort, direction } = query;

    const rowsPerPage = pageSize ? Number(pageSize) : 25;
    const pageNum = Number(page) || 1;
    const sortColumn = sort ? String(sort) : "id";
    const sortDirection = direction ? String(direction) : "asc";

    return {
        rowsPerPage,
        pageNum,
        sortColumn,
        sortDirection,
    }
}
